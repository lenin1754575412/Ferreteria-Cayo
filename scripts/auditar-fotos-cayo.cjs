// Auditoría del catálogo: identifica productos sin fotografía individual, sin inventar imágenes.
const fs=require('node:fs');const path=require('node:path');
const root=process.cwd();const source=path.join(root,'src','features','catalog','data','store.ts');
if(!fs.existsSync(source)){console.error('Abre la carpeta Ferreteria-Cayo primero.');process.exit(1)}
const text=fs.readFileSync(source,'utf8');
const names=[...text.matchAll(/\bname:\s*["']([^"']+)["']/g)].map(m=>m[1]);
const unique=[...new Set(names)];
const slugify=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[|&(),."]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'');
const photoDir=path.join(root,'public','productos');
const rows=unique.map(name=>{const slug=slugify(name);const ext=['jpg','jpeg','png','webp'].find(x=>fs.existsSync(path.join(photoDir,`${slug}.${x}`)));return {name,slug,photo:ext?`productos/${slug}.${ext}`:'PENDIENTE'}});
const csv='Producto,Nombre-de-archivo,Estado\n'+rows.map(x=>[x.name,`${x.slug}.jpg`,x.photo].map(s=>'"'+s.replace(/"/g,'""')+'"').join(',')).join('\n');
fs.writeFileSync(path.join(root,'AUDITORIA_FOTOS_CAYO.csv'),'\uFEFF'+csv,'utf8');
console.log(`Auditoría terminada: ${rows.length} nombres encontrados; ${rows.filter(x=>x.photo!=='PENDIENTE').length} con foto individual en public/productos.`);
console.log('Revisa AUDITORIA_FOTOS_CAYO.csv. No se descarga ninguna imagen de licencias desconocidas.');
