"use client";
import {useState} from "react";
import Link from "next/link";
import {useCart} from "@/features/cart";
const money=(n:number)=>new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN"}).format(n);
const yape=process.env.NEXT_PUBLIC_CAYO_YAPE || "";
const plin=process.env.NEXT_PUBLIC_CAYO_PLIN || "";
const phone=process.env.NEXT_PUBLIC_CAYO_WHATSAPP || "51992110555";
export function Payments(){const {items,subtotal}=useCart();const [busy,setBusy]=useState(false);const [error,setError]=useState("");
 const online=async()=>{if(!items.length)return;setBusy(true);setError("");try{const response=await fetch("/api/cayo-pro/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:items.map(({product,quantity})=>({id:product.id,quantity}))})});const data=await response.json();if(!response.ok)throw new Error(data.error||"No fue posible iniciar el checkout.");const url=new URL(data.url);if(!(url.hostname==="mercadopago.com"||url.hostname.endsWith(".mercadopago.com")||url.hostname==="mercadopago.com.pe"||url.hostname.endsWith(".mercadopago.com.pe")))throw new Error("Destino de pago no válido.");window.location.assign(data.url);}catch(e){setError(e instanceof Error?e.message:"Error iniciando pago");setBusy(false);}};
 const text=encodeURIComponent(`Hola, deseo confirmar opciones de pago para mi carrito de ${money(subtotal)}. Mi pedido está pendiente de validación.`);
 return <div className="cayo-pro"><div className="cayo-pro-heading"><div><span className="cayo-pro-topline">PAGOS</span><h1>Elige cómo pagar</h1><p>Tu carrito: <strong>{money(subtotal)}</strong>. El comercio debe confirmar disponibilidad y pago.</p></div><Link className="cayo-pro-secondary" href="/cotizaciones">Ver cotización</Link></div>
 <div className="cayo-pro-payment-grid"><article className="cayo-pro-panel"><div className="cayo-pro-payment-mark">Y</div><h2>Yape</h2>{yape?<><strong>Número configurado: {yape}</strong><p>Realiza el pago solo después de confirmar el pedido con la tienda.</p></>:<p>El comercio aún no configuró su número oficial de Yape.</p>}<a className="cayo-pro-secondary" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${phone}?text=${text}`}>Consultar por WhatsApp</a></article>
 <article className="cayo-pro-panel"><div className="cayo-pro-payment-mark">P</div><h2>Plin</h2>{plin?<><strong>Número configurado: {plin}</strong><p>Solicita la verificación del pago por parte del negocio.</p></>:<p>El comercio aún no configuró su número oficial de Plin.</p>}<a className="cayo-pro-secondary" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${phone}?text=${text}`}>Consultar por WhatsApp</a></article>
 <article className="cayo-pro-panel"><div className="cayo-pro-payment-mark">S/</div><h2>Tarjeta · Checkout Pro</h2><p>Se abre el entorno protegido del proveedor de pago. Los datos de tarjeta nunca se escriben en Ferretería Cayo.</p><button className="cayo-pro-button" type="button" disabled={!items.length||busy} onClick={online}>{busy?"Conectando…":"Ir a pago seguro"}</button>{error&&<p className="cayo-pro-error" role="alert">{error}</p>}</article></div>
 <p className="cayo-pro-note">Importante: iniciar un pago o volver del proveedor no confirma que se haya aprobado. La tienda debe verificarlo antes de despachar. El flujo de notificaciones seguras aún requiere configuración.</p></div>;
}
