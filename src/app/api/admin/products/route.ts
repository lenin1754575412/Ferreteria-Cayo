import {
  NextResponse
} from "next/server";

import {
  randomUUID
} from "crypto";

import {
  getDb
} from "@/shared/lib/mongodb";

import {
  validAdminKey
} from "@/shared/lib/adminAuth";

import {
  categoryImages,
  slugify
} from "@/features/catalog/data/store";

export async function GET(
  request: Request
) {

  if (!validAdminKey(request)) {
    return NextResponse.json(
      {
        success: false,
        error: "No autorizado"
      },
      {
        status: 401
      }
    );
  }

  const db = await getDb();

  if (!db) {
    return NextResponse.json(
      {
        success: false,
        error: "Configura MONGODB_URI"
      },
      {
        status: 503
      }
    );
  }

  const docs =
    await db
      .collection("products")
      .find({})
      .sort({
        name: 1
      })
      .toArray();

  const products =
    docs.map((doc: any) => {
      delete doc._id;
      return doc;
    });

  return NextResponse.json({
    success: true,
    products
  });
}

export async function POST(
  request: Request
) {

  if (!validAdminKey(request)) {
    return NextResponse.json(
      {
        success: false
      },
      {
        status: 401
      }
    );
  }

  const db = await getDb();

  if (!db) {
    return NextResponse.json(
      {
        success: false,
        error: "MongoDB no configurado"
      },
      {
        status: 503
      }
    );
  }

  const body =
    await request.json();

  const product = {
    id:
      body.id ||
      randomUUID(),

    sku:
      body.sku ||
      `CAYO-${Date.now()}`,

    slug:
      slugify(body.name),

    name:
      String(body.name),

    cat:
      String(body.cat),

    brand:
      String(body.brand),

    price:
      Number(body.price),

    oldPrice:
      body.oldPrice
        ? Number(body.oldPrice)
        : undefined,

    stock:
      Number(body.stock),

    img:
      String(
        body.img ||
        categoryImages[body.cat] ||
        ""
      ),

    description:
      String(body.description),

    badge:
      body.badge || undefined,

    active:
      true
  };

  await db
    .collection("products")
    .insertOne(product);

  return NextResponse.json({
    success: true,
    product
  });
}

export async function DELETE(
  request: Request
) {

  if (!validAdminKey(request)) {
    return NextResponse.json(
      {
        success: false
      },
      {
        status: 401
      }
    );
  }

  const id =
    new URL(request.url)
      .searchParams
      .get("id");

  const db = await getDb();

  if (!db || !id) {
    return NextResponse.json(
      {
        success: false
      },
      {
        status: 400
      }
    );
  }

  await db
    .collection("products")
    .deleteOne({
      id
    });

  return NextResponse.json({
    success: true
  });
}