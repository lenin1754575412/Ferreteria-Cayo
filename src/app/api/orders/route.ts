import { NextResponse } from "next/server";
import { getDb } from "@/shared/lib/mongodb";
import { getCatalogProducts } from "@/features/catalog/server/product.repository";

type IncomingItem = {
  product?: { id?: string; slug?: string };
  quantity?: number;
};

function fail(error: string, status = 400) {
  return NextResponse.json({ success: false, error }, { status });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const customer = body?.customer ?? {};

    const name = String(customer.name ?? "").trim().slice(0, 100);
    const phone = String(customer.phone ?? "").replace(/\D/g, "");

    if (!name || phone.length < 9 || phone.length > 12) {
      return fail("Nombre o teléfono inválido");
    }

    const incoming: IncomingItem[] = Array.isArray(body?.items) ? body.items : [];
    if (!incoming.length || incoming.length > 100) {
      return fail("El carrito está vacío o es demasiado grande");
    }

    // Precios y stock SIEMPRE desde el catálogo del servidor, nunca del navegador
    const catalog = await getCatalogProducts();
    const items = [];
    let total = 0;

    for (const item of incoming) {
      const quantity = Math.floor(Number(item.quantity));
      const product = catalog.find(
        (p) =>
          (item.product?.id && p.id === item.product.id) ||
          (item.product?.slug && p.slug === item.product.slug)
      );

      if (!product || product.active === false) {
        return fail("Un producto del carrito ya no está disponible");
      }
      if (!Number.isFinite(quantity) || quantity < 1) {
        return fail(`Cantidad inválida para ${product.name}`);
      }
      if (typeof product.stock === "number" && quantity > product.stock) {
        return fail(`Stock insuficiente para ${product.name} (disponible: ${product.stock})`);
      }

      const lineTotal = Math.round(product.price * quantity * 100) / 100;
      total += lineTotal;

      items.push({
        productId: product.id,
        sku: product.sku,
        name: product.name,
        price: product.price,
        quantity,
        lineTotal
      });
    }

    const order = {
      id: `CAYO-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      createdAt: new Date(),
      status: "nuevo",
      customer: {
        name,
        phone,
        address: String(customer.address ?? "").trim().slice(0, 200),
        delivery: String(customer.delivery ?? "").trim().slice(0, 50),
        notes: String(customer.notes ?? "").trim().slice(0, 500)
      },
      items,
      total: Math.round(total * 100) / 100
    };

    const db = await getDb();
    if (db) {
      await db.collection("orders").insertOne(order);
    }

    return NextResponse.json({
      success: true,
      stored: Boolean(db),
      orderId: order.id,
      total: order.total
    });
  } catch {
    return fail("Error al procesar el pedido", 500);
  }
}
