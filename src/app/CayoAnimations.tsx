"use client";

import { useEffect } from "react";

export default function CayoAnimations() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const home = window.location.pathname === "/";
    if (!home) return;

    document.body.classList.add("cayo-motion");

    const selectors = [
      "main article",
      "main section",
      "main [class*='card']",
      "main [class*='tarjeta']"
    ];

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        selectors.join(",")
      )
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cayo-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    targets.forEach((element) => {
      // Evita ocultar secciones principales o contenedores
      // demasiado grandes.
      const rect = element.getBoundingClientRect();

      if (
        rect.height > 0 &&
        rect.height < window.innerHeight * 0.75 &&
        rect.top > window.innerHeight
      ) {
        element.classList.add("cayo-reveal");
        observer.observe(element);
      }
    });

    // Identifica el banner por sus clases existentes.
    const hero = document.querySelector<HTMLElement>(
      "main [class*='hero'], main [class*='banner']"
    );

    if (hero) {
      hero.classList.add("cayo-hero-motion");
    }

    // Identifica las tarjetas de marcas.
    const brandSelectors = [
      "main [class*='marca']",
      "main [class*='brand']"
    ];

    const brands = document.querySelectorAll<HTMLElement>(
      brandSelectors.join(",")
    );

    brands.forEach((element) => {
      if (
        element.matches("a, button") ||
        element.querySelector("img")
      ) {
        element.classList.add("cayo-brand-motion");
      }
    });

    return () => {
      observer.disconnect();
      document.body.classList.remove("cayo-motion");
      targets.forEach((el) => {
        el.classList.remove("cayo-reveal", "cayo-visible");
      });
      hero?.classList.remove("cayo-hero-motion");
      brands.forEach((el) => {
        el.classList.remove("cayo-brand-motion");
      });
    };
  }, []);

  return null;
}