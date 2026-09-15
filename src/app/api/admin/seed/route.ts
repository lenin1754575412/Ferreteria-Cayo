import {
  NextResponse
} from "next/server";

import {
  products
} from "@/features/catalog/data/store";

import {
  getDb
} from "@/shared/lib/mongodb";

import {
  validAdminKey
} from "@/shared/lib/adminAuth";

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

  const collection =
    db.collection("products");

  const count =
    await collection.countDocuments();

  if (count > 0) {
    return NextResponse.json({
      success: true,
      message: "La base ya tiene productos",
      count
    });
  }

  await collection.insertMany(
    products
  );

  return NextResponse.json({
    success: true,
    count: products.length
  });
}