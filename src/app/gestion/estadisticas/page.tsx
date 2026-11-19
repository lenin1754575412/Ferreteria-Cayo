export const dynamic="force-dynamic";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import Link from "next/link";
import {api} from "@/server/service";
import {getCatalogProducts} from "@/features/catalog/server/product.repository";
import {categoryImages} from "@/features/catalog";
const money=(n:number)=>new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN"}).format(n);
export const metadata={title:"Estadísticas de inventario | Cayo"};
export default async function Page(){
 const user=await api.session(cookies().get("cayo_session")?.value);
 if(!user)redirect("/login");
 if(user.role==="cliente")redirect("/cuenta");
 const products=await getCatalogProducts();
 const total=products.length;const low=products.filter(p=>p.stock>0&&p.stock<=5);const zero=products.filter(p=>p.stock<=0);
 const inventory=products.reduce((s,p)=>s+(p.stock>0?p.price*p.stock:0),0);
 const reference=products.filter(p=>p.img===categoryImages[p.cat]);
 const group=Array.from(new Set(products.map(p=>p.cat))).map(cat=>({name:cat,count:products.filter(p=>p.cat===cat).length})).sort((a,b)=>b.count-a.count);
 const max=Math.max(1,...group.map(x=>x.count));
 return <main className="cayo-pro-shell"><div className="cayo-pro"><div className="cayo-pro-heading"><div><span className="cayo-pro-topline">PANEL ADMINISTRATIVO</span><h1>Estadísticas de inventario</h1><p>Información calculada del catálogo actual. No son ventas ni ingresos reales.</p></div><Link className="cayo-pro-secondary" href="/gestion">Volver a gestión</Link></div>
 <div className="cayo-pro-stats"><div><small>Productos</small><strong>{total}</strong></div><div><small>Stock bajo (1–5)</small><strong>{low.length}</strong></div><div><small>Agotados</small><strong>{zero.length}</strong></div><div><small>Valor teórico de inventario</small><strong>{money(inventory)}</strong></div></div>
 <div className="cayo-pro-stat-panels"><section className="cayo-pro-panel"><h2>Productos por categoría</h2>{group.map(row=><div key={row.name} className="cayo-pro-bar-row"><div><span>{row.name}</span><strong>{row.count}</strong></div><div className="cayo-pro-track"><span style={{width:`${Math.max(2,row.count/max*100)}%`}}/></div></div>)}</section>
 <section className="cayo-pro-panel"><h2>Revisión de catálogo</h2><p>{reference.length} productos muestran todavía la fotografía general de su categoría.</p><p>Para asignar fotos reales individuales, usa el generador de mapa incluido en el kit.</p><Link className="cayo-pro-button" href="/catalogo-pro">Revisar catálogo</Link><h3>Alertas de stock</h3>{[...zero,...low].slice(0,12).map(p=><p key={p.id} className="cayo-pro-alert-row"><strong>{p.name}</strong><span>{p.stock} unidades</span></p>)}{!zero.length&&!low.length&&<p>No hay alertas de stock.</p>}</section></div>
 <p className="cayo-pro-note">El valor teórico se calcula como suma de precio × unidades disponibles. No representa ingresos, utilidad ni ventas cobradas. Para operaciones administrativas utiliza el panel original de Gestión.</p></div></main>;
}
