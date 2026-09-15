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

  return (
    <div className="nav-item">

      <button type="button">

        {label}

        <ChevronDown size={15} />

      </button>

      <MegaMenu
        menu={menu}
      />

    </div>
  );
}