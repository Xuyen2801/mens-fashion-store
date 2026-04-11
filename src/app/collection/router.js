import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("mydb");

  const data = await db.collection("collections").find({}).toArray();

  return Response.json(data);
}