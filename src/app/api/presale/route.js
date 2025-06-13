import { randomUUID } from "crypto";

// Simple in-memory store for demo (resets on server restart)
const presaleStore = global.presaleStore || (global.presaleStore = {});

export async function POST(req) {
  const data = await req.json();
  const id = randomUUID();
  presaleStore[id] = data;
  return new Response(JSON.stringify({ id }), { status: 200 });
}
