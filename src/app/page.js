"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [form, setForm] = useState({
    credit_card_name: "",
    target_audience: "",
    benefits: [""],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBenefitChange = (idx, value) => {
    const benefits = [...form.benefits];
    benefits[idx] = value;
    setForm({ ...form, benefits });
  };

  const addBenefit = () => {
    setForm({ ...form, benefits: [...form.benefits, ""] });
  };

  const removeBenefit = (idx) => {
    const benefits = form.benefits.filter((_, i) => i !== idx);
    setForm({ ...form, benefits });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // 1. Generate presale content
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to generate content");
      const data = await res.json();

      // 2. Store presale content and get id
      const storeRes = await fetch("/api/presale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!storeRes.ok) throw new Error("Failed to save presale");
      const { id } = await storeRes.json();

      // 3. Redirect to /presale/[id]
      router.push(`/presale/${id}`);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full mt-16">
        <h1 className="text-2xl font-bold mb-6 text-indigo-700 text-center">
          Finance Presale Page Generator
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Credit Card Name
            </label>
            <input
              name="credit_card_name"
              type="text"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={form.credit_card_name}
              onChange={handleChange}
              placeholder="e.g. Velocity Platinum Rewards Card"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Target Audience
            </label>
            <input
              name="target_audience"
              type="text"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={form.target_audience}
              onChange={handleChange}
              placeholder="e.g. Young professionals looking to maximize travel perks"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Benefits
            </label>
            <div className="space-y-2">
              {form.benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={benefit}
                    required
                    placeholder={`Benefit ${idx + 1}`}
                    onChange={e => handleBenefitChange(idx, e.target.value)}
                  />
                  {form.benefits.length > 1 && (
                    <button
                      type="button"
                      aria-label="Remove benefit"
                      className="text-red-500 px-2 rounded hover:bg-red-50"
                      onClick={() => removeBenefit(idx)}
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-sm font-medium"
                onClick={addBenefit}
              >
                + Add Benefit
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Presale Page"}
          </button>
        </form>
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

      </div>
    </div>
  );
}