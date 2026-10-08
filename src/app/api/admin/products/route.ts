import {NextRequest} from 'next/server'; import {api,handle} from '@/server/service';
export const runtime='nodejs'; export const dynamic='force-dynamic';
export async function GET(r:NextRequest){return handle(r,async u=>{api.requireRole(u,['admin']);return {products:await api.products(true)};});}
export async function POST(r:NextRequest){return handle(r,async(u,b)=>api.saveProduct(b,u));}
export async function PATCH(r:NextRequest){return handle(r,async(u,b)=>api.saveProduct(b,u,b.id));}
export async function DELETE(r:NextRequest){return handle(r,async u=>api.saveProduct({},u,r.nextUrl.searchParams.get('id'),true));}
