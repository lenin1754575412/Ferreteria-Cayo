import engine from './engine.cjs';
import { NextRequest, NextResponse } from 'next/server';
export const api = engine as any;
export async function userFrom(request: NextRequest) { return api.session(request.cookies.get('cayo_session')?.value); }
export async function handle(request: NextRequest, action: (user: any, body: any) => Promise<any>) {
 try {
  if (!['GET','HEAD'].includes(request.method)) {
   const origin = request.headers.get('origin');
   if (origin && origin !== request.nextUrl.origin) return NextResponse.json({error:'Origen no permitido.'},{status:403});
   if (!(request.headers.get('content-type') || '').includes('application/json')) return NextResponse.json({error:'Envía JSON.'},{status:415});
  }
  const user = await userFrom(request);
  const body = ['GET','HEAD','DELETE'].includes(request.method) ? {} : await request.json();
  return NextResponse.json(await action(user, body), {headers:{'Cache-Control':'no-store'}});
 } catch (error: any) {
  const status=error.status || (error instanceof SyntaxError ? 400 : 500);
  if(status===500) console.error('[cayo API]',error.message);
  return NextResponse.json({success:false,error:status===500?'Error interno. Revisa los registros del servidor.':error.message},{status});
 }
}
