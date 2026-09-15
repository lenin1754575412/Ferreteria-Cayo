import {
  ChevronDown,
} from "lucide-react";

import {
  MegaMenu,
} from "./MegaMenu";

type NavDropdownProps = {
  label: string;
};

export function NavDropdown({
  label,
}: NavDropdownProps) {

  return (
    <div className="nav-item">

      <button type="button">

        {label}

        <ChevronDown size={15} />

      </button>

      <MegaMenu />

    </div>
  );
}