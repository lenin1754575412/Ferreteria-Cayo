import {api} from '@/server/service';
import type {Product} from '../data/store';
export async function getCatalogProducts():Promise<Product[]> {return api.products();}
export async function getProductBySlug(slug:string) {return (await getCatalogProducts()).find(p=>p.slug===slug)||null;}
export const getCatalogProductBySlug=getProductBySlug;
export async function searchCatalogProducts(query:string) {
 const normalize=(v:string)=>v.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const q=normalize(query);return (await getCatalogProducts()).filter(p=>normalize([p.name,p.sku,p.brand,p.cat,p.description].join(' ')).includes(q));
}
