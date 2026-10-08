const fs=require('node:fs'),path=require('node:path');const target=path.resolve(process.env.SQLITE_FILE||'data/ferreteria.sqlite');
if(fs.existsSync(target+'.lock')){console.error('Detén el servidor antes de ejecutar un respaldo manual. El servidor guarda respaldos diarios al escribir.');process.exitCode=1;}
else if(!fs.existsSync(target)){console.error('La base no existe. Ejecuta npm run db:init.');process.exitCode=1;}
else{const folder=path.join(path.dirname(target),'backups');fs.mkdirSync(folder,{recursive:true});const out=path.join(folder,'manual-'+new Date().toISOString().replace(/[:.]/g,'-')+'.sqlite');fs.copyFileSync(target,out);console.log('Respaldo: '+out);}
