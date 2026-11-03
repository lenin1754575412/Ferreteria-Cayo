import type { ReactNode } from "react";
import RegistroPremium from "./RegistroPremium";

export default function RegistroLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <RegistroPremium>{children}</RegistroPremium>;
}