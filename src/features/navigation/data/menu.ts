export type MenuKey =
  | "productos"
  | "herramientas"
  | "construccion"
  | "pinturas";

export type MenuItem = {
  label: string;
  href: string;
};

export type MenuColumn = {
  title: string;
  items: MenuItem[];
};

export const megaMenus: Record<
  MenuKey,
  MenuColumn[]
> = {

  // ========================================================
  // PRODUCTOS
  // MUESTRA TODAS LAS CATEGORIAS
  // ========================================================

  productos: [
    {
      title: "Herramientas",
      items: [
        {
          label: "Herramientas Manuales",
          href: "/subcategorias/herramientas-manuales",
        },
        {
          label: "Herramientas Eléctricas",
          href: "/subcategorias/herramientas-electricas",
        },
        {
          label: "Herramientas de Jardín",
          href: "/subcategorias/herramientas-de-jardin",
        },
        {
          label: "Equipos de Protección",
          href: "/subcategorias/equipos-de-proteccion",
        },
      ],
    },

    {
      title: "Construcción",
      items: [
        {
          label: "Materiales de Construcción",
          href: "/subcategorias/materiales-de-construccion",
        },
        {
          label: "Cemento y Áridos",
          href: "/subcategorias/cemento-y-aridos",
        },
        {
          label: "Tuberías y Fontanería",
          href: "/subcategorias/tuberias-y-fontaneria",
        },
        {
          label: "Puertas y Ventanas",
          href: "/subcategorias/puertas-y-ventanas",
        },
      ],
    },

    {
      title: "Ferretería",
      items: [
        {
          label: "Pinturas y Acabados",
          href: "/subcategorias/pinturas-y-acabados",
        },
        {
          label: "Iluminación",
          href: "/subcategorias/iluminacion",
        },
        {
          label: "Cerraduras y Seguridad",
          href: "/subcategorias/cerraduras-y-seguridad",
        },
        {
          label: "Accesorios de Ferretería",
          href: "/subcategorias/accesorios-de-ferreteria",
        },
      ],
    },
  ],

  // ========================================================
  // HERRAMIENTAS
  // SOLO COSAS DE HERRAMIENTAS
  // ========================================================

  herramientas: [
    {
      title: "Herramientas",
      items: [
        {
          label: "Herramientas Manuales",
          href: "/subcategorias/herramientas-manuales",
        },
        {
          label: "Herramientas Eléctricas",
          href: "/subcategorias/herramientas-electricas",
        },
      ],
    },

    {
      title: "Trabajo y Seguridad",
      items: [
        {
          label: "Equipos de Protección",
          href: "/subcategorias/equipos-de-proteccion",
        },
        {
          label: "Accesorios de Ferretería",
          href: "/subcategorias/accesorios-de-ferreteria",
        },
      ],
    },

    {
      title: "Exterior",
      items: [
        {
          label: "Herramientas de Jardín",
          href: "/subcategorias/herramientas-de-jardin",
        },
        {
          label: "Ver todas las herramientas",
          href: "/productos?q=herramienta",
        },
      ],
    },
  ],

  // ========================================================
  // CONSTRUCCION
  // SOLO PRODUCTOS DE CONSTRUCCION
  // ========================================================

  construccion: [
    {
      title: "Materiales",
      items: [
        {
          label: "Materiales de Construcción",
          href: "/subcategorias/materiales-de-construccion",
        },
        {
          label: "Cemento y Áridos",
          href: "/subcategorias/cemento-y-aridos",
        },
      ],
    },

    {
      title: "Instalaciones",
      items: [
        {
          label: "Tuberías y Fontanería",
          href: "/subcategorias/tuberias-y-fontaneria",
        },
        {
          label: "Iluminación",
          href: "/subcategorias/iluminacion",
        },
      ],
    },

    {
      title: "Acabados",
      items: [
        {
          label: "Puertas y Ventanas",
          href: "/subcategorias/puertas-y-ventanas",
        },
        {
          label: "Cerraduras y Seguridad",
          href: "/subcategorias/cerraduras-y-seguridad",
        },
        {
          label: "Ver todo Construcción",
          href: "/productos?categoria=Materiales%20de%20Construcci%C3%B3n",
        },
      ],
    },
  ],

  // ========================================================
  // PINTURAS
  // SOLO COSAS DE PINTURA Y ACABADOS
  // ========================================================

  pinturas: [
    {
      title: "Pinturas",
      items: [
        {
          label: "Pinturas y Acabados",
          href: "/subcategorias/pinturas-y-acabados",
        },
        {
        label: "Todas las Pinturas",
        href: "/productos?categoria=Pinturas%20y%20Acabados",
      },
      {
        label: "Colores de Pintura",
        href: "/colores-pintura",
      },
      ],
    },

    {
      title: "Aplicación",
      items: [
        {
          label: "Rodillos",
          href: "/productos?q=rodillo",
        },
        {
          label: "Brochas",
          href: "/productos?q=brocha",
        },
        {
          label: "Accesorios para Pintar",
          href: "/productos?categoria=Pinturas%20y%20Acabados",
        },
      ],
    },

    {
      title: "Preparación y Acabado",
      items: [
        {
          label: "Selladores",
          href: "/productos?q=sellador",
        },
        {
          label: "Adhesivos",
          href: "/productos?q=adhesivo",
        },
        {
          label: "Ofertas en Pinturas",
          href: "/productos?categoria=Pinturas%20y%20Acabados&ofertas=1",
        },
      ],
    },
  ],
};
