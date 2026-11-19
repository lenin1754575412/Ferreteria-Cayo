"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/features/catalog";
import { useCart } from "@/features/cart";

type Props = { products: Product[]; categoryImages: Record<string,string> };
const money = (n:number) => new Intl.NumberFormat("es-PE", {style:"currency",currency:"PEN"}).format(n);
const normalize = (value:string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
export function Explorer({products,categoryImages}:Props) {
  const {addItem,count} = useCart();
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("");
  const [brand,setBrand] = useState("");
  const [minPrice,setMinPrice] = useState("");
  const [maxPrice,setMaxPrice] = useState("");
  const [sort,setSort] = useState("relevancia");
  const [onlyStock,setOnlyStock] = useState(false);
  const [offers,setOffers] = useState(false);
  const categories = useMemo(() => [...new Set(products.map(p=>p.cat))].sort(),[products]);
  const brands = useMemo(() => [...new Set(products.map(p=>p.brand))].sort(),[products]);
  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    const min = minPrice === "" ? 0 : Number(minPrice);
    const max = maxPrice === "" ? Infinity : Number(maxPrice);
    const rows = products.filter(p => {
      if (q && !normalize(`${p.name} ${p.brand} ${p.cat} ${p.sku} ${p.description}`).includes(q)) return false;
      if (category && p.cat!==category) return false;
      if (brand && p.brand!==brand) return false;
      if (p.price < min || p.price > max) return false;
      if (onlyStock && p.stock<=0) return false;
      if (offers && !p.oldPrice) return false;
      return true;
    });
    return rows.sort((a,b) => sort === "precio-asc" ? a.price-b.price : sort === "precio-desc" ? b.price-a.price : sort === "nombre" ? a.name.localeCompare(b.name) : sort === "stock" ? b.stock-a.stock : 0);
  },[products,query,category,brand,minPrice,maxPrice,sort,onlyStock,offers]);
  const reset=()=>{setQuery("");setCategory("");setBrand("");setMinPrice("");setMaxPrice("");setSort("relevancia");setOnlyStock(false);setOffers(false)};
  return <div className="cayo-pro">
    <div className="cayo-pro-heading"><div><span className="cayo-pro-topline">CATÁLOGO INTELIGENTE</span><h1>Encuentra lo que necesitas</h1><p>Filtra herramientas, materiales y más. Precios en soles.</p></div><Link href="/cotizaciones" className="cayo-pro-button">Cotizar carrito ({count})</Link></div>
    <div className="cayo-pro-explorer">
      <aside className="cayo-pro-filter" aria-label="Filtros de productos"><h2>Filtrar productos</h2>
        <label>Buscar producto<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ej.: taladro, cemento, PVC" /></label>
        <label>Categoría<select value={category} onChange={e=>setCategory(e.target.value)}><option value="">Todas</option>{categories.map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Marca<select value={brand} onChange={e=>setBrand(e.target.value)}><option value="">Todas</option>{brands.map(x=><option key={x}>{x}</option>)}</select></label>
        <div className="cayo-pro-two"><label>Desde (S/)<input type="number" min="0" value={minPrice} onChange={e=>setMinPrice(e.target.value)} /></label><label>Hasta (S/)<input type="number" min="0" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} /></label></div>
        <label>Ordenar<select value={sort} onChange={e=>setSort(e.target.value)}><option value="relevancia">Recomendados</option><option value="precio-asc">Menor precio</option><option value="precio-desc">Mayor precio</option><option value="nombre">Nombre</option><option value="stock">Más unidades</option></select></label>
        <label className="cayo-pro-check"><input type="checkbox" checked={onlyStock} onChange={e=>setOnlyStock(e.target.checked)}/> Solo disponibles</label>
        <label className="cayo-pro-check"><input type="checkbox" checked={offers} onChange={e=>setOffers(e.target.checked)}/> Solo ofertas</label>
        <button type="button" className="cayo-pro-secondary" onClick={reset}>Limpiar filtros</button>
      </aside>
      <section aria-live="polite"><div className="cayo-pro-results"><strong>{filtered.length} productos encontrados</strong><span>Carrito: {count} unidades</span></div>
        <div className="cayo-pro-cards">{filtered.map(p=><article className="cayo-pro-product" key={p.id}>
          <div className="cayo-pro-photo"><img loading="lazy" src={p.img || "/subcategorias-reales/foto-pendiente.svg"} alt={p.name} onError={e=>{if(!e.currentTarget.src.includes("foto-pendiente.svg"))e.currentTarget.src="/subcategorias-reales/foto-pendiente.svg"}} />
            {p.img === categoryImages[p.cat] && <span className="cayo-pro-photo-label">Foto de categoría · referencial</span>}
          </div><div className="cayo-pro-product-content"><span className="cayo-pro-kicker">{p.brand} · {p.cat}</span><h3>{p.name}</h3><strong className="cayo-pro-price">{money(p.price)}</strong>{p.oldPrice ? <span className="cayo-pro-oldprice">{money(p.oldPrice)}</span>:null}
            <p className={p.stock>0?"cayo-pro-instock":"cayo-pro-outstock"}>{p.stock>0?`${p.stock} en stock`:"Agotado"}</p>
            <div className="cayo-pro-actions"><button type="button" className="cayo-pro-button" disabled={p.stock<=0} onClick={()=>addItem(p)}>Agregar</button><Link href={`/productos/${p.slug}`} className="cayo-pro-secondary">Ver</Link></div>
          </div></article>)}</div>
        {!filtered.length && <div className="cayo-pro-empty">No encontramos productos. <button type="button" onClick={reset}>Mostrar todos</button></div>}
      </section>
    </div>
  </div>;
}
