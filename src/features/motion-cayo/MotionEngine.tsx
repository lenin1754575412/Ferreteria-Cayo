"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function isPrivate(pathname: string) {
  return /^\/(gestion|cuenta|login|registro|mis-pedidos|pago-resultado|pagos-cayo)(\/|$)/.test(pathname);
}

export default function MotionEngine() {
  const pathname = usePathname() ?? "/";
  const progress = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    if (isPrivate(pathname)) return;

    let ticking = false;
    const updateProgress = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = maximum > 0 ? Math.max(0, Math.min(1, window.scrollY / maximum)) : 0;
      if (progress.current) progress.current.style.transform = `scaleX(${ratio})`;
      setShowTop(window.scrollY > 700);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateProgress);
      }
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (isPrivate(pathname) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    let context: ReturnType<typeof gsap.context> | null = null;
    const frame = window.requestAnimationFrame(() => {
      context = gsap.context(() => {
        if (pathname === "/") {
          const heroElements = gsap.utils.toArray<HTMLElement>(".hero-content > *");
          if (heroElements.length) {
            gsap.fromTo(heroElements,
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.78, stagger: 0.1, ease: "power3.out", clearProps: "all" }
            );
          }
        }
        // Animación por scroll en secciones propias, sin cambiar formularios o carrito.
        gsap.utils.toArray<HTMLElement>(".cayo-motion-reveal").forEach((element) => {
          gsap.fromTo(element,
            { opacity: 0.95, y: 18 },
            {
              opacity: 1, y: 0, duration: 0.85, ease: "power2.out",
              scrollTrigger: { trigger: element, start: "top 96%", once: true },
              clearProps: "all",
            }
          );
        });
      });
    });
    return () => {
      window.cancelAnimationFrame(frame);
      context?.revert();
    };
  }, [pathname]);

  if (isPrivate(pathname)) return null;

  return (
    <>
      <div className="cayo-scroll-progress" aria-hidden="true" ref={progress} />
      {showTop && (
        <button className="cayo-scroll-top" type="button" aria-label="Volver arriba" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}>
          <ArrowUp size={20} aria-hidden="true" />
        </button>
      )}
    </>
  );
}
