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
          label: "Herramientas ElÃ©ctricas",
          href: "/subcategorias/herramientas-electricas",
        },
        {
          label: "Herramientas de JardÃ­n",
          href: "/subcategorias/herramientas-de-jardin",
        },
        {
          label: "Equipos de ProtecciÃ³n",
          href: "/subcategorias/equipos-de-proteccion",
        },
      ],
    },

    {
      title: "ConstrucciÃ³n",
      items: [
        {
          label: "Materiales de ConstrucciÃ³n",
          href: "/subcategorias/materiales-de-construccion",
        },
        {
          label: "Cemento y Ãridos",
          href: "/subcategorias/cemento-y-aridos",
        },
        {
          label: "TuberÃ­as y FontanerÃ­a",
          href: "/subcategorias/tuberias-y-fontaneria",
        },
        {
          label: "Puertas y Ventanas",
          href: "/subcategorias/puertas-y-ventanas",
        },
      ],
    },

    {
      title: "FerreterÃ­a",
      items: [
        {
          label: "Pinturas y Acabados",
          href: "/subcategorias/pinturas-y-acabados",
        },
        {
          label: "IluminaciÃ³n",
          href: "/subcategorias/iluminacion",
        },
        {
          label: "Cerraduras y Seguridad",
          href: "/subcategorias/cerraduras-y-seguridad",
        },
        {
          label: "Accesorios de FerreterÃ­a",
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
          label: "Herramientas ElÃ©ctricas",
          href: "/subcategorias/herramientas-electricas",
        },
      ],
    },

    {
      title: "Trabajo y Seguridad",
      items: [
        {
          label: "Equipos de ProtecciÃ³n",
          href: "/subcategorias/equipos-de-proteccion",
        },
        {
          label: "Accesorios de FerreterÃ­a",
          href: "/subcategorias/accesorios-de-ferreteria",
        },
      ],
    },

    {
      title: "Exterior",
      items: [
        {
          label: "Herramientas de JardÃ­n",
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
          label: "Materiales de ConstrucciÃ³n",
          href: "/subcategorias/materiales-de-construccion",
        },
        {
          label: "Cemento y Ãridos",
          href: "/subcategorias/cemento-y-aridos",
        },
      ],
    },

    {
      title: "Instalaciones",
      items: [
        {
          label: "TuberÃ­as y FontanerÃ­a",
          href: "/subcategorias/tuberias-y-fontaneria",
        },
        {
          label: "IluminaciÃ³n",
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
          label: "Ver todo ConstrucciÃ³n",
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
      title: "AplicaciÃ³n",
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
      title: "PreparaciÃ³n y Acabado",
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
