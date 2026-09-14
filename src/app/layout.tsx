import type {
  Metadata,
} from "next";

import type {
  ReactNode,
} from "react";

import {
  DigitalAnimations,
} from "@/features/animations";

import "./globals.css";

export const metadata: Metadata = {
  title:
    "Ferretería Cayo | Herramientas y Construcción",

  description:
    "Ferretería Cayo: herramientas, construcción, pinturas, iluminación, seguridad y más.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <html lang="es">

      <body>

        <DigitalAnimations />

        {children}

      </body>

    </html>
  );
}