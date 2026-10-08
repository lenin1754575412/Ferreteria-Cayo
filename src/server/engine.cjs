const fs = require('node:fs');
const path = require('node:path');
const { randomUUID, randomBytes, createHash } = require('node:crypto');
const bcrypt = require('bcryptjs');
const initSqlJs = require('sql.js');

class AppError extends Error { constructor(message, status=400) { super(message); this.status=status; } }
const fail=(message,status=400)=>{ throw new AppError(message,status); };
const now=()=>new Date().toISOString();
const id=()=>randomUUID();
const hash=s=>createHash('sha256').update(s).digest('hex');
const filename=()=>path.resolve(process.env.SQLITE_FILE || 'data/ferreteria.sqlite');
const states=['Pendiente confirmación de pago','Preparando envío','Enviado','Entregado','Cancelado'];
function all(db,sql,args=[]) { const stmt=db.prepare(sql); try { stmt.bind(args); const rows=[]; while(stmt.step()) rows.push(stmt.getAsObject()); return rows; } finally { stmt.free(); } }
const one=(db,sql,args=[])=>all(db,sql,args)[0];
function persist(db) {
 const target=filename(); fs.mkdirSync(path.dirname(target),{recursive:true});
 const bytes=Buffer.from(db.export()); db.run('PRAGMA foreign_keys=ON');
 const temp=target+'.tmp'; fs.writeFileSync(temp,bytes); fs.renameSync(temp,target);
 try { const folder=path.join(path.dirname(target),'backups'); fs.mkdirSync(folder,{recursive:true});
 const daily=path.join(folder,`ferreteria-${now().slice(0,10)}.sqlite`);
 const dailyTemp=daily+'.tmp'; fs.writeFileSync(dailyTemp,bytes); fs.renameSync(dailyTemp,daily); }
 catch(error){console.error('[cayo respaldo diario]',error.message);}
}
function txn(db,fn) {
 const before=db.export(); db.run('PRAGMA foreign_keys=ON'); db.run('BEGIN IMMEDIATE');
 let committed=false;
 try { const result=fn(); db.run('COMMIT'); committed=true; persist(db); return result; }
 catch(error) { if(!committed){db.run('ROLLBACK');throw error;} db.close(); const restored=new globalThis.__cayoSQL.Database(before); restored.run('PRAGMA foreign_keys=ON'); globalThis.__cayoDB=restored; throw error; }
}
async function database() {
 if(globalThis.__cayoDB) return globalThis.__cayoDB;
 if(globalThis.__cayoInit) return globalThis.__cayoInit;
 globalThis.__cayoInit=(async()=>{
  const target=filename(); fs.mkdirSync(path.dirname(target),{recursive:true});
  const lock=target+'.lock';
  if(fs.existsSync(lock)) { const owner=Number(fs.readFileSync(lock,'utf8')); let alive=false; try { process.kill(owner,0); alive=true; } catch {} if(alive&&owner!==process.pid) fail('La base está abierta en otro proceso. Detén el otro servidor.',503); if(!alive) fs.unlinkSync(lock); }
  if(!fs.existsSync(lock)) fs.writeFileSync(lock,String(process.pid),{flag:'wx'});
  process.once('exit',()=>{ try { if(fs.readFileSync(lock,'utf8')===String(process.pid)) fs.unlinkSync(lock); } catch {} });
  const SQL=await initSqlJs({wasmBinary:fs.readFileSync(path.resolve('node_modules/sql.js/dist/sql-wasm.wasm'))}); globalThis.__cayoSQL=SQL;
  const db=new SQL.Database(fs.existsSync(target)?fs.readFileSync(target):undefined);
  db.run(fs.readFileSync(path.resolve('database/schema.sql'),'utf8')); globalThis.__cayoDB=db;
  persist(db); const timer=setInterval(()=>{try{persist(globalThis.__cayoDB);}catch(e){console.error('[cayo respaldo]',e.message);}},60*1000);timer.unref(); return db;
 })();
 try { return await globalThis.__cayoInit; } catch(error) { globalThis.__cayoInit=null; throw error; }
}
function audit(db,actor,action,entity) { db.run('INSERT INTO audit_log VALUES (?,?,?,?,?)',[id(),actor?.id||null,action,entity||null,now()]); }
const publicUser=u=>u?{id:u.id,names:u.names,surnames:u.surnames,birthDate:u.birth_date,gender:u.gender,phone:u.phone,email:u.email,role:u.role,employeeCode:u.employee_code}:null;
function text(value,label,min=1,max=200) { const v=String(value??'').trim(); if(v.length<min||v.length>max) fail(`${label}: entre ${min} y ${max} caracteres.`); return v; }
function password(value) { const s=String(value??''); if(s.length<6||s.length>50||!/[A-Z]/.test(s)||!/[0-9]/.test(s)) fail('Contraseña: 6 a 50 caracteres, una mayúscula y un número.'); return s; }
function person(body,role='cliente') {
 const names=text(body.names,'Nombres',3,50), surnames=text(body.surnames,'Apellidos',3,50);
 if(!/^[\p{L} ]+$/u.test(names)||!/^[\p{L} ]+$/u.test(surnames)) fail('Nombres y apellidos solo admiten letras y espacios.');
 const birthDate=String(body.birthDate??''); const date=new Date(birthDate+'T12:00:00Z');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)||!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==birthDate) fail('Fecha de nacimiento inválida.');
 const cutoff=new Date(); cutoff.setUTCFullYear(cutoff.getUTCFullYear()-18); if(date>cutoff) fail('Debes tener al menos 18 años.');
 const rawGender=String(body.gender??'').normalize('NFKC').replace(/[\s\u200B-\u200D\uFEFF]/g,'').toLowerCase(); const gender=rawGender==='masculino'||rawGender==='1'?'Masculino':rawGender==='femenino'||rawGender==='2'?'Femenino':null; if(!gender) fail('Género: elige Masculino (1) o Femenino (2).');
 const phone=String(body.phone??'').replace(/\s/g,''); if(!/^\+51\d{9}$/.test(phone)) fail('Teléfono: +51 seguido de 9 dígitos.');
 const email=text(body.email,'Correo',3,254).toLowerCase(); if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail('Correo inválido.');
 if(!['cliente','vendedor','admin'].includes(role)) fail('Rol inválido.');
 const employeeCode=role==='cliente'?null:text(body.employeeCode,'Código de empleado',1,30);
 return {names,surnames,birthDate,gender,phone,email,role,employeeCode};
}
function requireRole(user,roles) { if(!user) fail('Inicia sesión.',401); if(!roles.includes(user.role)) fail('No autorizado.',403); }
async function session(token) { if(!token) return null; const db=await database(); return publicUser(one(db,'SELECT u.* FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?',[hash(token),Date.now()])); }
async function register(body,actor=null) {
 const role=actor?.role==='admin'?(body.role||'cliente'):'cliente'; if(actor) requireRole(actor,['admin','vendedor']);
 const p=person(body,role), encrypted=await bcrypt.hash(password(body.password),12), db=await database();
 return txn(db,()=>{ if(one(db,'SELECT id FROM users WHERE email=?',[p.email])) fail('El correo ya está registrado.',409);
  const userId=id(); db.run('INSERT INTO users VALUES (?,?,?,?,?,?,?,?,?,?,?)',[userId,p.names,p.surnames,p.birthDate,p.gender,p.phone,p.email,encrypted,p.role,p.employeeCode,now()]); audit(db,actor,'usuario.crear',userId); return publicUser(one(db,'SELECT * FROM users WHERE id=?',[userId])); });
}
const attempts=new Map();
async function login(body) {
 const email=String(body.email??'').toLowerCase().trim(), key=hash(email), limit=attempts.get(key);
 if(limit&&limit.until>Date.now()&&limit.count>=8) fail('Demasiados intentos. Espera 15 minutos.',429);
 const db=await database(), user=one(db,'SELECT * FROM users WHERE email=?',[email]);
 const valid=await bcrypt.compare(String(body.password??''),user?.password_hash||'$2b$12$DgxDpWFpcfp/WdMbdXyuReXIzMN8LeAxYZAoYSvUYRFzcVxvZEjlG');
 if(!user||!valid) { attempts.set(key,{count:limit&&limit.until>Date.now()?limit.count+1:1,until:Date.now()+900000}); fail('Usuario/Contraseña incorrectos.',401); }
 attempts.delete(key); const token=randomBytes(32).toString('hex');
 txn(db,()=>{ db.run('DELETE FROM sessions WHERE expires_at<=?',[Date.now()]); db.run('INSERT INTO sessions VALUES (?,?,?)',[hash(token),user.id,Date.now()+8*3600000]); audit(db,user,'sesion.iniciar',user.id); });
 return {token,user:publicUser(user)};
}
async function logout(token,user) { const db=await database(); txn(db,()=>{ db.run('DELETE FROM sessions WHERE token_hash=?',[hash(token||'')]); audit(db,user,'sesion.cerrar',user?.id); }); }
async function changePassword(body,actor,targetId) {
 requireRole(actor,['cliente','vendedor','admin']); const db=await database(), target=one(db,'SELECT * FROM users WHERE id=?',[targetId||actor.id]); if(!target) fail('Usuario no encontrado.',404);
 if(target.id!==actor.id) { requireRole(actor,['admin','vendedor']); if(actor.role==='vendedor'&&target.role!=='cliente') fail('Solo puedes cambiar contraseñas de clientes.',403); }
 else if(!await bcrypt.compare(String(body.currentPassword??''),target.password_hash)) fail('Contraseña actual incorrecta.');
 const p=password(body.newPassword); if(p!==body.confirmPassword) fail('Las contraseñas no coinciden.'); const encrypted=await bcrypt.hash(p,12);
 txn(db,()=>{ db.run('UPDATE users SET password_hash=? WHERE id=?',[encrypted,target.id]); db.run('DELETE FROM sessions WHERE user_id=?',[target.id]); audit(db,actor,'usuario.contraseña',target.id); }); return {success:true};
}
async function users(actor,query='') { requireRole(actor,['admin','vendedor']); const db=await database(); return all(db,'SELECT * FROM users WHERE (names||\' \'||surnames||email||COALESCE(employee_code,\'\')) LIKE ?'+(actor.role==='vendedor'?" AND role='cliente'":'')+' ORDER BY names',['%'+query+'%']).map(publicUser); }
async function updateUser(body,actor,userId,remove=false) {
 requireRole(actor,['admin']); const db=await database(); const target=one(db,'SELECT * FROM users WHERE id=?',[userId]); if(!target) fail('Usuario no encontrado.',404);
 if(userId===actor.id) fail('No puedes modificar ni eliminar tu propia cuenta desde este panel.');
 const p=remove?null:person(body,body.role||target.role);
 return txn(db,()=>{ const hasOrders=one(db,'SELECT id FROM orders WHERE customer_id=? OR seller_id=? LIMIT 1',[userId,userId]);
  if(hasOrders&&(remove||target.role==='cliente')) fail('No puedes modificar o eliminar un cliente con pedidos asociados.');
  if(target.role==='admin'&&(remove||p?.role!=='admin')&&Number(one(db,"SELECT COUNT(*) n FROM users WHERE role='admin'").n)<=1) fail('Debe quedar al menos un administrador.');
  if(remove) db.run('DELETE FROM users WHERE id=?',[userId]);
  else { if(one(db,'SELECT id FROM users WHERE email=? AND id<>?',[p.email,userId])) fail('El correo ya existe.',409); db.run('UPDATE users SET names=?,surnames=?,birth_date=?,gender=?,phone=?,email=?,role=?,employee_code=? WHERE id=?',[p.names,p.surnames,p.birthDate,p.gender,p.phone,p.email,p.role,p.employeeCode,userId]); db.run('DELETE FROM sessions WHERE user_id=?',[userId]); }
  audit(db,actor,remove?'usuario.eliminar':'usuario.editar',userId); return {success:true}; });
}
function productRow(p) { return {id:p.id,sku:p.sku,slug:p.slug,cat:p.cat,name:p.name,brand:p.brand,description:p.description,price:p.price_cents/100,priceUsd:p.usd_cents/100,stock:p.stock,images:JSON.parse(p.images_json),img:JSON.parse(p.images_json)[0]||'',specs:JSON.parse(p.specs_json),weight:p.weight,dimensions:p.dimensions,warranty:p.warranty,oldPrice:p.old_price_cents?p.old_price_cents/100:undefined,active:!!p.active,featured:!!p.featured}; }
async function products(includeInactive=false) { const db=await database(); return all(db,'SELECT p.*,c.name cat FROM products p JOIN categories c ON c.id=p.category_id'+(includeInactive?'':' WHERE p.active=1')+' ORDER BY p.name').map(productRow); }
function numeric(v,label,min=0) { if(v===''||v==null) fail(`${label} es obligatorio.`); const n=Number(v); if(!Number.isFinite(n)||n<min||n>1e8) fail(`${label} inválido.`); return n; }
const cents=(v,label)=>Math.round(numeric(v,label)*100);
const slug=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function imageList(v) { const list=Array.isArray(v)?v:String(v||'').split('\n'); const clean=list.map(s=>String(s).trim()).filter(Boolean); if(!clean.length||clean.length>12||clean.some(s=>!s.startsWith('/')&&!/^https?:\/\//.test(s))) fail('Incluye de 1 a 12 imágenes con URL http/https o ruta / local.'); return clean; }
async function saveProduct(body,actor,productId,remove=false) {
 requireRole(actor,['admin']); const db=await database(); const existing=productId?one(db,'SELECT * FROM products WHERE id=?',[productId]):null;
 if(productId&&!existing) fail('Producto no encontrado.',404);
 if(remove) return txn(db,()=>{ db.run('UPDATE products SET active=0 WHERE id=?',[productId]); audit(db,actor,'producto.eliminar',productId); return {success:true}; });
 const name=text(body.name,'Nombre'), sku=text(body.sku,'SKU',1,60), category=text(body.cat,'Categoría'), brand=text(body.brand,'Marca'), description=text(body.description,'Descripción',1,5000);
 const price=cents(body.price,'Precio en soles'), usd=cents(body.priceUsd,'Precio USD'), stock=numeric(body.stock,'Stock'), weight=numeric(body.weight,'Peso'); if(!Number.isInteger(stock)) fail('El stock debe ser entero.');
 const dimensions=text(body.dimensions,'Dimensiones'), warranty=text(body.warranty,'Garantía'), images=imageList(body.images||body.img);
 let specs=body.specs||{}; if(typeof specs==='string') { try { specs=JSON.parse(specs); } catch { fail('Especificaciones: usa un objeto JSON válido.'); } } if(!specs||Array.isArray(specs)||typeof specs!=='object'||Object.values(specs).some(v=>typeof v!=='string')) fail('Especificaciones: claves y valores de texto.');
 const productSlug=slug(body.slug||name); if(!productSlug) fail('Nombre inválido para URL.'); const old=body.oldPrice?cents(body.oldPrice,'Precio anterior'):null;
 return txn(db,()=>{ if(one(db,'SELECT id FROM products WHERE (sku=? OR slug=?) AND id<>?',[sku,productSlug,productId||''])) fail('SKU o URL ya existe.',409);
  let cat=one(db,'SELECT id FROM categories WHERE name=?',[category]); if(!cat) { cat={id:id()}; db.run('INSERT INTO categories VALUES (?,?)',[cat.id,category]); }
  const pid=productId||id(); const vals=[sku,productSlug,cat.id,name,brand,description,price,usd,stock,JSON.stringify(images),JSON.stringify(specs),weight,dimensions,warranty,old,body.active===false?0:1,body.featured?1:0];
  if(existing) db.run('UPDATE products SET sku=?,slug=?,category_id=?,name=?,brand=?,description=?,price_cents=?,usd_cents=?,stock=?,images_json=?,specs_json=?,weight=?,dimensions=?,warranty=?,old_price_cents=?,active=?,featured=? WHERE id=?',[...vals,pid]);
  else db.run('INSERT INTO products VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[pid,...vals]); audit(db,actor,existing?'producto.editar':'producto.crear',pid); return {success:true,id:pid}; });
}
async function discounts(actor,query='') { requireRole(actor,['cliente','vendedor','admin']); const db=await database(); return all(db,"SELECT d.*,EXISTS(SELECT 1 FROM user_discounts ud WHERE ud.discount_id=d.id AND ud.user_id=?) saved FROM discounts d WHERE (code||description) LIKE ?"+(actor.role==='admin'?'':' AND active=1'),[actor.id,'%'+query+'%']); }
async function saveDiscount(body,actor,discountId,remove=false) {
 requireRole(actor,['admin']); const db=await database(); if(discountId&&!one(db,'SELECT id FROM discounts WHERE id=?',[discountId])) fail('Descuento no encontrado.',404);
 if(remove) return txn(db,()=>{ db.run('UPDATE discounts SET active=0 WHERE id=?',[discountId]); audit(db,actor,'descuento.eliminar',discountId); return {success:true}; });
 const code=String(body.code??'').trim(); if(!/^[A-Z]{12}$/.test(code)) fail('Código: 12 letras mayúsculas.'); const description=text(body.description,'Descripción',10,200); if(!/^[\p{L}\p{P}\s]+$/u.test(description)) fail('Descripción: solo letras y puntuación.');
 const type=body.type; if(!['Porcentaje','Monto fijo'].includes(type)) fail('Tipo inválido.'); const value=numeric(body.value,'Valor',0.01); if(type==='Porcentaje'&&value>100) fail('Porcentaje máximo: 100.');
 return txn(db,()=>{ if(one(db,'SELECT id FROM discounts WHERE code=? AND id<>?',[code,discountId||''])) fail('Código repetido.',409); const did=discountId||id();
  if(discountId) db.run('UPDATE discounts SET code=?,description=?,type=?,value=?,active=? WHERE id=?',[code,description,type,value,body.active===false?0:1,did]); else db.run('INSERT INTO discounts VALUES (?,?,?,?,?,?)',[did,code,description,type,value,1]); audit(db,actor,'descuento.guardar',did); return {success:true,id:did}; });
}
async function collectDiscount(code,actor) { requireRole(actor,['cliente','vendedor','admin']); const db=await database(); return txn(db,()=>{ const d=one(db,'SELECT id FROM discounts WHERE code=? AND active=1',[String(code).trim()]); if(!d) fail('Código no válido.'); db.run('INSERT OR IGNORE INTO user_discounts VALUES (?,?)',[actor.id,d.id]); audit(db,actor,'descuento.guardar_usuario',d.id); return {success:true}; }); }
function canOrder(actor,order) { requireRole(actor,['cliente','vendedor','admin']); if(actor.role!=='admin'&&(actor.role==='cliente'?order.customer_id!==actor.id:order.seller_id!==actor.id)) fail('No autorizado.',403); }
function details(db,order) {
 const customer=publicUser(one(db,'SELECT * FROM users WHERE id=?',[order.customer_id])), seller=order.seller_id?publicUser(one(db,'SELECT * FROM users WHERE id=?',[order.seller_id])):null;
 return {id:order.id,createdAt:order.created_at,customer,seller,paymentStatus:order.payment_status,status:order.delivery_status,department:order.department,province:order.province,district:order.district,address:order.address,delivery:order.delivery,notes:order.notes,subtotal:order.subtotal_cents/100,discount:order.discount_cents/100,total:order.total_cents/100,items:all(db,'SELECT * FROM order_items WHERE order_id=?',[order.id]).map(i=>({productId:i.product_id,sku:i.sku,name:i.name,price:i.price_cents/100,quantity:i.quantity})),installments:all(db,'SELECT * FROM installments WHERE order_id=?',[order.id]).map(i=>({amount:i.amount_cents/100,date:i.due_date})),discounts:all(db,'SELECT code,type,value FROM order_discounts WHERE order_id=?',[order.id])};
}
async function orders(actor,filters={}) {
 requireRole(actor,['cliente','vendedor','admin']); const db=await database(); let where='1=1',args=[];
 if(actor.role==='cliente') {where+=' AND o.customer_id=?';args.push(actor.id);} if(actor.role==='vendedor'){where+=' AND o.seller_id=?';args.push(actor.id);}
 if(filters.q) { where+=" AND ((o.id||u.names||u.surnames||o.created_at||o.payment_status||o.delivery_status) LIKE ? OR EXISTS(SELECT 1 FROM order_items i WHERE i.order_id=o.id AND i.name LIKE ?))"; args.push('%'+filters.q+'%','%'+filters.q+'%'); }
 for(const [input,col] of [['payment','payment_status'],['status','delivery_status']]) if(filters[input]) {where+=` AND o.${col}=?`;args.push(filters[input]);}
 if(filters.date) {where+=' AND substr(o.created_at,1,10)=?';args.push(filters.date);}
 return all(db,`SELECT o.* FROM orders o JOIN users u ON u.id=o.customer_id WHERE ${where} ORDER BY o.created_at DESC`,args).map(o=>details(db,o));
}
async function orderDetail(actor,orderId) { const db=await database(); const o=one(db,'SELECT * FROM orders WHERE id=?',[orderId]); if(!o) fail('Pedido no encontrado.',404); canOrder(actor,o); return details(db,o); }
function quote(db,body,actor,existing) {
 const customerId=existing?.customer_id||(actor.role==='cliente'?actor.id:body.customerId); const customer=one(db,"SELECT * FROM users WHERE id=? AND role='cliente'",[customerId||'']); if(!customer) fail('Selecciona un cliente válido.');
 const list=body.items; if(!Array.isArray(list)||!list.length||list.length>100) fail('Agrega de 1 a 100 productos.'); const merged=new Map();
 for(const item of list) { const pid=item.productId||item.product?.id; const qty=numeric(item.quantity,'Cantidad',1); if(!Number.isInteger(qty)) fail('Cantidad entera requerida.'); merged.set(pid,(merged.get(pid)||0)+qty); }
 const previous=existing?all(db,'SELECT * FROM order_items WHERE order_id=?',[existing.id]):[]; const lines=[]; let subtotal=0;
 for(const [pid,qty] of merged) { const p=one(db,'SELECT * FROM products WHERE id=? AND active=1',[pid||'']); if(!p) fail('Producto no disponible.'); const old=previous.find(i=>i.product_id===pid); const available=p.stock+(old?.quantity||0); if(qty>available) fail(`Stock insuficiente para ${p.name}. Disponible: ${available}.`);
  const unit=old?.price_cents??p.price_cents; subtotal+=unit*qty; lines.push({product:p,quantity:qty,price:unit}); }
 let selected=[]; if(body.codes!=null) { const codes=[...new Set((Array.isArray(body.codes)?body.codes:String(body.codes).split(',')).map(c=>String(c).trim()).filter(Boolean))]; if(codes.length>20) fail('Máximo 20 códigos.');
  selected=codes.map(code=>{ const d=one(db,'SELECT * FROM discounts WHERE code=? AND active=1',[code]); if(!d) fail(`Código inválido: ${code}`); if(!one(db,'SELECT user_id FROM user_discounts WHERE user_id=? AND discount_id=?',[customer.id,d.id])) fail(`El cliente debe guardar primero el código ${code}.`); return d; }); }
 else if(existing) selected=all(db,'SELECT discount_id id,code,type,value FROM order_discounts WHERE order_id=?',[existing.id]);
 const raw=selected.reduce((sum,d)=>sum+(d.type==='Porcentaje'?Math.round(subtotal*d.value/100):Math.round(d.value*100)),0); const reduction=Math.min(raw,Math.floor(subtotal*0.2));
 const payment=body.paymentStatus||existing?.payment_status||'Sin pago'; if(!['Sin pago','En cuotas','Pago confirmado'].includes(payment)) fail('Estado de pago inválido.');
 const installments=payment==='En cuotas'?(body.installments||[]):[]; if(!Array.isArray(installments)||installments.length>100) fail('Cuotas inválidas.'); if(payment==='En cuotas'&&!installments.length) fail('Agrega monto y fecha de las cuotas.');
 const cuotas=installments.map(i=>{const amount=cents(i.amount,'Monto de cuota'); const date=new Date(i.date+'T12:00:00Z'); if(amount<=0||!/^\d{4}-\d{2}-\d{2}$/.test(i.date)||!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==i.date) fail('Cuota inválida.');return {amount,date:i.date};});
 if(payment==='En cuotas'&&cuotas.reduce((sum,i)=>sum+i.amount,0)!==subtotal-reduction) fail('Las cuotas deben sumar exactamente el total del pedido.');
 return {customerId,lines,subtotal,reduction,total:subtotal-reduction,selected,payment,cuotas,department:text(body.department??existing?.department,'Departamento'),province:text(body.province??existing?.province,'Provincia'),district:text(body.district??existing?.district,'Distrito'),address:text(body.address??body.customer?.address??existing?.address,'Dirección'),delivery:text(body.delivery??existing?.delivery??'Delivery','Entrega'),notes:String(body.notes??body.customer?.notes??existing?.notes??'').trim().slice(0,500),previous};
}
function writeLines(db,oid,q) { db.run('DELETE FROM order_items WHERE order_id=?',[oid]); db.run('DELETE FROM installments WHERE order_id=?',[oid]); db.run('DELETE FROM order_discounts WHERE order_id=?',[oid]);
 for(const line of q.lines) { const p=line.product; db.run('INSERT INTO order_items VALUES (?,?,?,?,?,?)',[oid,p.id,p.sku,p.name,line.price,line.quantity]); db.run('UPDATE products SET stock=stock-? WHERE id=?',[line.quantity,p.id]); }
 for(const i of q.cuotas) db.run('INSERT INTO installments VALUES (?,?,?,?)',[id(),oid,i.amount,i.date]);
 for(const d of q.selected) db.run('INSERT INTO order_discounts VALUES (?,?,?,?,?)',[oid,d.id,d.code,d.type,d.value]);
}
async function createOrder(body,actor) { requireRole(actor,['cliente','vendedor','admin']); const db=await database(); return txn(db,()=>{ const q=quote(db,body,actor); const oid='CAYO-'+id().slice(0,12).toUpperCase();
 db.run('INSERT INTO orders VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[oid,q.customerId,actor.role==='cliente'?null:actor.id,now(),q.payment,'Pendiente confirmación de pago',q.department,q.province,q.district,q.address,q.delivery,q.notes,q.subtotal,q.reduction,q.total]); writeLines(db,oid,q); audit(db,actor,'pedido.crear',oid); return {success:true,stored:true,orderId:oid,total:q.total/100}; }); }
async function updateOrder(body,actor,oid,cancel=false) { requireRole(actor,['cliente','vendedor','admin']); const db=await database(); return txn(db,()=>{ const o=one(db,'SELECT * FROM orders WHERE id=?',[oid]); if(!o) fail('Pedido no encontrado.',404); canOrder(actor,o);
 if(body.deliveryStatus&&!cancel) {requireRole(actor,['admin','vendedor']); const status=body.deliveryStatus; const index=states.indexOf(o.delivery_status); if(!states.includes(status)||status==='Cancelado'||states.indexOf(status)!==index+1||index>=3) fail('Transición de entrega no permitida.'); if(status==='Preparando envío'&&o.payment_status==='Sin pago') fail('Confirma el pago antes de preparar el envío.'); db.run('UPDATE orders SET delivery_status=? WHERE id=?',[status,oid]); audit(db,actor,'pedido.entrega',oid); return {success:true};}
 if(o.delivery_status!=='Pendiente confirmación de pago') fail('Solo puedes modificar o cancelar antes de Preparando envío.',409);
 const old=all(db,'SELECT * FROM order_items WHERE order_id=?',[oid]);
 if(cancel) {for(const i of old) db.run('UPDATE products SET stock=stock+? WHERE id=?',[i.quantity,i.product_id]); db.run("UPDATE orders SET delivery_status='Cancelado' WHERE id=?",[oid]); audit(db,actor,'pedido.cancelar',oid); return {success:true};}
 const q=quote(db,body,actor,o); for(const i of old) db.run('UPDATE products SET stock=stock+? WHERE id=?',[i.quantity,i.product_id]);
 db.run('UPDATE orders SET payment_status=?,department=?,province=?,district=?,address=?,delivery=?,notes=?,subtotal_cents=?,discount_cents=?,total_cents=? WHERE id=?',[q.payment,q.department,q.province,q.district,q.address,q.delivery,q.notes,q.subtotal,q.reduction,q.total,oid]); writeLines(db,oid,q); audit(db,actor,'pedido.editar',oid); return {success:true}; }); }
async function setup(admin,seed) { const db=await database(); if(Number(one(db,"SELECT COUNT(*) n FROM users WHERE role='admin'").n)===0) await register({...admin,role:'admin'}, {id:null,role:'admin'});
 txn(await database(),()=>{const d=globalThis.__cayoDB; if(Number(one(d,'SELECT COUNT(*) n FROM products').n)>0) return;
  for(const p of seed) { let cat=one(d,'SELECT id FROM categories WHERE name=?',[p.cat]); if(!cat){cat={id:id()};d.run('INSERT INTO categories VALUES (?,?)',[cat.id,p.cat]);}
   d.run('INSERT INTO products VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[p.id,p.sku,p.slug,cat.id,p.name,p.brand,p.description,Math.round(p.price*100),Math.round((p.priceUsd||0)*100),p.stock,JSON.stringify(p.images?.length?p.images:[p.img]),JSON.stringify(p.specs||{}),p.weight||0,p.dimensions||'Por completar',p.warranty||'Por completar',p.oldPrice?Math.round(p.oldPrice*100):null,1,p.featured?1:0]); }
 }); return {success:true}; }
module.exports={AppError,database,all,one,txn,session,register,login,logout,changePassword,users,updateUser,products,saveProduct,discounts,saveDiscount,collectDiscount,orders,orderDetail,createOrder,updateOrder,setup,password,person,requireRole,quote,filename};
