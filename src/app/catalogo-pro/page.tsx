export const dynamic = "force-dynamic";
import { Header } from "@/features/navigation";
import { Footer } from "@/features/layout";
import { categoryImages } from "@/features/catalog";
import { getCatalogProducts } from "@/features/catalog/server/product.repository";
import { Explorer } from "@/features/cayo-pro/Explorer";
export const metadata = { title: "Catálogo inteligente | Ferretería Cayo" };
export default async function Page() {
  const products = await getCatalogProducts();
  return <><Header/><main className="cayo-pro-shell"><Explorer products={products} categoryImages={categoryImages}/></main><Footer/></>;
}
