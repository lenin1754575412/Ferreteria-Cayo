import {NextRequest,NextResponse} from "next/server";
import {getCatalogProducts} from "@/features/catalog/server/product.repository";
export const runtime="nodejs"; export const dynamic="force-dynamic";
type Line={id:string;quantity:number};
export async function POST(request:NextRequest){
 const origin=request.headers.get("origin");
 if(origin && origin!==request.nextUrl.origin) return NextResponse.json({error:"Origen no permitido."},{status:403});
 if(!request.headers.get("content-type")?.includes("application/json"))return NextResponse.json({error:"Se requiere JSON."},{status:415});
 const token=process.env.MP_ACCESS_TOKEN;
 const site=process.env.NEXT_PUBLIC_SITE_URL;
 if(!token||!site||!/^https:\/\//.test(site))return NextResponse.json({error:"El comercio aún no configuró el pago online. Usa WhatsApp mientras tanto."},{status:503});
 let body:{items?:Line[]};try{body=await request.json();}catch{return NextResponse.json({error:"JSON inválido."},{status:400});}
 if(!Array.isArray(body.items)||body.items.length<1||body.items.length>30)return NextResponse.json({error:"Carrito inválido."},{status:400});
 const catalog=await getCatalogProducts();const byId=new Map(catalog.map(p=>[p.id,p]));const seen=new Set<string>();
 const items=[];
 for(const line of body.items){if(!line||typeof line.id!=="string"||seen.has(line.id)||!Number.isSafeInteger(line.quantity)||line.quantity<1||line.quantity>50)return NextResponse.json({error:"Artículo inválido o repetido."},{status:400});
  seen.add(line.id);const product=byId.get(line.id);if(!product||product.active===false||line.quantity>product.stock||!Number.isFinite(product.price)||product.price<=0)return NextResponse.json({error:`Producto sin disponibilidad: ${line.id}`},{status:409});
  items.push({id:product.id,title:product.name.slice(0,180),quantity:line.quantity,currency_id:"PEN",unit_price:Math.round(product.price*100)/100});
 }
 try{
  const base=new URL(site);const callback=(state:string)=>new URL(`/pago-resultado?resultado=${state}`,base).toString();
  const response=await fetch("https://api.mercadopago.com/checkout/preferences",{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json","X-Idempotency-Key":crypto.randomUUID()},body:JSON.stringify({items,back_urls:{success:callback("success"),pending:callback("pending"),failure:callback("failure")},external_reference:`CAYO-${crypto.randomUUID()}`}),cache:"no-store"});
  const data:unknown=await response.json();
  if(!response.ok||!data||typeof data!=="object"||!("init_point" in data)||typeof data.init_point!=="string")return NextResponse.json({error:"El proveedor de pago no pudo iniciar el cobro."},{status:502});
  const checkout=new URL(data.init_point);if(checkout.protocol!=="https:"||!(checkout.hostname==="mercadopago.com"||checkout.hostname.endsWith(".mercadopago.com")||checkout.hostname==="mercadopago.com.pe"||checkout.hostname.endsWith(".mercadopago.com.pe")))return NextResponse.json({error:"URL del proveedor inválida."},{status:502});
  return NextResponse.json({url:checkout.toString()},{headers:{"Cache-Control":"no-store"}});
 }catch{return NextResponse.json({error:"No se pudo conectar con el proveedor."},{status:502});}
}
