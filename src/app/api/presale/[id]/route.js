// Simple in-memory store for demo (resets on server restart)
const presaleStore = global.presaleStore || (global.presaleStore = {});

export async function GET(req, { params }) {
  const { id } = params;
  const data = presaleStore[id];
  if (!data) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }
  return new Response(JSON.stringify(data), { status: 200 });
}
