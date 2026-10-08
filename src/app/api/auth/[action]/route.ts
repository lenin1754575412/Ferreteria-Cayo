import {NextRequest,NextResponse} from 'next/server';
import {api,handle,userFrom} from '@/server/service';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET(request:NextRequest,{params}:{params:{action:string}}) {
 return handle(request,async user=> {if(params.action!=='me') return {error:'Ruta inválida.'}; return {user};});
}
export async function POST(request:NextRequest,{params}:{params:{action:string}}) {
 let loginResult:any;
 const response=await handle(request,async(user,body)=>{
  if(params.action==='register') return {success:true,user:await api.register(body)};
  if(params.action==='login') {loginResult=await api.login(body);return {success:true,user:loginResult.user};}
  if(params.action==='logout') {await api.logout(request.cookies.get('cayo_session')?.value,user);return {success:true};}
  if(params.action==='password') return api.changePassword(body,user);
  throw new api.AppError('Ruta inválida.',404);
 });
 if(loginResult) response.cookies.set('cayo_session',loginResult.token,{httpOnly:true,sameSite:'lax',secure:request.nextUrl.protocol==='https:',path:'/',maxAge:8*3600});
 if(response.ok&&['logout','password'].includes(params.action)) response.cookies.set('cayo_session','',{httpOnly:true,sameSite:'lax',path:'/',maxAge:0});
 return response;
}
