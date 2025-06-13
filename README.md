# Finance Presale Page Generator

A functional prototype that generates high-converting finance presale pages using LLMs (Mistral/OpenAI), styled with TailwindCSS, and instantly deployable for public sharing.

---

## 🚀 Live Demo

> **[🔗 View the live app here](https://your-vercel-deployment-url.vercel.app/)**
> *(Update this link after deployment)*

---

## 🎯 Features

- **Structured Input:** Collects credit card name, target audience, and multiple benefits.
- **LLM-powered Content:** Uses OpenRouter (Mistral) or OpenAI GPT to generate headline, subheadline, hook, benefits, and CTA.
- **Beautiful Template:** Responsive, modern TailwindCSS layout.
- **Shareable Pages:** Each presale is accessible at `/presale/[id]`.
- **CTA with UTM:** Button links to a test offer URL with UTM tracking.
- **No TypeScript required:** Pure JavaScript for easy prototyping.

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```sh
git clone https://github.com/your-username/finance-presale-page-generator.git
cd finance-presale-page-generator
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```
# For OpenRouter (Mistral)
OPENAI_API_KEY=sk-your-openrouter-key
# For local dev
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> **Note:** You can get an OpenRouter key at https://openrouter.ai

### 4. Run locally

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Project Structure

- `src/app/page.js` — Main input form.
- `src/app/api/generate/route.js` — LLM content generation API.
- `src/app/api/presale/route.js` — Store presale data (in-memory).
- `src/app/api/presale/[id]/route.js` — Retrieve presale data by ID.
- `src/app/presale/[id]/page.js` — Public presale page.
- `src/app/PresalePreview.js` — Styled presale preview component.

---

## 📝 Customization

- **Change LLM Model:** Edit `src/app/api/generate/route.js` to use your preferred model.
- **Styling:** Modify `PresalePreview.js` for custom branding or layout.
- **Persistence:** For production, swap in-memory store for a real database.

---

## 📦 Deployment

1. Push your repo to GitHub.
2. Deploy to [Vercel](https://vercel.com/import) or your preferred platform.
3. Set environment variables in the platform dashboard.

---

## 📌 Requirements

- Node.js 18+
- OpenRouter or OpenAI API key
