import {NextRequest} from 'next/server'; import {api,handle} from '@/server/service';
export const runtime='nodejs'; export const dynamic='force-dynamic';
export async function POST(r:NextRequest){return handle(r,async u=>{api.requireRole(u,['admin']);return {success:true,message:'El catálogo inicial se carga con npm run db:init. No se sobrescriben productos existentes.'};});}
