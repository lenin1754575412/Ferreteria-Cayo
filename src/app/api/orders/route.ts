import {
  NextResponse
} from "next/server";

import {
  getDb
} from "@/shared/lib/mongodb";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    if (
      !body.customer?.name ||
      !body.customer?.phone
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Datos incompletos"
        },
        {
          status: 400
        }
      );
    }

    const order = {
      ...body,
      createdAt:
        new Date(),
      status:
        "nuevo"
    };

    const db =
      await getDb();

    if (db) {
      await db
        .collection("orders")
        .insertOne(order);
    }

    return NextResponse.json({
      success: true,
      stored: Boolean(db)
    });

  } catch {
    return NextResponse.json(
      {
        success: false
      },
      {
        status: 500
      }
    );
  }
}