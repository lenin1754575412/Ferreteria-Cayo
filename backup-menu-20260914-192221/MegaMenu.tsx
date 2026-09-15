import Link from "next/link";

import {
  menuColumns,
  slugify,
} from "@/features/catalog";

export function MegaMenu() {

  return (
    <div className="mega">

      {menuColumns.map(
        (column, index) => (

          <div key={index}>

            {column.map(
              (category) => (

                <Link
                  key={category}
                  href={
                    `/subcategorias/${slugify(category)}`
                  }
                >
                  › {category}
                </Link>

              )
            )}

          </div>

        )
      )}

    </div>
  );
}