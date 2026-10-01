"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
} from "react";

import {
  ChevronDown,
} from "lucide-react";

import type {
  MenuKey,
} from "../../data/menu";

import {
  MegaMenu,
} from "./MegaMenu";

type NavDropdownProps = {
  label: string;
  menu: MenuKey;
};

export function NavDropdown({
  label,
  menu,
}: NavDropdownProps) {

  const [open, setOpen] = useState(false);
  const [mobileTop, setMobileTop] = useState<number | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {

    if (typeof window === "undefined") {
      return;
    }

    /*
      En PC conservamos el hover normal.
      En celular abrimos/cerramos con toque.
    */
    if (window.innerWidth <= 760) {

      const button =
        buttonRef.current;

      if (button) {

        const rect =
          button.getBoundingClientRect();

        setMobileTop(
          Math.round(rect.bottom + 2)
        );
      }

      setOpen((value) => !value);
    }
  };

  const handleBlur = (
    event: FocusEvent<HTMLDivElement>
  ) => {

    const siguiente =
      event.relatedTarget as Node | null;

    if (
      !siguiente ||
      !event.currentTarget.contains(siguiente)
    ) {
      setOpen(false);
    }
  };

  const mobileStyle =
    mobileTop !== null
      ? ({
          "--mobile-mega-top":
            `${mobileTop}px`,
        } as CSSProperties)
      : undefined;

  return (
    <div
      className={
        `nav-item ${open ? "is-open" : ""}`
      }
      style={mobileStyle}
      onBlur={handleBlur}
    >

      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMenu}
        aria-expanded={open}
        aria-haspopup="true"
      >

        {label}

        <ChevronDown
          size={15}
          className="nav-chevron"
        />

      </button>

      <MegaMenu
        menu={menu}
      />

    </div>
  );
}
