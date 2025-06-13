import PresalePreview from "../../PresalePreview";

async function getPresaleData(id) {
  // Always use absolute URL for server fetch
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const res = await fetch(`${base}/api/presale/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function PresalePage({ params }) {
  const { id } = params;
  const data = await getPresaleData(id);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Presale Not Found</h2>
          <p className="text-gray-600">This presale page does not exist or has expired.</p>
        </div>
      </div>
    );
  }

  return <PresalePreview data={data} />;
}
