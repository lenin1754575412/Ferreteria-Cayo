import {Header} from "@/features/navigation";import {Footer} from "@/features/layout";import {Payments} from "@/features/cayo-pro/Payments";
export const metadata={title:"Opciones de pago | Ferretería Cayo"};
export default function Page(){return <><Header/><main className="cayo-pro-shell"><Payments/></main><Footer/></>}
