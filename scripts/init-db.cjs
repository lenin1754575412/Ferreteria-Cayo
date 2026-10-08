const fs=require('node:fs');const path=require('node:path');const ts=require('typescript');const readline=require('node:readline/promises');
const engine=require('../src/server/engine.cjs');
function loadTS(filename){const file=path.resolve(filename),code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;const mod={exports:{}};const localRequire=name=>name.startsWith('.')?loadTS(path.resolve(path.dirname(file),name+'.ts')):require(name);new Function('require','module','exports',code)(localRequire,mod,mod.exports);return mod.exports;}
async function askGender(rl){while(true){const value=(await rl.question('Genero: 1 = Masculino, 2 = Femenino: ')).trim().toLowerCase();if(value==='1'||value==='masculino')return 'Masculino';if(value==='2'||value==='femenino')return 'Femenino';console.log('Escribe solamente 1 o 2 y pulsa Enter.');}}
async function main(){const db=await engine.database();let admin={};if(!engine.one(db,"SELECT id FROM users WHERE role='admin'")){
 const rl=readline.createInterface({input:process.stdin,output:process.stdout});
 try{console.log('Crea tu cuenta de administrador. La contraseña no se imprime ni se guarda en texto plano.');
 admin={names:await rl.question('Nombres: '),surnames:await rl.question('Apellidos: '),birthDate:await rl.question('Nacimiento (AAAA-MM-DD, mayor de 18): '),gender:await askGender(rl),phone:await rl.question('Teléfono (+51 y 9 dígitos): '),email:await rl.question('Correo: '),employeeCode:await rl.question('Código de empleado: ')};
 rl.close();
 if(process.env.CAYO_ADMIN_PASSWORD){admin.password=process.env.CAYO_ADMIN_PASSWORD;}else{
  const input=process.stdin;if(!input.isTTY)throw Error('Usa una terminal interactiva para crear la contraseña.');
  process.stdout.write('Contraseña (6-50, mayúscula y número): ');
  admin.password=await new Promise((resolve,reject)=>{let buffer='';input.setRawMode(true);input.resume();const handler=chunk=>{for(const ch of chunk.toString()){if(ch==='\u0003'){cleanup();reject(Error('Cancelado.'));return;}if(ch==='\r'||ch==='\n'){cleanup();process.stdout.write('\n');resolve(buffer);return;}if(ch==='\u007f'||ch==='\b'){buffer=buffer.slice(0,-1);}else if(ch>=' '){buffer+=ch;}}};const cleanup=()=>{input.off('data',handler);input.setRawMode(false);input.pause();};input.on('data',handler);});
 }
 }finally{rl.close();}}
 const seed=loadTS('src/features/catalog/data/store.ts').products;
 await engine.setup(admin,seed);console.log('Base SQLite y catálogo listos. Entra en /login y después en /gestion.');
 console.log('Los productos iniciales conservan sus datos. Completa USD, peso, dimensiones y garantía desde Gestión.');
}
module.exports={loadTS,main};
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
