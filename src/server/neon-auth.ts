import {neon} from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import {createHash, randomBytes, randomUUID} from 'node:crypto';

type Row = Record<string, any>;
export class AuthError extends Error {
  status: number;
  constructor(message: string, status=400) { super(message); this.status=status; }
}
const fail=(message:string,status=400):never=>{throw new AuthError(message,status)};
const now=()=>new Date().toISOString();
const sha256=(x:string)=>createHash('sha256').update(x).digest('hex');
async function query(statement:string,params:unknown[]=[]):Promise<Row[]> {
  const url=process.env.DATABASE_URL;
  if(!url) throw new AuthError('Falta DATABASE_URL en el servidor.',503);
  const sql=neon(url);
  return await sql.query(statement, params as any) as Row[];
}
function txt(v:unknown,label:string,min=1,max=200) {
  const s=String(v??'').trim();if(s.length<min||s.length>max)fail(`${label}: entre ${min} y ${max} caracteres.`);return s;
}
function pass(v:unknown) {
  const s=String(v??'');if(s.length<6||s.length>50||!/[A-Z]/.test(s)||!/[0-9]/.test(s))fail('Contraseña: 6 a 50 caracteres, una mayúscula y un número.');return s;
}
function person(body:Row, role='cliente') {
  const names=txt(body.names,'Nombres',3,50),surnames=txt(body.surnames,'Apellidos',3,50);
  if(!/^[\p{L} ]+$/u.test(names)||!/^[\p{L} ]+$/u.test(surnames))fail('Nombres y apellidos solo admiten letras y espacios.');
  const birthDate=String(body.birthDate??'');const date=new Date(birthDate+'T12:00:00Z');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)||!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==birthDate)fail('Fecha de nacimiento inválida.');
  const cutoff=new Date();cutoff.setUTCFullYear(cutoff.getUTCFullYear()-18);if(date>cutoff)fail('Debes tener al menos 18 años.');
  const raw=String(body.gender??'').normalize('NFKC').replace(/[\s\u200B-\u200D\uFEFF]/g,'').toLowerCase();
  const gender=['masculino','1'].includes(raw)?'Masculino':['femenino','2'].includes(raw)?'Femenino':null;
  if(!gender)fail('Género: elige Masculino (1) o Femenino (2).');
  const phone=String(body.phone??'').replace(/\s/g,'');if(!/^\+51\d{9}$/.test(phone))fail('Teléfono: +51 seguido de 9 dígitos.');
  const email=txt(body.email,'Correo',3,254).toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))fail('Correo inválido.');
  if(!['cliente','vendedor','admin'].includes(role))fail('Rol inválido.');
  const employeeCode=role==='cliente'?null:txt(body.employeeCode,'Código de empleado',1,30);
  return {names,surnames,birthDate,gender,phone,email,role,employeeCode};
}
function publicUser(u?:Row) {
  return u?{id:u.id,names:u.names,surnames:u.surnames,birthDate:u.birth_date,gender:u.gender,phone:u.phone,email:u.email,role:u.role,employeeCode:u.employee_code}:null;
}
export async function session(token?:string) {
  if(!token)return null;
  const rows=await query('SELECT u.* FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.expires_at>$2',[sha256(token),Date.now()]);
  return publicUser(rows[0]);
}
export async function register(body:Row,actor:Row|null=null) {
  if(actor&&!['admin','vendedor'].includes(actor.role))fail('No autorizado.',403);
  const role=actor?.role==='admin'?(body.role||'cliente'):'cliente';
  const p=person(body,role);
  const encrypted=await bcrypt.hash(pass(body.password),12);
  const uid=randomUUID();
  try {
    const result=await query('INSERT INTO users (id,names,surnames,birth_date,gender,phone,email,password_hash,role,employee_code,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *',
      [uid,p.names,p.surnames,p.birthDate,p.gender,p.phone,p.email,encrypted,p.role,p.employeeCode,now()]);
    return publicUser(result[0]);
  } catch(error:any) {
    if(error?.code==='23505'||/duplicate key/i.test(String(error?.message)))fail('El correo o código de empleado ya existe.',409);
    throw error;
  }
}
export async function login(body:Row) {
  const email=String(body.email??'').trim().toLowerCase();const key=sha256(email);const time=Date.now();
  const limits=await query('SELECT attempts,locked_until FROM login_attempts WHERE email_hash=$1',[key]);
  if(limits[0]&&Number(limits[0].locked_until)>time&&Number(limits[0].attempts)>=8)fail('Demasiados intentos. Espera 15 minutos.',429);
  const rows=await query('SELECT * FROM users WHERE lower(email)=$1',[email]);const user=rows[0];
  const fallback='$2b$12$DgxDpWFpcfp/WdMbdXyuReXIzMN8LeAxYZAoYSvUYRFzcVxvZEjlG';
  const valid=await bcrypt.compare(String(body.password??''),user?.password_hash||fallback);
  if(!user||!valid) {
    await query('INSERT INTO login_attempts(email_hash,attempts,locked_until) VALUES($1,1,$2) ON CONFLICT(email_hash) DO UPDATE SET attempts=CASE WHEN login_attempts.locked_until>$3 THEN login_attempts.attempts+1 ELSE 1 END,locked_until=$2',[key,time+900000,time]);
    fail('Usuario/Contraseña incorrectos.',401);
  }
  await query('DELETE FROM login_attempts WHERE email_hash=$1',[key]);
  const token=randomBytes(32).toString('hex');
  await query('INSERT INTO sessions(token_hash,user_id,expires_at) VALUES($1,$2,$3)',[sha256(token),user.id,Date.now()+8*3600000]);
  return {token,user:publicUser(user)};
}
export async function logout(token?:string,_user?:Row|null) {
  if(token)await query('DELETE FROM sessions WHERE token_hash=$1',[sha256(token)]);
}
export async function changePassword(body:Row,actor:Row|null,targetId?:string) {
  if(!actor)fail('Inicia sesión.',401);
  const uid=targetId||actor!.id;
  if(uid!==actor!.id&&!['admin','vendedor'].includes(actor!.role))fail('No autorizado.',403);
  const rows=await query('SELECT * FROM users WHERE id=$1',[uid]);const target=rows[0];if(!target)fail('Usuario no encontrado.',404);
  if(uid!==actor!.id) {
    if(actor!.role==='vendedor'&&target.role!=='cliente')fail('Solo puedes cambiar contraseñas de clientes.',403);
  } else if(!await bcrypt.compare(String(body.currentPassword??''),target.password_hash))fail('Contraseña actual incorrecta.');
  const next=pass(body.newPassword);if(next!==body.confirmPassword)fail('Las contraseñas no coinciden.');
  const encrypted=await bcrypt.hash(next,12);
  await query('UPDATE users SET password_hash=$1 WHERE id=$2',[encrypted,uid]);
  await query('DELETE FROM sessions WHERE user_id=$1',[uid]);
  return {success:true};
}
