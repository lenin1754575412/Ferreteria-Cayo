import {NextRequest} from 'next/server';import {api,handle} from '@/server/service';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function GET(r:NextRequest){return handle(r,async()=>({products:await api.products()}));}
