import {NextRequest} from 'next/server'; import {api,handle} from '@/server/service';
export const runtime='nodejs'; export const dynamic='force-dynamic';
type Context={params:{id:string}};
export async function GET(r:NextRequest,c:Context){return handle(r,async u=>({order:await api.orderDetail(u,c.params.id)}));}
export async function PATCH(r:NextRequest,c:Context){return handle(r,async(u,b)=>api.updateOrder(b,u,c.params.id));}
export async function DELETE(r:NextRequest,c:Context){return handle(r,async u=>api.updateOrder({},u,c.params.id,true));}
