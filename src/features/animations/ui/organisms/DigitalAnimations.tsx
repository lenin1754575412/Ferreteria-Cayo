"use client";

import {
  useEffect,
} from "react";

import anime from "animejs";

export function DigitalAnimations() {

  useEffect(() => {

    anime({
      targets:
        ".brand-card, .subcard, .product, .info-card, .product-card",

      opacity: [
        0,
        1,
      ],

      translateY: [
        35,
        0,
      ],

      delay:
        anime.stagger(70),

      easing:
        "easeOutExpo",

      duration:
        900,
    });

    anime({
      targets:
        ".hero-strip, .banner h1, .top-banner",

      opacity: [
        0,
        1,
      ],

      translateY: [
        -15,
        0,
      ],

      easing:
        "easeOutExpo",

      duration:
        900,
    });

  }, []);

  return null;
}