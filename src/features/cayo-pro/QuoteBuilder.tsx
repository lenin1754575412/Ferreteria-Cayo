"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/features/cart";
const money=(n:number)=>new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN"}).format(n);
export function QuoteBuilder() {
 const {items,subtotal,setQuantity,removeItem}=useCart();
 const [customer,setCustomer]=useState("");const [reference,setReference]=useState("");const [busy,setBusy]=useState(false);const [message,setMessage]=useState("");
 const download=async()=>{if(!items.length)return;setBusy(true);setMessage("");try{
  const {jsPDF}=await import("jspdf");const doc=new jsPDF({unit:"mm",format:"a4"});let y=18;
  const fresh=()=>{if(y>266){doc.addPage();y=18;}};
  doc.setFillColor(20,34,48);doc.rect(0,0,210,42,"F");doc.setTextColor(255,255,255);doc.setFontSize(18);doc.text("FERRETERIA CAYO",16,20);doc.setFontSize(10);doc.text("Cotizacion comercial (no es comprobante de pago)",16,30);
  doc.setTextColor(30,41,59);y=54;const now=new Date();const code=`COT-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,"0")}${String(now.getDate()).padStart(2,"0")}-${Math.floor(Math.random()*9000+1000)}`;
  doc.setFontSize(11);doc.text(`Cotizacion: ${code}`,16,y);y+=8;doc.text(`Fecha: ${now.toLocaleDateString("es-PE")}`,16,y);y+=8;
  doc.text(`Cliente: ${(customer.trim()||"No indicado").slice(0,80)}`,16,y);y+=8;
  if(reference.trim()){doc.text(`Referencia: ${reference.trim().slice(0,80)}`,16,y);y+=8;}
  y+=3;doc.setFontSize(9);
  items.forEach(({product,quantity},idx)=>{fresh();const name=doc.splitTextToSize(`${idx+1}. ${product.name}`,112);const height=Math.max(12,name.length*5+3);if(y+height>270){doc.addPage();y=18;}doc.text(name,16,y);doc.text(`x${quantity}`,139,y);doc.text(money(quantity*product.price),195,y,{align:"right"});y+=height;doc.setDrawColor(226,232,240);doc.line(16,y-4,195,y-4);});
  if(y>265){doc.addPage();y=18;}y+=8;doc.setFontSize(13);doc.setFont("helvetica","bold");doc.text(`TOTAL REFERENCIAL: ${money(subtotal)}`,195,y,{align:"right"});y+=12;doc.setFont("helvetica","normal");doc.setFontSize(9);
  const warning=doc.splitTextToSize("Precios y disponibilidad sujetos a confirmacion del comercio. Esta cotizacion no acredita compra, reserva ni pago. El costo de envio no esta incluido.",180);doc.text(warning,16,y);
  doc.save(`${code}.pdf`);setMessage("PDF generado en tu equipo.");
 }catch{setMessage("No se pudo generar el PDF. Comprueba que jspdf esté instalado.");}finally{setBusy(false);}};
 return <div className="cayo-pro"><div className="cayo-pro-heading"><div><span className="cayo-pro-topline">COTIZACIONES</span><h1>Prepara tu presupuesto</h1><p>Usa los productos que agregaste al carrito. Descarga un PDF listo para compartir.</p></div><Link className="cayo-pro-secondary" href="/catalogo-pro">Agregar productos</Link></div>
 <div className="cayo-pro-panel"><div className="cayo-pro-two"><label>Nombre del cliente<input maxLength={80} value={customer} onChange={e=>setCustomer(e.target.value)} placeholder="Nombre o razón social" /></label><label>Proyecto (opcional)<input maxLength={80} value={reference} onChange={e=>setReference(e.target.value)} placeholder="Obra, reparación, etc." /></label></div>
 {items.length===0?<div className="cayo-pro-empty">El carrito está vacío. <Link href="/catalogo-pro">Ver catálogo</Link></div>:<div className="cayo-pro-quote-items">{items.map(({product,quantity})=><div className="cayo-pro-quote-row" key={product.id}><div><strong>{product.name}</strong><small>{money(product.price)} por unidad</small></div><label>Cantidad<input type="number" min="1" max={product.stock} value={quantity} onChange={e=>setQuantity(product.id,Number(e.target.value)||1)} /></label><strong>{money(quantity*product.price)}</strong><button type="button" className="cayo-pro-secondary" onClick={()=>removeItem(product.id)}>Quitar</button></div>)}</div>}
 <div className="cayo-pro-quote-total"><span>Total referencial</span><strong>{money(subtotal)}</strong></div><p className="cayo-pro-note">La cotización no es una factura ni confirma stock, descuentos o entrega.</p><button type="button" className="cayo-pro-button" disabled={!items.length||busy} onClick={download}>{busy?"Generando…":"Descargar cotización PDF"}</button>{message&&<p role="status">{message}</p>}</div></div>;
}
