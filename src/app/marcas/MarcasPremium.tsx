"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search, ArrowRight, ChevronRight,
  ShieldCheck, Truck, Headphones,
  PackageCheck, Wrench, Sparkles
} from "lucide-react";
import s from "./MarcasPremium.module.css";

type Marca = {
  nombre:string;
  categoria:string;
  descripcion:string;
  foto:string;
  color:string;
};

const fotos = {
  herramientas:"https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=85",
  construccion:"https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=800&q=85",
  pinturas:"https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=85",
  seguridad:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=85",
  plomeria:"https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=85",
  iluminacion:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=85"
};

const marcas:Marca[] = [
  {nombre:"3M",categoria:"Seguridad",descripcion:"Protección, cintas y abrasivos.",foto:fotos.seguridad,color:"#ee1724"},
  {nombre:"Bosch",categoria:"Herramientas",descripcion:"Herramientas eléctricas para tus proyectos.",foto:fotos.herramientas,color:"#e52324"},
  {nombre:"CPP",categoria:"Pinturas",descripcion:"Pinturas y recubrimientos.",foto:fotos.pinturas,color:"#e31a24"},
  {nombre:"Cayo",categoria:"Ferretería",descripcion:"Productos para construcción y reparación.",foto:fotos.herramientas,color:"#f5b900"},
  {nombre:"DeWalt",categoria:"Herramientas",descripcion:"Equipos robustos para obra y taller.",foto:fotos.herramientas,color:"#e8af00"},
  {nombre:"Fischer",categoria:"Fijaciones",descripcion:"Anclajes y soluciones de fijación.",foto:fotos.construccion,color:"#d71920"},
  {nombre:"Forte",categoria:"Construcción",descripcion:"Materiales para grandes proyectos.",foto:fotos.construccion,color:"#184a92"},
  {nombre:"Makita",categoria:"Herramientas",descripcion:"Tecnología y potencia para profesionales.",foto:fotos.herramientas,color:"#d81d25"},
  {nombre:"Oatey",categoria:"Sanitario",descripcion:"Soluciones para instalaciones sanitarias.",foto:fotos.plomeria,color:"#dc252c"},
  {nombre:"Opalux",categoria:"Iluminación",descripcion:"Iluminación eficiente para tus espacios.",foto:fotos.iluminacion,color:"#ed2626"},
  {nombre:"Pacasmayo",categoria:"Construcción",descripcion:"Cemento y materiales para obras.",foto:fotos.construccion,color:"#b72b2c"},
  {nombre:"Pavco",categoria:"Tuberías",descripcion:"Tuberías y conexiones.",foto:fotos.plomeria,color:"#1658a7"},
  {nombre:"Philips",categoria:"Iluminación",descripcion:"Luminarias y focos para el hogar.",foto:fotos.iluminacion,color:"#1260c9"},
  {nombre:"Pretul",categoria:"Herramientas",descripcion:"Herramientas para mantenimiento.",foto:fotos.herramientas,color:"#e6a800"},
  {nombre:"Sika",categoria:"Construcción",descripcion:"Selladores y aditivos de construcción.",foto:fotos.construccion,color:"#df1127"},
  {nombre:"Stanley",categoria:"Herramientas",descripcion:"Herramientas resistentes para cada trabajo.",foto:fotos.herramientas,color:"#d9a000"},
  {nombre:"Tekno",categoria:"Pinturas",descripcion:"Pinturas y acabados.",foto:fotos.pinturas,color:"#162e57"},
  {nombre:"Truper",categoria:"Herramientas",descripcion:"Herramientas y accesorios de ferretería.",foto:fotos.herramientas,color:"#f16c18"},
  {nombre:"Vainsa",categoria:"Baño y grifería",descripcion:"Griferías para cocina y baño.",foto:fotos.plomeria,color:"#24364f"},
  {nombre:"Vencedor",categoria:"Pinturas",descripcion:"Colores y acabados para tus ambientes.",foto:fotos.pinturas,color:"#1853a6"},
  {nombre:"Yale",categoria:"Seguridad",descripcion:"Cerraduras y seguridad para tu hogar.",foto:fotos.seguridad,color:"#dfb300"}
];

const filtros = [
  "Todas","Herramientas","Construcción","Pinturas",
  "Iluminación","Seguridad","Sanitario",
  "Baño y grifería","Ferretería","Fijaciones","Tuberías"
];

const destacadas = [
  "3M","Bosch","CPP","DeWalt",
  "Makita","Philips","Sika","Truper"
];

export default function MarcasPremium() {
  const [filtro,setFiltro] = useState("Todas");
  const [buscar,setBuscar] = useState("");
  const [orden,setOrden] = useState("original");

  const resultados = useMemo(()=>{
    const texto = buscar.toLocaleLowerCase("es").trim();

    const lista = marcas.filter(m=>
      (filtro==="Todas" || m.categoria===filtro) &&
      (m.nombre.toLocaleLowerCase("es").includes(texto) ||
       m.categoria.toLocaleLowerCase("es").includes(texto))
    );

    if(orden==="az") return [...lista].sort((a,b)=>a.nombre.localeCompare(b.nombre));
    if(orden==="za") return [...lista].sort((a,b)=>b.nombre.localeCompare(a.nombre));
    return lista;
  },[filtro,buscar,orden]);

  return (
    <main className={s.main}>
      <section className={s.hero}>
        <div className={s.heroContent}>
          <span className={s.eyebrow}>FERRETERÍA CAYO</span>

          <h1>Las mejores marcas<br/>
            <span>para cada proyecto</span>
          </h1>

          <p>
            Trabajamos con marcas conocidas en herramientas,
            construcción, pinturas, tuberías, iluminación y ferretería general.
          </p>

          <div className={s.heroBenefits}>
            <div><ShieldCheck/><span>Marcas reconocidas<small>Consulta nuestro catálogo</small></span></div>
            <div><Truck/><span>Stock disponible<small>Según inventario</small></span></div>
            <div><Headphones/><span>Asesoría especializada<small>Te orientamos</small></span></div>
          </div>
        </div>
      </section>

      <section className={s.featured}>
        <div className={s.featuredTitle}>
          <small>MARCAS DESTACADAS</small>
          <strong>Confianza en<br/>cada proyecto</strong>
        </div>
        <div className={s.featuredList}>
          {destacadas.map(nombre=>{
            const marca = marcas.find(m=>m.nombre===nombre)!;
            return (
              <a key={nombre}
                className={s.featuredLogo}
                href={"#marca-"+encodeURIComponent(nombre)}
                style={{color:marca.color}}>
                {nombre}
              </a>
            );
          })}
        </div>
      </section>

      <section className={s.catalogo}>
        <div className={s.catalogHeader}>
          <div>
            <span className={s.overline}>TODAS LAS MARCAS</span>
            <h2>Compra por marca</h2>
            <p>Selecciona una marca y revisa sus productos dentro del catálogo de Ferretería Cayo.</p>
          </div>
          <div className={s.total}><PackageCheck size={18}/> {resultados.length} marcas</div>
        </div>

        <div className={s.filters}>
          {filtros.map(c=>
            <button
              key={c}
              type="button"
              className={filtro===c?s.active:""}
              onClick={()=>setFiltro(c)}
              aria-pressed={filtro===c}>
              {c}
            </button>
          )}
        </div>

        <div className={s.toolbar}>
          <label className={s.searchBox}>
            <Search size={19}/>
            <input
              type="search"
              placeholder="Buscar una marca..."
              value={buscar}
              onChange={e=>setBuscar(e.target.value)}
            />
          </label>

          <select
            aria-label="Ordenar marcas"
            value={orden}
            onChange={e=>setOrden(e.target.value)}>
            <option value="original">Orden original</option>
            <option value="az">Nombre (A - Z)</option>
            <option value="za">Nombre (Z - A)</option>
          </select>
        </div>

        {resultados.length===0 ? (
          <div className={s.empty}>
            No encontramos marcas con esa búsqueda.
            <button onClick={()=>{setFiltro("Todas");setBuscar("");}}>
              Ver todas
            </button>
          </div>
        ) : (
          <div className={s.grid}>
            {resultados.map((m,index)=>(
              <article id={"marca-"+m.nombre} key={m.nombre} className={s.card}>
                <div className={s.photo}>
                  <img
                    src={m.foto}
                    alt={"Productos de "+m.categoria}
                    loading="lazy"
                    onError={e=>{e.currentTarget.style.opacity="0";}}
                  />
                </div>

                <div className={s.cardContent}>
                  <div className={s.cardTop}>
                    <span className={s.category}>{m.categoria}</span>
                    <span className={s.number}>
                      {String(index+1).padStart(2,"0")}
                    </span>
                  </div>

                  <div className={s.wordmark} style={{color:m.color}}>
                    {m.nombre}
                  </div>

                  <p>{m.descripcion}</p>

                  <Link href={"/productos?q="+encodeURIComponent(m.nombre)}
                    className={s.productLink}>
                    Ver productos <ArrowRight size={16}/>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className={s.cta}>
        <div className={s.ctaText}>
          <span><Sparkles size={16}/> ¿NO SABES QUÉ MARCA ELEGIR?</span>
          <h2>Te ayudamos a encontrar <em>la mejor opción</em></h2>
          <p>Escríbenos y te orientamos según tu necesidad, presupuesto y proyecto.</p>
        </div>

        <div className={s.ctaActions}>
          <a
            href="https://wa.me/51992110555?text=Hola%20Ferreteria%20Cayo,%20quiero%20consultar%20una%20marca"
            target="_blank"
            rel="noopener noreferrer">
            <Headphones size={17}/> Consultar por WhatsApp
          </a>

          <Link href="/productos">
            Ver catálogo <ChevronRight size={17}/>
          </Link>
        </div>
      </section>

      <section className={s.benefits}>
        <span><ShieldCheck/> Marcas reconocidas</span>
        <span><PackageCheck/> Consulta de stock</span>
        <span><Truck/> Delivery y recojo</span>
        <span><Wrench/> Asesoría personalizada</span>
      </section>
    </main>
  );
}