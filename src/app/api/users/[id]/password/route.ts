import {NextRequest} from 'next/server'; import {api,handle} from '@/server/service';
export const runtime='nodejs'; export const dynamic='force-dynamic';
export async function POST(r:NextRequest,{params}:{params:{id:string}}){return handle(r,async(u,b)=>api.changePassword(b,u,params.id));}
