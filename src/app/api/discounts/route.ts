import {NextRequest} from 'next/server'; import {api,handle} from '@/server/service';
export const runtime='nodejs'; export const dynamic='force-dynamic';
export async function GET(r:NextRequest){return handle(r,async u=>({discounts:await api.discounts(u,r.nextUrl.searchParams.get('q')||'')}));}
export async function POST(r:NextRequest){return handle(r,async(u,b)=>b.collect?api.collectDiscount(b.code,u):api.saveDiscount(b,u));}
export async function PATCH(r:NextRequest){return handle(r,async(u,b)=>api.saveDiscount(b,u,b.id));}
export async function DELETE(r:NextRequest){return handle(r,async u=>api.saveDiscount({},u,r.nextUrl.searchParams.get('id'),true));}
