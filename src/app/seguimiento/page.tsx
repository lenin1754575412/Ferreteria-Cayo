import {Header} from "@/features/navigation";import {Footer} from "@/features/layout";import {OrderTracking} from "@/features/cayo-pro/OrderTracking";
export const metadata={title:"Seguimiento de pedidos | Ferretería Cayo"};
export default function Page(){return <><Header/><main className="cayo-pro-shell"><OrderTracking/></main><Footer/></>}
