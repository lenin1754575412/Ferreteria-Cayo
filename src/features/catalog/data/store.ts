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
  "Herramientas Eléctricas",
  "Materiales de Construcción",
  "Pinturas y Acabados",
  "Iluminación",
  "Tuberías y Fontanería",
  "Cerraduras y Seguridad",
  "Accesorios de Ferretería",
  "Equipos de Protección",
  "Puertas y Ventanas",
  "Herramientas de Jardín",
  "Cemento y Áridos",
];

export const categoryImages: Record<string, string> = {
  "Herramientas Manuales":
    "https://www.materiel-mngi.fr/public/donnees/cms/sources/pages/mngi-4.jpg",

  "Herramientas Eléctricas":
    "https://static.wixstatic.com/media/8673d9_d44810fb109a4487b1207dee4a4b4f8f~mv2.jpg/v1/fill/w_980,h_654,al_c,q_85/8673d9_d44810fb109a4487b1207dee4a4b4f8f~mv2.jpg",

  "Materiales de Construcción":
    "https://www.buildsvia.com/uploadfile/ueditor/image/202509/1758530864ab8f91.jpg",

  "Pinturas y Acabados":
    "https://www.mondopratico.it/media/arts/cfadda_cagliari_%283%29.jpeg",

  "Iluminación":
    "https://nmrcdn.s3.amazonaws.com/assets/963/assets/responsive/524000/524097/web_elec.jpg",

  "Tuberías y Fontanería":
    "https://vhrbarnesville.com/cdn/shop/files/Plumbing_Gallery_-_Village_Hardware_and_Rental_-_500_x_500_1_800x.png",

  "Cerraduras y Seguridad":
    "https://trillingtruevaluehardware.com/wp-content/uploads/2023/04/IMG_20230418_131531-1-scaled.jpg",

  "Accesorios de Ferretería":
    "https://www.buildsvia.com/uploadfile/ueditor/image/202509/1758530864ab8f91.jpg",

  "Equipos de Protección":
    "https://grupotrevor.com/assets/img/gallery/delicias3.jpeg",

  "Puertas y Ventanas":
    "https://dyn.eu.mktgcdn.com/f/0/WFwGNFywVMHNztB31JIA3Cma_KME_x1K_pxfa066BkE.jpg",

  "Herramientas de Jardín":
    "https://southhillshardware.com/cdn/shop/files/6_800x.png",

  "Cemento y Áridos":
    "https://www.buildsvia.com/uploadfile/ueditor/image/202509/1758530864ab8f91.jpg",
};

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[|&(),."]/g, "")
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
      name: "Martillo de uña 16 oz",
      brand: "Stanley",
      price: 39.90,
      oldPrice: 49.90,
      stock: 25,
      badge: "OFERTA",
      description:
        "Martillo de uña resistente para carpintería, construcción y reparaciones."
    },
    {
      name: "Juego de llaves combinadas 12 piezas",
      brand: "Stanley",
      price: 89.90,
      oldPrice: 109.90,
      stock: 18,
      badge: "-18%",
      description:
        "Juego de llaves combinadas para trabajos mecánicos y mantenimiento."
    },
    {
      name: "Alicate universal 8 pulgadas",
      brand: "Truper",
      price: 34.90,
      stock: 32,
      description:
        "Alicate universal con agarre cómodo para corte, sujeción y reparaciones."
    },
    {
      name: "Set de destornilladores 6 piezas",
      brand: "Pretul",
      price: 29.90,
      stock: 40,
      badge: "MÁS VENDIDO",
      description:
        "Juego de destornilladores planos y estrella para hogar y taller."
    },
    {
      name: "Cinta métrica profesional 5 m",
      brand: "Stanley",
      price: 24.90,
      stock: 55,
      description:
        "Cinta métrica compacta de cinco metros para mediciones precisas."
    }
  ],

  // ========================================================
  // HERRAMIENTAS ELECTRICAS
  // ========================================================

  "Herramientas Eléctricas": [
    {
      name: "Taladro percutor 13 mm",
      brand: "Bosch",
      price: 299.90,
      oldPrice: 349.90,
      stock: 12,
      badge: "OFERTA",
      description:
        "Taladro percutor para madera, metal y trabajos de albañilería."
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
      name: "Atornillador inalámbrico 12V",
      brand: "Makita",
      price: 279.90,
      stock: 14,
      description:
        "Atornillador inalámbrico compacto para instalación y montaje."
    },
    {
      name: "Sierra circular 7 1/4 pulgadas",
      brand: "Bosch",
      price: 389.90,
      stock: 7,
      badge: "PRO",
      description:
        "Sierra circular para cortes rápidos y precisos en madera."
    },
    {
      name: "Lijadora orbital eléctrica",
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

  "Materiales de Construcción": [
    {
      name: "Pegamento para cerámico 25 kg",
      brand: "Sika",
      price: 42.90,
      stock: 60,
      description:
        "Adhesivo para instalación de cerámicos en pisos y paredes."
    },
    {
      name: "Sellador multiuso 300 ml",
      brand: "Sika",
      price: 29.90,
      oldPrice: 34.90,
      stock: 36,
      badge: "OFERTA",
      description:
        "Sellador flexible para juntas, grietas y trabajos de construcción."
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
      name: "Yeso para construcción 20 kg",
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
      name: "Pintura látex blanco 4 L",
      brand: "CPP",
      price: 64.90,
      oldPrice: 74.90,
      stock: 30,
      badge: "OFERTA",
      description:
        "Pintura látex blanca para interiores con buen rendimiento."
    },
    {
      name: "Pintura látex color 4 L",
      brand: "Vencedor",
      price: 69.90,
      stock: 25,
      description:
        "Pintura látex de color para paredes interiores y exteriores."
    },
    {
      name: "Esmalte sintético 1 galón",
      brand: "Tekno",
      price: 89.90,
      oldPrice: 99.90,
      stock: 18,
      badge: "-10%",
      description:
        "Esmalte sintético para metal, madera y superficies preparadas."
    },
    {
      name: "Rodillo profesional 9 pulgadas",
      brand: "CPP",
      price: 24.90,
      stock: 50,
      badge: "MÁS VENDIDO",
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

  "Iluminación": [
    {
      name: "Foco LED 12W luz blanca",
      brand: "Philips",
      price: 12.90,
      stock: 80,
      badge: "AHORRO",
      description:
        "Foco LED de bajo consumo para iluminación residencial."
    },
    {
      name: "Foco LED 15W luz cálida",
      brand: "Philips",
      price: 16.90,
      stock: 65,
      description:
        "Foco LED cálido ideal para dormitorios, salas y ambientes interiores."
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
        "Panel LED empotrable para iluminación moderna de interiores."
    },
    {
      name: "Extensión eléctrica 5 metros",
      brand: "Opalux",
      price: 34.90,
      stock: 35,
      description:
        "Extensión eléctrica para herramientas y equipos del hogar."
    }
  ],

  // ========================================================
  // TUBERIAS Y FONTANERIA
  // ========================================================

  "Tuberías y Fontanería": [
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
        "Codo PVC para cambios de dirección en instalaciones."
    },
    {
      name: "Tee PVC 1/2 pulgada",
      brand: "Pavco",
      price: 4.90,
      stock: 120,
      description:
        "Conexión Tee PVC para ramificaciones de tubería."
    },
    {
      name: "Pegamento PVC 1/4 galón",
      brand: "Oatey",
      price: 29.90,
      stock: 34,
      badge: "MÁS VENDIDO",
      description:
        "Adhesivo para uniones firmes en tuberías y accesorios PVC."
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
        "Candado metálico reforzado para puertas, almacenes y rejas."
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
        "Cerrojo metálico para reforzar puertas de hogar o negocio."
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

  "Accesorios de Ferretería": [
    {
      name: "Caja de tornillos surtidos 200 piezas",
      brand: "Truper",
      price: 34.90,
      stock: 45,
      badge: "MÁS VENDIDO",
      description:
        "Kit surtido de tornillos para reparaciones y montajes."
    },
    {
      name: "Caja de clavos surtidos 1 kg",
      brand: "Cayo",
      price: 18.90,
      stock: 70,
      description:
        "Clavos de diferentes tamaños para construcción y carpintería."
    },
    {
      name: "Kit de tarugos y tornillos",
      brand: "Fischer",
      price: 24.90,
      stock: 55,
      description:
        "Kit de fijación para paredes de concreto y mampostería."
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
      name: "Cinta teflón 12 metros",
      brand: "Pavco",
      price: 4.90,
      stock: 120,
      badge: "AHORRO",
      description:
        "Cinta de teflón para sellado de conexiones roscadas."
    }
  ],

  // ========================================================
  // EQUIPOS DE PROTECCION
  // ========================================================

  "Equipos de Protección": [
    {
      name: "Guantes de trabajo reforzados",
      brand: "3M",
      price: 19.90,
      stock: 50,
      description:
        "Guantes resistentes para trabajos de construcción y mantenimiento."
    },
    {
      name: "Lentes de seguridad transparentes",
      brand: "3M",
      price: 14.90,
      stock: 60,
      badge: "MÁS VENDIDO",
      description:
        "Lentes para protección ocular contra polvo y partículas."
    },
    {
      name: "Casco de seguridad industrial",
      brand: "3M",
      price: 34.90,
      stock: 35,
      description:
        "Casco industrial para construcción, mantenimiento y obra."
    },
    {
      name: "Mascarilla para polvo pack x10",
      brand: "3M",
      price: 29.90,
      stock: 45,
      description:
        "Mascarillas para protección frente a polvo y partículas."
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
      name: "Manija metálica para puerta",
      brand: "Forte",
      price: 45.90,
      stock: 25,
      description:
        "Manija metálica resistente con acabado moderno."
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
        "Sistema de riel para instalación de puertas corredizas."
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
      name: "Pasador metálico reforzado",
      brand: "Forte",
      price: 16.90,
      stock: 60,
      description:
        "Pasador metálico para puertas, ventanas y portones."
    }
  ],

  // ========================================================
  // JARDIN
  // ========================================================

  "Herramientas de Jardín": [
    {
      name: "Pala punta redonda",
      brand: "Truper",
      price: 59.90,
      stock: 20,
      description:
        "Pala resistente para jardín, tierra y trabajos exteriores."
    },
    {
      name: "Rastrillo metálico 14 dientes",
      brand: "Pretul",
      price: 44.90,
      stock: 22,
      description:
        "Rastrillo metálico para hojas, tierra y mantenimiento."
    },
    {
      name: "Tijera de podar profesional",
      brand: "Truper",
      price: 39.90,
      oldPrice: 44.90,
      stock: 30,
      badge: "OFERTA",
      description:
        "Tijera para poda de plantas, arbustos y jardín."
    },
    {
      name: "Manguera para jardín 20 metros",
      brand: "Truper",
      price: 74.90,
      stock: 16,
      description:
        "Manguera flexible para riego y limpieza exterior."
    },
    {
      name: "Regadera plástica 8 litros",
      brand: "Pretul",
      price: 29.90,
      stock: 28,
      description:
        "Regadera práctica para plantas, jardines y viveros."
    }
  ],

  // ========================================================
  // CEMENTO Y ARIDOS
  // ========================================================

  "Cemento y Áridos": [
    {
      name: "Cemento Pacasmayo uso general 42.5 kg",
      brand: "Pacasmayo",
      price: 31.50,
      stock: 120,
      badge: "MÁS VENDIDO",
      description:
        "Cemento para construcción, columnas, pisos y reparaciones."
    },
    {
      name: "Cemento Extraforte 42.5 kg",
      brand: "Pacasmayo",
      price: 34.90,
      stock: 90,
      description:
        "Cemento de alta resistencia para trabajos de construcción."
    },
    {
      name: "Mortero seco preparado 25 kg",
      brand: "Sika",
      price: 29.90,
      stock: 65,
      description:
        "Mortero preparado para albañilería y reparaciones."
    },
    {
      name: "Arena gruesa bolsa 40 kg",
      brand: "Cayo",
      price: 14.90,
      stock: 100,
      description:
        "Arena gruesa embolsada para mezclas de construcción."
    },
    {
      name: "Piedra chancada bolsa 40 kg",
      brand: "Cayo",
      price: 16.90,
      stock: 85,
      description:
        "Piedra chancada para concreto y trabajos de construcción."
    }
  ]
};


  // ========================================================
  // PRODUCTOS EXTRA DE CONSTRUCCION
  // ========================================================

  productSeed["Materiales de Construcción"].push(
    {
      name: "Ladrillo King Kong 18 huecos",
      brand: "Cayo",
      price: 1.80,
      stock: 1000,
      badge: "MÁS VENDIDO",
      description:
        "Ladrillo King Kong de 18 huecos para muros, viviendas y proyectos de construcción."
    },

    {
      name: "Ladrillo pandereta 12 huecos",
      brand: "Cayo",
      price: 1.30,
      stock: 850,
      description:
        "Ladrillo pandereta para divisiones interiores y trabajos de albañilería."
    },

    {
      name: "Ladrillo techo 15 cm",
      brand: "Cayo",
      price: 3.50,
      stock: 600,
      description:
        "Ladrillo para techo utilizado en construcciones y losas aligeradas."
    },

    {
      name: "Bloque de concreto 39 x 19 x 14 cm",
      brand: "Cayo",
      price: 5.90,
      stock: 420,
      badge: "NUEVO",
      description:
        "Bloque de concreto resistente para muros y proyectos de construcción."
    },

    {
      name: "Bloque de concreto 39 x 19 x 9 cm",
      brand: "Cayo",
      price: 4.90,
      stock: 480,
      description:
        "Bloque de concreto para divisiones y muros de albañilería."
    },

    {
      name: "Mortero para asentado de ladrillo 25 kg",
      brand: "Sika",
      price: 31.90,
      stock: 75,
      description:
        "Mortero preparado para asentado de ladrillos y bloques."
    },

    {
      name: "Arena gruesa para construcción 40 kg",
      brand: "Cayo",
      price: 14.90,
      stock: 150,
      description:
        "Arena gruesa embolsada para concreto, asentado y trabajos de construcción."
    },

    {
      name: "Arena fina para tarrajeo 40 kg",
      brand: "Cayo",
      price: 13.90,
      stock: 140,
      description:
        "Arena fina para tarrajeo, acabados y trabajos de albañilería."
    }
  );


  // ========================================================
  // PRODUCTOS DE BAÑO / PLOMERIA / TUBERIA
  // ========================================================

  productSeed["Tuberías y Fontanería"].push(

    {
      name: "Grifo para baño cromado",
      brand: "Vainsa",
      price: 89.90,
      oldPrice: 99.90,
      stock: 24,
      badge: "OFERTA",
      description:
        "Grifo para baño y lavamanos. Producto de plomeria y tuberia para instalaciones sanitarias."
    },

    {
      name: "Ducha cromada para baño",
      brand: "Vainsa",
      price: 79.90,
      stock: 20,
      badge: "NUEVO",
      description:
        "Ducha para baño con acabado cromado. Ideal para instalaciones de tuberia y plomeria sanitaria."
    },

    {
      name: "Sifón flexible para lavamanos",
      brand: "Pavco",
      price: 22.90,
      stock: 42,
      description:
        "Sifón para baño y lavamanos. Accesorio de tuberia PVC y plomeria para desagüe."
    },

    {
      name: "Llave angular para baño 1/2 pulgada",
      brand: "Vainsa",
      price: 29.90,
      stock: 35,
      description:
        "Llave angular para baño, lavamanos e instalaciones de agua y tuberia."
    },

    {
      name: "Flexible de abasto para baño 40 cm",
      brand: "Pavco",
      price: 16.90,
      stock: 50,
      description:
        "Flexible para baño, lavamanos y sanitario. Accesorio para conexión de tuberia de agua."
    },

    {
      name: "Rejilla de desagüe para baño",
      brand: "Truper",
      price: 18.90,
      stock: 38,
      description:
        "Rejilla metálica para desagüe de baño. Compatible con trabajos de plomeria y tuberia."
    },

    {
      name: "Válvula flotadora para tanque sanitario",
      brand: "Vainsa",
      price: 34.90,
      stock: 28,
      description:
        "Válvula para tanque sanitario de baño. Repuesto para instalaciones de agua y plomeria."
    },

    {
      name: "Tubo PVC sanitario 2 pulgadas",
      brand: "Pavco",
      price: 27.90,
      stock: 85,
      badge: "MÁS VENDIDO",
      description:
        "Tuberia PVC sanitaria para baño, desagüe, lavamanos y proyectos de plomeria."
    },

    {
      name: "Codo PVC sanitario 2 pulgadas",
      brand: "Pavco",
      price: 6.90,
      stock: 110,
      description:
        "Codo para tuberia PVC sanitaria de baño y sistemas de desagüe."
    },

    {
      name: "Tee PVC sanitaria 2 pulgadas",
      brand: "Pavco",
      price: 8.90,
      stock: 95,
      description:
        "Tee para tuberia PVC sanitaria utilizada en baño, desagüe y plomeria."
    },

    {
      name: "Unión PVC sanitaria 2 pulgadas",
      brand: "Pavco",
      price: 5.90,
      stock: 100,
      description:
        "Unión para tuberia PVC de baño, instalaciones sanitarias y desagüe."
    },

    {
      name: "Pegamento PVC sanitario",
      brand: "Oatey",
      price: 31.90,
      stock: 45,
      description:
        "Pegamento para tuberia PVC sanitaria de baño, agua y trabajos de plomeria."
    }

  );

const categoryCodes: Record<string, string> = {
  "Herramientas Manuales": "HM",
  "Herramientas Eléctricas": "HE",
  "Materiales de Construcción": "MC",
  "Pinturas y Acabados": "PA",
  "Iluminación": "IL",
  "Tuberías y Fontanería": "TF",
  "Cerraduras y Seguridad": "CS",
  "Accesorios de Ferretería": "AF",
  "Equipos de Protección": "EP",
  "Puertas y Ventanas": "PV",
  "Herramientas de Jardín": "HJ",
  "Cemento y Áridos": "CA"
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

            Categoría:
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
    "Medición"
  ],

  "Herramientas Eléctricas": [
    "Taladros",
    "Amoladoras",
    "Atornilladores",
    "Sierras",
    "Lijadoras"
  ],

  "Materiales de Construcción": [
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

  "Iluminación": [
    "Focos LED",
    "Reflectores",
    "Paneles LED",
    "Extensiones",
    "Accesorios"
  ],

  "Tuberías y Fontanería": [
    "Tubos PVC",
    "Codos",
    "Tees",
    "Pegamentos PVC",
    "Grifería"
  ],

  "Cerraduras y Seguridad": [
    "Candados",
    "Cerraduras",
    "Cerrojos",
    "Manijas",
    "Seguridad"
  ],

  "Accesorios de Ferretería": [
    "Tornillos",
    "Clavos",
    "Tarugos",
    "Tuercas",
    "Cintas"
  ],

  "Equipos de Protección": [
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

  "Herramientas de Jardín": [
    "Palas",
    "Rastrillos",
    "Tijeras",
    "Mangueras",
    "Riego"
  ],

  "Cemento y Áridos": [
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