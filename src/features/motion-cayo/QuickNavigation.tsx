"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Search, X, Wrench, PaintRoller, Tag, Truck } from "lucide-react";

const sections = [
  { name: "Todos los productos", url: "/productos", Icon: Search },
  { name: "Herramientas", url: "/subcategorias/herramientas-manuales", Icon: Wrench },
  { name: "Pinturas", url: "/subcategorias/pinturas-y-acabados", Icon: PaintRoller },
  { name: "Promociones", url: "/promociones", Icon: Tag },
  { name: "Envíos", url: "/envios", Icon: Truck },
];

export default function QuickNavigation() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const privatePage = /^\/(gestion|cuenta|login|registro|mis-pedidos|pago-resultado|pagos-cayo)(\/|$)/.test(pathname);

  useEffect(() => {
    if (privatePage) return;
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [privatePage]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  const navigate = (url: string) => {
    router.push(url);
    setOpen(false);
    setQuery("");
  };

  if (privatePage) return null;
  const matches = sections.filter((item) => item.name.toLocaleLowerCase("es").includes(query.trim().toLocaleLowerCase("es")));

  return (
    <>
      <button type="button" className="cayo-quick-trigger" onClick={() => setOpen(true)} aria-label="Abrir buscador rápido" title="Buscar (Ctrl+K)">
        <Search size={17} aria-hidden="true" /><span>Explorar</span><kbd>Ctrl K</kbd>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="cayo-quick-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.2 }}>
            <motion.div className="cayo-quick-dialog" role="dialog" aria-modal="true" aria-label="Buscador rápido de la tienda"
              initial={reduced ? false : { opacity: 0, y: -15, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? {} : { opacity: 0, y: -8, scale: 0.99 }} transition={{ duration: reduced ? 0 : 0.22 }}>
              <form className="cayo-quick-form" onSubmit={(event) => { event.preventDefault(); navigate(query.trim() ? `/productos?q=${encodeURIComponent(query.trim())}` : "/productos"); }}>
                <Search size={22} aria-hidden="true" />
                <input ref={inputRef} aria-label="¿Qué estás buscando?" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar taladros, pinturas, cemento..." />
                <button aria-label="Cerrar búsqueda" type="button" onClick={() => setOpen(false)}><X size={20} /></button>
              </form>
              <div className="cayo-quick-list">
                <p className="cayo-quick-heading">{query ? "Explorar resultados" : "Accesos rápidos"}</p>
                {query.trim() && <button type="button" onClick={() => navigate(`/productos?q=${encodeURIComponent(query.trim())}`)} className="cayo-quick-item"><Search size={19} /> Buscar «{query.trim()}» en productos <ArrowRight className="cayo-quick-arrow" size={18}/></button>}
                {matches.map(({ name, url, Icon }) => <button type="button" key={url} className="cayo-quick-item" onClick={() => navigate(url)}><Icon size={19} />{name}<ArrowRight className="cayo-quick-arrow" size={18}/></button>)}
              </div>
              <div className="cayo-quick-footer">Esc para cerrar · Enter para buscar</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
