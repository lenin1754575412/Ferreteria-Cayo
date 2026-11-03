"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ChevronRight,
  Drill,
  HardHat,
  PaintRoller,
  ShieldCheck,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";

const destinations = [
  {
    title: "Herramientas",
    text: "Equípate para cada trabajo",
    href: "/subcategorias/herramientas-electricas",
    Icon: Drill,
    tag: "POTENCIA",
    type: "tools",
  },
  {
    title: "Construcción",
    text: "Materiales para tus proyectos",
    href: "/subcategorias/materiales-de-construccion",
    Icon: HardHat,
    tag: "PROYECTOS",
    type: "build",
  },
  {
    title: "Pinturas",
    text: "Renueva cada espacio",
    href: "/subcategorias/pinturas-y-acabados",
    Icon: PaintRoller,
    tag: "ACABADOS",
    type: "paint",
  },
] as const;

export default function MotionShowcase() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="cayo-motion-spotlight cayo-motion-reveal" aria-labelledby="cayo-motion-title">
      <div className="cayo-motion-intro">
        <div>
          <p className="cayo-motion-kicker"><Sparkles aria-hidden="true" size={15} /> TU PRÓXIMO PROYECTO EMPIEZA AQUÍ</p>
          <h2 id="cayo-motion-title">Todo para hacerlo <span>realidad.</span></h2>
          <p className="cayo-motion-description">Explora herramientas, construcción y acabados para cada etapa de tu proyecto.</p>
        </div>
        <Link className="cayo-motion-all" href="/productos">Ver catálogo <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
      <div className="cayo-motion-grid">
        {destinations.map(({ title, text, href, Icon, tag, type }, index) => (
          <motion.div
            key={href}
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: reduceMotion ? 0 : index * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { y: -6 }}
            className={`cayo-motion-feature cayo-motion-${type}`}
          >
            <Link href={href} className="cayo-motion-feature-link" aria-label={`Ver ${title}`}>
              <div className="cayo-motion-feature-top"><span>{tag}</span><ArrowUpRight size={20} aria-hidden="true" /></div>
              <div className="cayo-motion-art"><span className="cayo-motion-art-glow" /><Icon size={112} strokeWidth={1.1} aria-hidden="true" /></div>
              <div className="cayo-motion-feature-bottom"><div><h3>{title}</h3><p>{text}</p></div><span className="cayo-motion-round-arrow"><ChevronRight size={22} aria-hidden="true" /></span></div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="cayo-motion-trust" aria-label="Ventajas de compra">
        <span><Truck size={17} aria-hidden="true" /> Delivery y recojo</span>
        <span><ShieldCheck size={17} aria-hidden="true" /> Atención personalizada</span>
        <span><Zap size={17} aria-hidden="true" /> Consulta por WhatsApp</span>
      </div>
    </section>
  );
}
