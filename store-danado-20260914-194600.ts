import { productImages } from "./productImages";

export type Product = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  cat: string;
  brand: string;
  price: number;
  oldPrice?: number;
  stock: number;
  img: string;
  images?: string[];
  badge?: string;
  description: string;
  specs?: Record<string, string>;
  featured?: boolean;
  active?: boolean;
};

export const phone = "51992100555";

export const categories = [
  "Herramientas Manuales",
  "Herramientas ElÃ©ctricas",
  "Materiales de ConstrucciÃ³n",
  "Pinturas y Acabados",
  "IluminaciÃ³n",
  "TuberÃ­as y FontanerÃ­a",
  "Cerraduras y Seguridad",
  "Accesorios de FerreterÃ­a",
  "Equipos de ProtecciÃ³n",
  "Puertas y Ventanas",
  "Herramientas de JardÃ­n",
  "Cemento y Ãridos",
];

export const categoryImages: Record<string, string> = {
  "Herramientas Manuales":
    "https://www.materiel-mngi.fr/public/donnees/cms/sources/pages/mngi-4.jpg",

  "Herramientas ElÃ©ctricas":
    "https://static.wixstatic.com/media/8673d9_d44810fb109a4487b1207dee4a4b4f8f~mv2.jpg/v1/fill/w_980,h_654,al_c,q_85/8673d9_d44810fb109a4487b1207dee4a4b4f8f~mv2.jpg",

  "Materiales de ConstrucciÃ³n":
    "https://www.buildsvia.com/uploadfile/ueditor/image/202509/1758530864ab8f91.jpg",

  "Pinturas y Acabados":
    "https://www.mondopratico.it/media/arts/cfadda_cagliari_%283%29.jpeg",

  "IluminaciÃ³n":
    "https://nmrcdn.s3.amazonaws.com/assets/963/assets/responsive/524000/524097/web_elec.jpg",

  "TuberÃ­as y FontanerÃ­a":
    "https://vhrbarnesville.com/cdn/shop/files/Plumbing_Gallery_-_Village_Hardware_and_Rental_-_500_x_500_1_800x.png",

  "Cerraduras y Seguridad":
    "https://trillingtruevaluehardware.com/wp-content/uploads/2023/04/IMG_20230418_131531-1-scaled.jpg",

  "Accesorios de FerreterÃ­a":
    "https://www.buildsvia.com/uploadfile/ueditor/image/202509/1758530864ab8f91.jpg",

  "Equipos de ProtecciÃ³n":
    "https://grupotrevor.com/assets/img/gallery/delicias3.jpeg",

  "Puertas y Ventanas":
    "https://dyn.eu.mktgcdn.com/f/0/WFwGNFywVMHNztB31JIA3Cma_KME_x1K_pxfa066BkE.jpg",

  "Herramientas de JardÃ­n":
    "https://southhillshardware.com/cdn/shop/files/6_800x.png",

  "Cemento y Ãridos":
    "https://www.buildsvia.com/uploadfile/ueditor/image/202509/1758530864ab8f91.jpg",
};

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\/|&(),."]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

type SeedItem = {
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  stock: number;
  badge?: string;
  description: string;
};

const productSeed: Record<string, SeedItem[]> = {

  // ========================================================
  // HERRAMIENTAS MANUALES
  // ========================================================

  "Herramientas Manuales": [
    {
      name: "Martillo de uÃ±a 16 oz",
      brand: "Stanley",
      price: 39.90,
      oldPrice: 49.90,
      stock: 25,
      badge: "OFERTA",
      description:
        "Martillo de uÃ±a resistente para carpinterÃ­a, construcciÃ³n y reparaciones."
    },
    {
      name: "Juego de llaves combinadas 12 piezas",
      brand: "Stanley",
      price: 89.90,
      oldPrice: 109.90,
      stock: 18,
      badge: "-18%",
      description:
        "Juego de llaves combinadas para trabajos mecÃ¡nicos y mantenimiento."
    },
    {
      name: "Alicate universal 8 pulgadas",
      brand: "Truper",
      price: 34.90,
      stock: 32,
      description:
        "Alicate universal con agarre cÃ³modo para corte, sujeciÃ³n y reparaciones."
    },
    {
      name: "Set de destornilladores 6 piezas",
      brand: "Pretul",
      price: 29.90,
      stock: 40,
      badge: "MÃS VENDIDO",
      description:
        "Juego de destornilladores planos y estrella para hogar y taller."
    },
    {
      name: "Cinta mÃ©trica profesional 5 m",
      brand: "Stanley",
      price: 24.90,
      stock: 55,
      description:
        "Cinta mÃ©trica compacta de cinco metros para mediciones precisas."
    }
  ],

  // ========================================================
  // HERRAMIENTAS ELECTRICAS
  // ========================================================

  "Herramientas ElÃ©ctricas": [
    {
      name: "Taladro percutor 13 mm",
      brand: "Bosch",
      price: 299.90,
      oldPrice: 349.90,
      stock: 12,
      badge: "OFERTA",
      description:
        "Taladro percutor para madera, metal y trabajos de albaÃ±ilerÃ­a."
    },
    {
      name: "Amoladora angular 4 1/2 pulgadas",
      brand: "DeWalt",
      price: 319.90,
      oldPrice: 359.90,
      stock: 9,
      badge: "-11%",
      description:
        "Amoladora potente para corte, desbaste y trabajos profesionales."
    },
    {
      name: "Atornillador inalÃ¡mbrico 12V",
      brand: "Makita",
      price: 279.90,
      stock: 14,
      description:
        "Atornillador inalÃ¡mbrico compacto para instalaciÃ³n y montaje."
    },
    {
      name: "Sierra circular 7 1/4 pulgadas",
      brand: "Bosch",
      price: 389.90,
      stock: 7,
      badge: "PRO",
      description:
        "Sierra circular para cortes rÃ¡pidos y precisos en madera."
    },
    {
      name: "Lijadora orbital elÃ©ctrica",
      brand: "DeWalt",
      price: 249.90,
      stock: 10,
      description:
        "Lijadora orbital para acabados en madera y superficies."
    }
  ],

  // ========================================================
  // MATERIALES DE CONSTRUCCION
  // ========================================================

  "Materiales de ConstrucciÃ³n": [
    {
      name: "Pegamento para cerÃ¡mico 25 kg",
      brand: "Sika",
      price: 42.90,
      stock: 60,
      description:
        "Adhesivo para instalaciÃ³n de cerÃ¡micos en pisos y paredes."
    },
    {
      name: "Sellador multiuso 300 ml",
      brand: "Sika",
      price: 29.90,
      oldPrice: 34.90,
      stock: 36,
      badge: "OFERTA",
      description:
        "Sellador flexible para juntas, grietas y trabajos de construcciÃ³n."
    },
    {
      name: "Espuma expansiva 500 ml",
      brand: "Sika",
      price: 39.90,
      stock: 30,
      description:
        "Espuma expansiva para relleno, aislamiento y sellado."
    },
    {
      name: "Silicona transparente 280 ml",
      brand: "Sika",
      price: 22.90,
      stock: 45,
      description:
        "Silicona transparente para vidrio, aluminio y aplicaciones generales."
    },
    {
      name: "Yeso para construcciÃ³n 20 kg",
      brand: "Cayo",
      price: 27.90,
      stock: 48,
      badge: "NUEVO",
      description:
        "Yeso de uso general para acabados y reparaciones interiores."
    }
  ],

  // ========================================================
  // PINTURAS Y ACABADOS
  // ========================================================

  "Pinturas y Acabados": [
    {
      name: "Pintura lÃ¡tex blanco 4 L",
      brand: "CPP",
      price: 64.90,
      oldPrice: 74.90,
      stock: 30,
      badge: "OFERTA",
      description:
        "Pintura lÃ¡tex blanca para interiores con buen rendimiento."
    },
    {
      name: "Pintura lÃ¡tex color 4 L",
      brand: "Vencedor",
      price: 69.90,
      stock: 25,
      description:
        "Pintura lÃ¡tex de color para paredes interiores y exteriores."
    },
    {
      name: "Esmalte sintÃ©tico 1 galÃ³n",
      brand: "Tekno",
      price: 89.90,
      oldPrice: 99.90,
      stock: 18,
      badge: "-10%",
      description:
        "Esmalte sintÃ©tico para metal, madera y superficies preparadas."
    },
    {
      name: "Rodillo profesional 9 pulgadas",
      brand: "CPP",
      price: 24.90,
      stock: 50,
      badge: "MÃS VENDIDO",
      description:
        "Rodillo de alta cobertura para pintar paredes y techos."
    },
    {
      name: "Set de brochas 3 piezas",
      brand: "Truper",
      price: 19.90,
      stock: 42,
      description:
        "Juego de brochas para pintura, barnices y acabados."
    }
  ],

  // ========================================================
  // ILUMINACION
  // ========================================================

  "IluminaciÃ³n": [
    {
      name: "Foco LED 12W luz blanca",
      brand: "Philips",
      price: 12.90,
      stock: 80,
      badge: "AHORRO",
      description:
        "Foco LED de bajo consumo para iluminaciÃ³n residencial."
    },
    {
      name: "Foco LED 15W luz cÃ¡lida",
      brand: "Philips",
      price: 16.90,
      stock: 65,
      description:
        "Foco LED cÃ¡lido ideal para dormitorios, salas y ambientes interiores."
    },
    {
      name: "Reflector LED 50W",
      brand: "Philips",
      price: 79.90,
      oldPrice: 89.90,
      stock: 20,
      badge: "OFERTA",
      description:
        "Reflector LED para patios, fachadas, talleres y exteriores."
    },
    {
      name: "Panel LED cuadrado 18W",
      brand: "Opalux",
      price: 39.90,
      stock: 28,
      description:
        "Panel LED empotrable para iluminaciÃ³n moderna de interiores."
    },
    {
      name: "ExtensiÃ³n elÃ©ctrica 5 metros",
      brand: "Opalux",
      price: 34.90,
      stock: 35,
      description:
        "ExtensiÃ³n elÃ©ctrica para herramientas y equipos del hogar."
    }
  ],

  // ========================================================
  // TUBERIAS Y FONTANERIA
  // ========================================================

  "TuberÃ­as y FontanerÃ­a": [
    {
      name: "Tubo PVC agua 1/2 pulgada",
      brand: "Pavco",
      price: 18.90,
      stock: 100,
      description:
        "Tubo PVC para instalaciones de agua domiciliarias."
    },
    {
      name: "Codo PVC 1/2 pulgada",
      brand: "Pavco",
      price: 3.90,
      stock: 150,
      description:
        "Codo PVC para cambios de direcciÃ³n en instalaciones."
    },
    {
      name: "Tee PVC 1/2 pulgada",
      brand: "Pavco",
      price: 4.90,
      stock: 120,
      description:
        "ConexiÃ³n Tee PVC para ramificaciones de tuberÃ­a."
    },
    {
      name: "Pegamento PVC 1/4 galÃ³n",
      brand: "Oatey",
      price: 29.90,
      stock: 34,
      badge: "MÃS VENDIDO",
      description:
        "Adhesivo para uniones firmes en tuberÃ­as y accesorios PVC."
    },
    {
      name: "Grifo para lavadero cromado",
      brand: "Vainsa",
      price: 69.90,
      oldPrice: 79.90,
      stock: 16,
      badge: "OFERTA",
      description:
        "Grifo cromado resistente para lavaderos y zonas de servicio."
    }
  ],

  // ========================================================
  // CERRADURAS Y SEGURIDAD
  // ========================================================

  "Cerraduras y Seguridad": [
    {
      name: "Candado de seguridad 50 mm",
      brand: "Yale",
      price: 39.90,
      stock: 25,
      description:
        "Candado metÃ¡lico reforzado para puertas, almacenes y rejas."
    },
    {
      name: "Cerradura para puerta principal",
      brand: "Yale",
      price: 89.90,
      oldPrice: 99.90,
      stock: 14,
      badge: "OFERTA",
      description:
        "Cerradura residencial para puertas principales."
    },
    {
      name: "Cerrojo de seguridad reforzado",
      brand: "Forte",
      price: 54.90,
      stock: 20,
      description:
        "Cerrojo metÃ¡lico para reforzar puertas de hogar o negocio."
    },
    {
      name: "Candado laminado 40 mm",
      brand: "Truper",
      price: 24.90,
      stock: 40,
      description:
        "Candado compacto para cajas, puertas y gabinetes."
    },
    {
      name: "Manija con cerradura para dormitorio",
      brand: "Forte",
      price: 49.90,
      stock: 22,
      badge: "NUEVO",
      description:
        "Manija con sistema de cierre para puertas interiores."
    }
  ],

  // ========================================================
  // ACCESORIOS FERRETERIA
  // ========================================================

  "Accesorios de FerreterÃ­a": [
    {
      name: "Caja de tornillos surtidos 200 piezas",
      brand: "Truper",
      price: 34.90,
      stock: 45,
      badge: "MÃS VENDIDO",
      description:
        "Kit surtido de tornillos para reparaciones y montajes."
    },
    {
      name: "Caja de clavos surtidos 1 kg",
      brand: "Cayo",
      price: 18.90,
      stock: 70,
      description:
        "Clavos de diferentes tamaÃ±os para construcciÃ³n y carpinterÃ­a."
    },
    {
      name: "Kit de tarugos y tornillos",
      brand: "Fischer",
      price: 24.90,
      stock: 55,
      description:
        "Kit de fijaciÃ³n para paredes de concreto y mamposterÃ­a."
    },
    {
      name: "Juego de tuercas y arandelas",
      brand: "Truper",
      price: 26.90,
      stock: 38,
      description:
        "Set de tuercas y arandelas para mantenimiento y ensamblaje."
    },
    {
      name: "Cinta teflÃ³n 12 metros",
      brand: "Pavco",
      price: 4.90,
      stock: 120,
      badge: "AHORRO",
      description:
        "Cinta de teflÃ³n para sellado de conexiones roscadas."
    }
  ],

  // ========================================================
  // EQUIPOS DE PROTECCION
  // ========================================================

  "Equipos de ProtecciÃ³n": [
    {
      name: "Guantes de trabajo reforzados",
      brand: "3M",
      price: 19.90,
      stock: 50,
      description:
        "Guantes resistentes para trabajos de construcciÃ³n y mantenimiento."
    },
    {
      name: "Lentes de seguridad transparentes",
      brand: "3M",
      price: 14.90,
      stock: 60,
      badge: "MÃS VENDIDO",
      description:
        "Lentes para protecciÃ³n ocular contra polvo y partÃ­culas."
    },
    {
      name: "Casco de seguridad industrial",
      brand: "3M",
      price: 34.90,
      stock: 35,
      description:
        "Casco industrial para construcciÃ³n, mantenimiento y obra."
    },
    {
      name: "Mascarilla para polvo pack x10",
      brand: "3M",
      price: 29.90,
      stock: 45,
      description:
        "Mascarillas para protecciÃ³n frente a polvo y partÃ­culas."
    },
    {
      name: "Chaleco reflectivo de seguridad",
      brand: "Truper",
      price: 24.90,
      oldPrice: 29.90,
      stock: 32,
      badge: "OFERTA",
      description:
        "Chaleco reflectivo de alta visibilidad para trabajos y obra."
    }
  ],

  // ========================================================
  // PUERTAS Y VENTANAS
  // ========================================================

  "Puertas y Ventanas": [
    {
      name: "Manija metÃ¡lica para puerta",
      brand: "Forte",
      price: 45.90,
      stock: 25,
      description:
        "Manija metÃ¡lica resistente con acabado moderno."
    },
    {
      name: "Bisagra reforzada 3 pulgadas pack x2",
      brand: "Forte",
      price: 18.90,
      stock: 50,
      description:
        "Bisagras reforzadas para puertas de madera y metal."
    },
    {
      name: "Riel para puerta corrediza",
      brand: "Forte",
      price: 79.90,
      stock: 15,
      badge: "NUEVO",
      description:
        "Sistema de riel para instalaciÃ³n de puertas corredizas."
    },
    {
      name: "Burlete adhesivo para ventanas",
      brand: "3M",
      price: 22.90,
      stock: 35,
      description:
        "Burlete para aislamiento de puertas y ventanas."
    },
    {
      name: "Pasador metÃ¡lico reforzado",
      brand: "Forte",
      price: 16.90,
      stock: 60,
      description:
        "Pasador metÃ¡lico para puertas, ventanas y portones."
    }
  ],

  // ========================================================
  // JARDIN
  // ========================================================

  "Herramientas de JardÃ­n": [
    {
      name: "Pala punta redonda",
      brand: "Truper",
      price: 59.90,
      stock: 20,
      description:
        "Pala resistente para jardÃ­n, tierra y trabajos exteriores."
    },
    {
      name: "Rastrillo metÃ¡lico 14 dientes",
      brand: "Pretul",
      price: 44.90,
      stock: 22,
      description:
        "Rastrillo metÃ¡lico para hojas, tierra y mantenimiento."
    },
    {
      name: "Tijera de podar profesional",
      brand: "Truper",
      price: 39.90,
      oldPrice: 44.90,
      stock: 30,
      badge: "OFERTA",
      description:
        "Tijera para poda de plantas, arbustos y jardÃ­n."
    },
    {
      name: "Manguera para jardÃ­n 20 metros",
      brand: "Truper",
      price: 74.90,
      stock: 16,
      description:
        "Manguera flexible para riego y limpieza exterior."
    },
    {
      name: "Regadera plÃ¡stica 8 litros",
      brand: "Pretul",
      price: 29.90,
      stock: 28,
      description:
        "Regadera prÃ¡ctica para plantas, jardines y viveros."
    }
  ],

  // ========================================================
  // CEMENTO Y ARIDOS
  // ========================================================

  "Cemento y Ãridos": [
    {
      name: "Cemento Pacasmayo uso general 42.5 kg",
      brand: "Pacasmayo",
      price: 31.50,
      stock: 120,
      badge: "MÃS VENDIDO",
      description:
        "Cemento para construcciÃ³n, columnas, pisos y reparaciones."
    },
    {
      name: "Cemento Extraforte 42.5 kg",
      brand: "Pacasmayo",
      price: 34.90,
      stock: 90,
      description:
        "Cemento de alta resistencia para trabajos de construcciÃ³n."
    },
    {
      name: "Mortero seco preparado 25 kg",
      brand: "Sika",
      price: 29.90,
      stock: 65,
      description:
        "Mortero preparado para albaÃ±ilerÃ­a y reparaciones."
    },
    {
      name: "Arena gruesa bolsa 40 kg",
      brand: "Cayo",
      price: 14.90,
      stock: 100,
      description:
        "Arena gruesa embolsada para mezclas de construcciÃ³n."
    },
    {
      name: "Piedra chancada bolsa 40 kg",
      brand: "Cayo",
      price: 16.90,
      stock: 85,
      description:
        "Piedra chancada para concreto y trabajos de construcciÃ³n."
    }
  ]
};

const categoryCodes: Record<string, string> = {
  "Herramientas Manuales": "HM",
  "Herramientas ElÃ©ctricas": "HE",
  "Materiales de ConstrucciÃ³n": "MC",
  "Pinturas y Acabados": "PA",
  "IluminaciÃ³n": "IL",
  "TuberÃ­as y FontanerÃ­a": "TF",
  "Cerraduras y Seguridad": "CS",
  "Accesorios de FerreterÃ­a": "AF",
  "Equipos de ProtecciÃ³n": "EP",
  "Puertas y Ventanas": "PV",
  "Herramientas de JardÃ­n": "HJ",
  "Cemento y Ãridos": "CA"
};

export const products: Product[] =
  categories.flatMap((category) => {

    const code =
      categoryCodes[category];

    const items =
      productSeed[category] ?? [];

    return items.map(
      (item, index): Product => {

        const number =
          String(index + 1)
            .padStart(3, "0");

        const id =
          `${code}${number}`;

        return {
          id,

          sku:
            `CAYO-${id}`,

          slug:
            slugify(item.name),

          name:
            item.name,

          cat:
            category,

          brand:
            item.brand,

          price:
            item.price,

          oldPrice:
            item.oldPrice,

          stock:
            item.stock,

          badge:
            item.badge,

          img:
            productImages[slugify(item.name)] ??
            categoryImages[category],

          description:
            item.description,

          active:
            true,

          featured:
            index === 0,

          specs: {
            Marca:
              item.brand,

            CategorÃ­a:
              category,

            Stock:
              `${item.stock} unidades`,

            SKU:
              `CAYO-${id}`
          }
        };
      }
    );
  });

export const brands =
  Array.from(
    new Set(
      products.map(
        (product) =>
          product.brand
      )
    )
  ).sort();

export const menuColumns = [
  categories.slice(0, 4),
  categories.slice(4, 8),
  categories.slice(8, 12)
];

export function categoryFromSlug(
  slug: string
) {
  return (
    categories.find(
      (category) =>
        slugify(category) === slug
    ) ??
    categories[0]
  );
}

export function makeProducts(
  category: string
) {
  return products.filter(
    (product) =>
      product.cat === category
  );
}

const subcategoryNames:
Record<string, string[]> = {

  "Herramientas Manuales": [
    "Martillos",
    "Llaves",
    "Alicates",
    "Destornilladores",
    "MediciÃ³n"
  ],

  "Herramientas ElÃ©ctricas": [
    "Taladros",
    "Amoladoras",
    "Atornilladores",
    "Sierras",
    "Lijadoras"
  ],

  "Materiales de ConstrucciÃ³n": [
    "Adhesivos",
    "Selladores",
    "Siliconas",
    "Espumas",
    "Yeso"
  ],

  "Pinturas y Acabados": [
    "Pinturas",
    "Esmaltes",
    "Rodillos",
    "Brochas",
    "Acabados"
  ],

  "IluminaciÃ³n": [
    "Focos LED",
    "Reflectores",
    "Paneles LED",
    "Extensiones",
    "Accesorios"
  ],

  "TuberÃ­as y FontanerÃ­a": [
    "Tubos PVC",
    "Codos",
    "Tees",
    "Pegamentos PVC",
    "GriferÃ­a"
  ],

  "Cerraduras y Seguridad": [
    "Candados",
    "Cerraduras",
    "Cerrojos",
    "Manijas",
    "Seguridad"
  ],

  "Accesorios de FerreterÃ­a": [
    "Tornillos",
    "Clavos",
    "Tarugos",
    "Tuercas",
    "Cintas"
  ],

  "Equipos de ProtecciÃ³n": [
    "Guantes",
    "Lentes",
    "Cascos",
    "Mascarillas",
    "Chalecos"
  ],

  "Puertas y Ventanas": [
    "Manijas",
    "Bisagras",
    "Rieles",
    "Burletes",
    "Pasadores"
  ],

  "Herramientas de JardÃ­n": [
    "Palas",
    "Rastrillos",
    "Tijeras",
    "Mangueras",
    "Riego"
  ],

  "Cemento y Ãridos": [
    "Cemento",
    "Mortero",
    "Arena",
    "Piedra",
    "Material de obra"
  ]
};

export function makeSubcategories(
  category: string
) {
  return (
    subcategoryNames[category] ??
    [category]
  ).map(
    (title, index) => ({
      title,

      img:
        makeProducts(category)[index]?.img ??
        categoryImages[category],

      href:
        `/productos?categoria=${encodeURIComponent(category)}&q=${encodeURIComponent(title)}`
    })
  );
}