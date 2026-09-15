export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "como-elegir-un-taladro",
    title: "Cómo elegir el taladro adecuado para tu trabajo",
    excerpt:
      "Conoce las principales diferencias entre un taladro convencional, percutor e inalámbrico.",
    category: "Herramientas",
    image:
      "https://static.wixstatic.com/media/8673d9_d44810fb109a4487b1207dee4a4b4f8f~mv2.jpg/v1/fill/w_980,h_654,al_c,q_85/8673d9_d44810fb109a4487b1207dee4a4b4f8f~mv2.jpg",
    date: "14 septiembre 2026",
    content: [
      "Elegir un taladro depende principalmente del material que deseas perforar y de la frecuencia de uso.",
      "Para trabajos sencillos en madera y metal puede ser suficiente un taladro convencional. Para paredes y trabajos de construcción resulta más conveniente un modelo con función percutora.",
      "Los modelos inalámbricos son prácticos cuando necesitas movilidad. Antes de comprar, revisa también la potencia, el tamaño del mandril y los accesorios compatibles.",
      "En Ferretería Cayo puedes comparar herramientas según el trabajo que necesitas realizar."
    ]
  },

  {
    slug: "como-elegir-pintura",
    title: "Cómo elegir pintura para interiores y exteriores",
    excerpt:
      "Te explicamos qué debes revisar antes de comprar pintura para paredes, madera o metal.",
    category: "Pinturas",
    image:
      "https://www.mondopratico.it/media/arts/cfadda_cagliari_%283%29.jpeg",
    date: "14 septiembre 2026",
    content: [
      "No todas las pinturas están diseñadas para el mismo tipo de superficie.",
      "En interiores suele buscarse facilidad de limpieza y buen acabado. Para exteriores conviene elegir productos preparados para soportar humedad, sol y cambios de temperatura.",
      "También debes considerar el estado de la superficie. En algunos trabajos será necesario utilizar imprimante, sellador o masilla antes de aplicar la pintura.",
      "Utilizar rodillos y brochas adecuados ayuda a conseguir un acabado más uniforme."
    ]
  },

  {
    slug: "consejos-instalacion-pvc",
    title: "Consejos básicos para trabajar con tuberías PVC",
    excerpt:
      "Tuberías, codos, tees y adhesivos: conoce la función de cada elemento antes de instalar.",
    category: "Construcción",
    image:
      "https://vhrbarnesville.com/cdn/shop/files/Plumbing_Gallery_-_Village_Hardware_and_Rental_-_500_x_500_1_800x.png",
    date: "14 septiembre 2026",
    content: [
      "Las instalaciones de PVC utilizan diferentes accesorios dependiendo de la dirección y distribución de la tubería.",
      "Los codos permiten cambiar la dirección, mientras que las tees sirven para crear ramificaciones.",
      "Antes de realizar una unión debes comprobar que las superficies estén limpias y que las piezas sean compatibles.",
      "Utiliza siempre los materiales indicados para el tipo de instalación y sigue las instrucciones del fabricante del adhesivo."
    ]
  }
];

export function getBlogPost(slug: string) {
  return (
    blogPosts.find(
      (post) =>
        post.slug === slug
    ) ?? null
  );
}