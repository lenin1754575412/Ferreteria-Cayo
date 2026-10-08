import {NextRequest} from 'next/server'; import {api,handle} from '@/server/service';
export const runtime='nodejs'; export const dynamic='force-dynamic';
export async function GET(r:NextRequest){return handle(r,async u=>({orders:await api.orders(u,Object.fromEntries(r.nextUrl.searchParams))}));}
export async function POST(r:NextRequest){return handle(r,async(u,b)=>api.createOrder(b,u));}
