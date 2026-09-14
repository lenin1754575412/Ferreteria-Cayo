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
  "Cemento y Ãridos"
];

export const categoryImages: Record<string,string> = {
  "Herramientas Manuales": "https://www.materiel-mngi.fr/public/donnees/cms/sources/pages/mngi-4.jpg",
  "Herramientas ElÃ©ctricas": "https://static.wixstatic.com/media/8673d9_d44810fb109a4487b1207dee4a4b4f8f~mv2.jpg/v1/fill/w_980,h_654,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/quincaillerie.jpg",
  "Materiales de ConstrucciÃ³n": "https://www.buildsvia.com/uploadfile/ueditor/image/202509/1758530864ab8f91.jpg",
  "Pinturas y Acabados": "https://www.mondopratico.it/media/arts/cfadda_cagliari_%283%29.jpeg",
  "IluminaciÃ³n": "https://nmrcdn.s3.amazonaws.com/assets/963/assets/responsive/524000/524097/web_elec.jpg",
  "TuberÃ­as y FontanerÃ­a": "https://vhrbarnesville.com/cdn/shop/files/Plumbing_Gallery_-_Village_Hardware_and_Rental_-_500_x_500_1_800x.png?v=1729635249",
  "Cerraduras y Seguridad": "https://trillingtruevaluehardware.com/wp-content/uploads/2023/04/IMG_20230418_131531-1-scaled.jpg",
  "Accesorios de FerreterÃ­a": "https://www.buildsvia.com/uploadfile/ueditor/image/202509/1758530864ab8f91.jpg",
  "Equipos de ProtecciÃ³n": "https://grupotrevor.com/assets/img/gallery/delicias3.jpeg",
  "Puertas y Ventanas": "https://dyn.eu.mktgcdn.com/f/0/WFwGNFywVMHNztB31JIA3Cma_KME_x1K_pxfa066BkE.jpg",
  "Herramientas de JardÃ­n": "https://southhillshardware.com/cdn/shop/files/6_800x.png?v=1675881750",
  "Cemento y Ãridos": "https://www.buildsvia.com/uploadfile/ueditor/image/202509/1758530864ab8f91.jpg"
};

export function slugify(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replaceAll("|","").replaceAll("&","y").replaceAll("(","").replaceAll(")","")
    .replaceAll(",","").replaceAll(".","").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");
}

export function categoryFromSlug(slug: string) {
  return categories.find(c => slugify(c) === slug) || categories[0];
}

export const menuColumns = [categories.slice(0,4), categories.slice(4,8), categories.slice(8,12)];

export type Product = {
  name:string; cat:string; price:number; oldPrice?:number; img:string; badge?:string; description:string;
};

export const products: Product[] = [
  {name:"Juego de llaves combinadas",cat:"Herramientas Manuales",price:79.90,oldPrice:99.90,badge:"OFERTA",img:categoryImages["Herramientas Manuales"],description:"Set prÃ¡ctico para trabajos de mantenimiento y hogar."},
  {name:"Set de destornilladores",cat:"Herramientas Manuales",price:39.90,img:categoryImages["Herramientas Manuales"],description:"Juego versÃ¡til con puntas de uso frecuente."},
  {name:"Taladro inalÃ¡mbrico",cat:"Herramientas ElÃ©ctricas",price:229.90,oldPrice:279.90,badge:"-18%",img:categoryImages["Herramientas ElÃ©ctricas"],description:"Equipo compacto para proyectos domÃ©sticos y taller."},
  {name:"Kit de brocas multiuso",cat:"Herramientas ElÃ©ctricas",price:54.90,img:categoryImages["Herramientas ElÃ©ctricas"],description:"SelecciÃ³n de brocas para distintos materiales."},
  {name:"Caja de tornillos surtidos",cat:"Accesorios de FerreterÃ­a",price:29.90,badge:"NUEVO",img:categoryImages["Accesorios de FerreterÃ­a"],description:"Tornillos y fijaciones organizados por medida."},
  {name:"Cemento uso general 42.5 kg",cat:"Cemento y Ãridos",price:31.50,img:categoryImages["Cemento y Ãridos"],description:"Material para obras, reparaciones y construcciÃ³n."},
  {name:"Rodillo para pintura 9 pulgadas",cat:"Pinturas y Acabados",price:24.90,oldPrice:29.90,badge:"OFERTA",img:categoryImages["Pinturas y Acabados"],description:"Rodillo de buena cobertura para paredes y techos."},
  {name:"Kit de brochas para pintura",cat:"Pinturas y Acabados",price:18.90,img:categoryImages["Pinturas y Acabados"],description:"Brochas de diferentes tamaÃ±os para acabados."},
  {name:"Foco LED 12W luz blanca",cat:"IluminaciÃ³n",price:12.90,badge:"AHORRO",img:categoryImages["IluminaciÃ³n"],description:"IluminaciÃ³n eficiente para interiores."},
  {name:"Pack de focos LED",cat:"IluminaciÃ³n",price:34.90,img:categoryImages["IluminaciÃ³n"],description:"Pack conveniente para renovar varios ambientes."},
  {name:"Kit conexiones PVC",cat:"TuberÃ­as y FontanerÃ­a",price:42.90,img:categoryImages["TuberÃ­as y FontanerÃ­a"],description:"Codos, uniones y adaptadores para instalaciones."},
  {name:"UniÃ³n PVC reforzada",cat:"TuberÃ­as y FontanerÃ­a",price:9.90,img:categoryImages["TuberÃ­as y FontanerÃ­a"],description:"Accesorio resistente para instalaciones sanitarias."},
  {name:"Candado de seguridad",cat:"Cerraduras y Seguridad",price:36.90,img:categoryImages["Cerraduras y Seguridad"],description:"Candado metÃ¡lico para puertas y almacenes."},
  {name:"Cerradura para puerta",cat:"Cerraduras y Seguridad",price:69.90,badge:"MÃS VENDIDO",img:categoryImages["Cerraduras y Seguridad"],description:"Cerradura para uso residencial y comercial."},
  {name:"Guantes de trabajo",cat:"Equipos de ProtecciÃ³n",price:16.90,img:categoryImages["Equipos de ProtecciÃ³n"],description:"Guantes para protecciÃ³n bÃ¡sica en trabajos de ferreterÃ­a."},
  {name:"Casco de protecciÃ³n",cat:"Equipos de ProtecciÃ³n",price:28.90,img:categoryImages["Equipos de ProtecciÃ³n"],description:"Casco ligero para trabajos y mantenimiento."},
  {name:"Manija para puerta",cat:"Puertas y Ventanas",price:45.90,img:categoryImages["Puertas y Ventanas"],description:"Manija metÃ¡lica de acabado moderno."},
  {name:"Kit de sellado para ventanas",cat:"Puertas y Ventanas",price:19.90,img:categoryImages["Puertas y Ventanas"],description:"Accesorios para mejorar el cierre y aislamiento."},
  {name:"Pala de jardÃ­n",cat:"Herramientas de JardÃ­n",price:49.90,img:categoryImages["Herramientas de JardÃ­n"],description:"Herramienta resistente para jardÃ­n y exteriores."},
  {name:"Rastrillo para jardÃ­n",cat:"Herramientas de JardÃ­n",price:44.90,img:categoryImages["Herramientas de JardÃ­n"],description:"Ideal para hojas, tierra y mantenimiento del jardÃ­n."}
];

export function makeSubcategories(category: string) {
  const names: Record<string,string[]> = {
    "Herramientas Manuales":["Llaves y dados","Destornilladores","Alicates y pinzas","Cintas mÃ©tricas"],
    "Herramientas ElÃ©ctricas":["Taladros","Brocas y accesorios","Lijado","Accesorios elÃ©ctricos"],
    "Materiales de ConstrucciÃ³n":["Fijaciones","Adhesivos","Selladores","Materiales para obra"],
    "Pinturas y Acabados":["Pinturas","Brochas","Rodillos","Accesorios para pintar"],
    "IluminaciÃ³n":["Focos LED","Luminarias","Accesorios elÃ©ctricos","IluminaciÃ³n interior"],
    "TuberÃ­as y FontanerÃ­a":["PVC","Conexiones","Uniones","Accesorios sanitarios"],
    "Cerraduras y Seguridad":["Candados","Cerraduras","Manijas","Accesorios para puertas"],
    "Accesorios de FerreterÃ­a":["Tornillos","Tuercas","Arandelas","Fijaciones"],
    "Equipos de ProtecciÃ³n":["Guantes","Cascos","Lentes de protecciÃ³n","Accesorios de seguridad"],
    "Puertas y Ventanas":["Manijas","Sellos","Accesorios","Herrajes"],
    "Herramientas de JardÃ­n":["Palas","Rastrillos","Mangueras","Accesorios de jardÃ­n"],
    "Cemento y Ãridos":["Cemento","Morteros","Materiales para obra","Complementos"]
  };
  return (names[category] || [category]).map(title => ({title,img:categoryImages[category],href:"/productos?categoria="+encodeURIComponent(category)}));
}

export function makeProducts(category: string) {
  return products.filter(p=>p.cat===category);
}
