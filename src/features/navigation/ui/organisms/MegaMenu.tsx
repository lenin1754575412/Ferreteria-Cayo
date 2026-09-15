import Link from "next/link";

import {
  megaMenus,
  type MenuKey,
} from "../../data/menu";

export function MegaMenu({
  menu,
}: {
  menu: MenuKey;
}) {

  const columns =
    megaMenus[menu];

  return (
    <div className="mega">

      {columns.map(
        (column) => (

          <div
            key={column.title}
            className="mega-column"
          >

            <h4 className="mega-title">
              {column.title}
            </h4>

            {column.items.map(
              (item) => (

                <Link
                  key={`${column.title}-${item.label}`}
                  href={item.href}
                >
                  › {item.label}
                </Link>

              )
            )}

          </div>

        )
      )}

    </div>
  );
}