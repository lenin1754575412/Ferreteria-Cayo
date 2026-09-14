import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  dark?: boolean;
};

export function Eyebrow({
  children,
  dark = false,
}: EyebrowProps) {

  return (
    <span className={`eyebrow${dark ? " dark" : ""}`}>
      {children}
    </span>
  );
}