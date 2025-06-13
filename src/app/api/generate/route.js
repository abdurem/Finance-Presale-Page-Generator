import { OpenAI } from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("Missing OPENROUTER_API_KEY in environment");
      return new Response(
        JSON.stringify({ error: "Missing OPENROUTER_API_KEY in environment" }),
        { status: 500 }
      );
    }

    const { credit_card_name, target_audience, benefits } = await req.json();

    const prompt = `
Write a high-converting presale page for a credit card called "${credit_card_name}", targeting ${target_audience}. Highlight these benefits: ${benefits
      .map((b) => `"${b}"`)
      .join(", ")}.
Return a JSON object with these fields:
{
  "headline": ...,
  "subheadline": ...,
  "hook": ...,
  "benefits": [...],
  "cta": ...
}
`;

    let completion;
    try {
      completion = await openai.chat.completions.create({
        model: "mistralai/devstral-small:free",
        messages: [
          {
            role: "system",
            content:
              "You are a world-class fintech marketing copywriter. Respond ONLY with valid JSON that matches the schema.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 512,
        temperature: 0.7,
      });
    } catch (apiErr) {
      console.error("OpenRouter API error:", apiErr);
      return new Response(
        JSON.stringify({ error: "OpenRouter API error", detail: apiErr.message, stack: apiErr.stack }),
        { status: 500 }
      );
    }

    let data = null;
    try {
      data = JSON.parse(
        completion.choices[0].message.content.replace(/```json|```/g, "").trim()
      );
    } catch (err) {
      console.error("Failed to parse LLM response:", completion.choices[0].message.content);
      return new Response(
        JSON.stringify({ error: "Failed to parse LLM response", raw: completion }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("API Route Error:", err);
    return new Response(
      JSON.stringify({ error: "Server error", detail: err.message, stack: err.stack }),
      { status: 500 }
    );
  }
}