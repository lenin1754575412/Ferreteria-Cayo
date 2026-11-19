import Link from "next/link";
import {Header} from "@/features/navigation";import {Footer} from "@/features/layout";
export const metadata={title:"Consulta de pago | Ferretería Cayo"};
export default function Page(){return <><Header/><main className="cayo-pro-shell"><div className="cayo-pro cayo-pro-panel"><span className="cayo-pro-topline">CONFIRMACIÓN PENDIENTE</span><h1>Estamos pendientes de verificar tu pago</h1><p>El retorno del proveedor de pagos no demuestra que el dinero haya sido recibido. No consideres tu pedido pagado hasta que Ferretería Cayo lo valide y te confirme.</p><Link href="/seguimiento" className="cayo-pro-button">Consultar mis pedidos</Link></div></main><Footer/></>}
