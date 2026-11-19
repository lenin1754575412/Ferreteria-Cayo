import Link from "next/link";

const links = [
  { href: "/catalogo-pro", icon: "⌕", title: "Catálogo inteligente", detail: "Busca y filtra en segundos" },
  { href: "/cotizaciones", icon: "▤", title: "Cotizaciones PDF", detail: "Descarga una cotización del carrito" },
  { href: "/pagos-cayo", icon: "▣", title: "Opciones de pago", detail: "Yape, Plin y pago online" },
  { href: "/seguimiento", icon: "◉", title: "Mis pedidos", detail: "Consulta el estado de tus compras" }
];
export function CayoProLinks() {
  return <section className="cayo-pro cayo-pro-intro" aria-label="Nuevos servicios">
    <div className="cayo-pro-topline">FERRETERÍA CAYO · EXPERIENCIA PRO</div>
    <h2>Todo para tu proyecto, en un solo lugar</h2>
    <p>Compra, compara, cotiza y consulta tus pedidos desde el celular o computadora.</p>
    <div className="cayo-pro-shortcuts">
      {links.map(link => <Link key={link.href} href={link.href} className="cayo-pro-shortcut">
        <span className="cayo-pro-shortcut-icon" aria-hidden>{link.icon}</span><strong>{link.title}</strong><small>{link.detail}</small>
      </Link>)}
    </div>
  </section>;
}
