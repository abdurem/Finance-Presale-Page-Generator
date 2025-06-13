"use client";
"use client";
import { useRouter } from "next/navigation";
import { usePresale } from "../PresaleContext";
import PresalePreview from "../PresalePreview";

export default function PresalePage() {
  const router = useRouter();
  const { presale } = usePresale();

  if (!presale) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">No Presale Data</h2>
          <p className="text-gray-600">Please generate a presale page first.</p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded" onClick={() => router.push("/")}>Back to Form</button>
        </div>
      </div>
    );
  }

  return <PresalePreview data={presale} />;
}


