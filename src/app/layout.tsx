import CookieBanner from "@/components/CookieBanner";
import type {
  Metadata
} from "next";

import type {
  ReactNode
} from "react";

import {
  Analytics
} from "@vercel/analytics/react";

import {
  CartProvider
} from "@/features/cart";

import {
  DigitalAnimations
} from "@/features/animations";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ferreteria-cayo.vercel.app"),
  verification: { google: "TU_CODIGO_AQUI" },
  title: {
    default:
      "FerreterÃ­a Cayo",
    template:
      "%s | FerreterÃ­a Cayo"
  },

  description:
    "Herramientas, construcciÃ³n, pinturas, iluminaciÃ³n y ferreterÃ­a."
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {

  return (
    <html lang="es">
      <body>

        <CartProvider>

          <DigitalAnimations />

          {children}

        </CartProvider>

        <Analytics />

              <CookieBanner />
      </body>
    </html>
  );
}

