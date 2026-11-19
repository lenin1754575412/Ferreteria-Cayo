import {Header} from "@/features/navigation";import {Footer} from "@/features/layout";
import {QuoteBuilder} from "@/features/cayo-pro/QuoteBuilder";
export const metadata={title:"Cotizaciones PDF | Ferretería Cayo"};
export default function Page(){return <><Header/><main className="cayo-pro-shell"><QuoteBuilder/></main><Footer/></>}
