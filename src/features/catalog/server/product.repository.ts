import {api} from '@/server/service';
import { categoryImages } from '../data/store';
import type {Product} from '../data/store';
const legacyCategoryImageUrls = new Set<string>(["https://www.materiel-mngi.fr/public/donnees/cms/sources/pages/mngi-4.jpg","https://static.wixstatic.com/media/8673d9_d44810fb109a4487b1207dee4a4b4f8f~mv2.jpg/v1/fill/w_980,h_654,al_c,q_85/8673d9_d44810fb109a4487b1207dee4a4b4f8f~mv2.jpg","https://www.buildsvia.com/uploadfile/ueditor/image/202509/1758530864ab8f91.jpg","https://www.mondopratico.it/media/arts/cfadda_cagliari_%283%29.jpeg","https://nmrcdn.s3.amazonaws.com/assets/963/assets/responsive/524000/524097/web_elec.jpg","https://vhrbarnesville.com/cdn/shop/files/Plumbing_Gallery_-_Village_Hardware_and_Rental_-_500_x_500_1_800x.png","https://trillingtruevaluehardware.com/wp-content/uploads/2023/04/IMG_20230418_131531-1-scaled.jpg","https://grupotrevor.com/assets/img/gallery/delicias3.jpeg","https://dyn.eu.mktgcdn.com/f/0/WFwGNFywVMHNztB31JIA3Cma_KME_x1K_pxfa066BkE.jpg","https://southhillshardware.com/cdn/shop/files/6_800x.png"]);
export async function getCatalogProducts():Promise<Product[]> {
  return (await api.products()).map((product: Product) =>
    legacyCategoryImageUrls.has(product.img) && categoryImages[product.cat]
      ? { ...product, img: categoryImages[product.cat] }
      : product
  );
}
export async function getProductBySlug(slug:string) {return (await getCatalogProducts()).find(p=>p.slug===slug)||null;}
export const getCatalogProductBySlug=getProductBySlug;
export async function searchCatalogProducts(query:string) {
 const normalize=(v:string)=>v.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const q=normalize(query);return (await getCatalogProducts()).filter(p=>normalize([p.name,p.sku,p.brand,p.cat,p.description].join(' ')).includes(q));
}
