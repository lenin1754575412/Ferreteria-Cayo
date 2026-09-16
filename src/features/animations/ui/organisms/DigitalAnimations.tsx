"use client";

import {
  useEffect,
} from "react";

import {
  usePathname,
} from "next/navigation";

import anime from "animejs";

/**
 * Selectores de elementos que se revelan al entrar en pantalla.
 * Se cubren tarjetas, grillas, cabeceras y bloques de todas las páginas.
 */
const REVEAL_SELECTOR = [
  ".benefit-item",
  ".section-head",
  ".subcard",
  ".product",
  ".product-card",
  ".info-card",
  ".contact-card",
  ".category-card",
  ".filters",
  ".empty",
  ".footer-grid > div",
  ".crumb",
  ".products-layout > *",
  ".product-detail",
  ".order-card",
  ".order-row",
  ".checkout-layout > *",
  ".brands-pro-hero-content > *",
  ".brands-pro-highlight-card",
  ".brands-pro-card",
  ".brands-pro-section-heading",
  ".brands-pro-cta-box",
  ".cayo-cart-hero-inner",
  ".cayo-cart-main > *",
  ".cayo-cart-summary",
  ".cayo-cart-help",
  ".cayo-cart-category-card",
  "[data-reveal]",
].join(",");

export function DigitalAnimations() {

  const pathname =
    usePathname();

  useEffect(() => {

    if (typeof window === "undefined") {
      return;
    }

    const prefersReduced =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const nodes =
      Array.from(
        document.querySelectorAll<HTMLElement>(
          REVEAL_SELECTOR
        )
      ).filter(
        (node) =>
          !node.dataset.revealed
      );

    // Si el usuario prefiere menos movimiento, mostramos todo tal cual.
    if (prefersReduced) {

      nodes.forEach(
        (node) => {
          node.style.opacity = "1";
          node.dataset.revealed = "true";
        }
      );

      return;
    }

    // Estado inicial oculto antes de revelar.
    nodes.forEach(
      (node) => {
        node.style.opacity = "0";
        node.style.willChange =
          "opacity, transform";
      }
    );

    const revealBatch =
      (batch: HTMLElement[]) => {

        if (batch.length === 0) {
          return;
        }

        anime({
          targets: batch,

          opacity: [0, 1],

          translateY: [28, 0],

          scale: [0.98, 1],

          delay:
            anime.stagger(80),

          easing:
            "easeOutExpo",

          duration: 780,

          complete: () => {
            batch.forEach(
              (node) => {
                node.style.willChange = "auto";
              }
            );
          },
        });
      };

    const observer =
      new IntersectionObserver(
        (entries) => {

          const visible =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting
              )
              .map(
                (entry) =>
                  entry.target as HTMLElement
              )
              .filter(
                (node) =>
                  !node.dataset.revealed
              )
              .sort(
                (a, b) =>
                  a.compareDocumentPosition(b) &
                  Node.DOCUMENT_POSITION_FOLLOWING
                    ? -1
                    : 1
              );

          visible.forEach(
            (node) => {
              node.dataset.revealed = "true";
              observer.unobserve(node);
            }
          );

          revealBatch(visible);
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -8% 0px",
        }
      );

    nodes.forEach(
      (node) =>
        observer.observe(node)
    );

    // Cabecera / hero con una entrada más marcada al cargar.
    const heroTargets =
      Array.from(
        document.querySelectorAll<HTMLElement>(
          ".hero-content > *, .page-hero > *"
        )
      );

    if (heroTargets.length > 0) {

      heroTargets.forEach(
        (node) => {
          node.style.opacity = "0";
        }
      );

      anime({
        targets: heroTargets,

        opacity: [0, 1],

        translateY: [-18, 0],

        delay:
          anime.stagger(110, { start: 100 }),

        easing:
          "easeOutExpo",

        duration: 900,
      });
    }

    return () => {
      observer.disconnect();
    };

  }, [pathname]);

  return null;
}
