'use strict';
const {loadEnvConfig}=require('@next/env');
loadEnvConfig(process.cwd());
const fs=require('node:fs');
const path=require('node:path');
const initSqlJs=require('sql.js');
const {neon}=require('@neondatabase/serverless');
async function main(){
 const url=process.env.DATABASE_URL;
 if(!url)throw Error('Falta DATABASE_URL. Configura Neon en .env.local o desde Vercel.');
 const sql=neon(url);
 const statements=fs.readFileSync('database/neon-auth.sql','utf8').replace(/^--.*$/gm,'').split(';').map(s=>s.trim()).filter(Boolean);
 for(const s of statements) await sql.query(s);
 console.log('Tablas de usuarios y sesiones listas en Neon.');
 const file=path.resolve(process.env.SQLITE_FILE||'data/ferreteria.sqlite');
 if(!fs.existsSync(file)){
  console.log('No se encontro SQLite local. Puedes crear cuentas nuevas en /registro.');return;
 }
 const SQL=await initSqlJs({locateFile:file=>require.resolve('sql.js/dist/'+file)});
 const db=new SQL.Database(fs.readFileSync(file));
 const stmt=db.prepare('SELECT id,names,surnames,birth_date,gender,phone,email,password_hash,role,employee_code,created_at FROM users');
 let imported=0;
 try{
  while(stmt.step()){
   const row=stmt.getAsObject();
   await sql.query('INSERT INTO users(id,names,surnames,birth_date,gender,phone,email,password_hash,role,employee_code,created_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT DO NOTHING',
    [row.id,row.names,row.surnames,row.birth_date,row.gender,row.phone,row.email,row.password_hash,row.role,row.employee_code,row.created_at]);
   imported++;
  }
 }finally{stmt.free();db.close();}
 console.log('Usuarios revisados para importar: '+imported+'. Contrasenas cifradas conservadas.');
 console.log('Importante: las sesiones anteriores no se copian; inicia sesion de nuevo.');
}
main().catch(e=>{console.error('ERROR:',e.message);process.exitCode=1});
