import {
  NextResponse
} from "next/server";

import {
  getDb
} from "@/shared/lib/mongodb";

import {
  validAdminKey
} from "@/shared/lib/adminAuth";

export async function GET(
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

  const docs =
    await db
      .collection("orders")
      .find({})
      .sort({
        createdAt: -1
      })
      .limit(100)
      .toArray();

  return NextResponse.json({
    success: true,
    orders: docs.map(
      (doc: any) => {
        delete doc._id;
        return doc;
      }
    )
  });
}