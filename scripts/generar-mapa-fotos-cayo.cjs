// Convierte los nombres de public/productos/*.jpg en el mapa de imágenes del catálogo.
const fs=require('node:fs');const path=require('node:path');const root=process.cwd();
const folder=path.join(root,'public','productos');const dest=path.join(root,'src','features','catalog','data','productImages.ts');
if(!fs.existsSync(folder))fs.mkdirSync(folder,{recursive:true});
const files=fs.readdirSync(folder).filter(f=>/\.(jpe?g|png|webp)$/i.test(f));
const original=fs.existsSync(dest)?fs.readFileSync(dest,'utf8'):'';
const map=new Map();
for(const m of original.matchAll(/"([a-z0-9-]+)"\s*:\s*"([^"\n]+)"/g))map.set(m[1],m[2]);
for(const f of files){const slug=f.replace(/\.(jpe?g|png|webp)$/i,'');map.set(slug,`/productos/${f}`)}
const out='export const productImages: Record<string, string> = {\n'+[...map.entries()].sort((a,b)=>a[0].localeCompare(b[0])).map(([k,v])=>`  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join('\n')+'\n};\n';
if(original!==out){if(fs.existsSync(dest))fs.copyFileSync(dest,dest+'.bak-'+Date.now());fs.writeFileSync(dest,out,'utf8');}
console.log(`Mapa actualizado: ${files.length} archivos locales; ${map.size} referencias en total.`);
