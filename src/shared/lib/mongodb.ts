import { MongoClient } from "mongodb";

let clientPromise: Promise<MongoClient> | null = null;

export async function getDb() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return null;
  }

  if (!clientPromise) {
    clientPromise =
      new MongoClient(uri).connect();
  }

  const client =
    await clientPromise;

  return client.db(
    process.env.MONGODB_DB ??
      "ferreteria_cayo"
  );
}