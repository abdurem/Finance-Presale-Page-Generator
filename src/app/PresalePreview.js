export default function PresalePreview({ data }) {
    if (!data) return null;
  
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">{data.headline}</h2>
        <p className="text-lg text-gray-600 mb-6">{data.subheadline}</p>
        <div className="mb-6">
          <p className="text-gray-800">{data.hook}</p>
        </div>
        <div className="mb-6 flex flex-wrap gap-4 justify-center">
          {data.benefits?.map((b, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 bg-indigo-50 rounded-xl shadow px-5 py-3 min-w-[180px] max-w-xs mb-2"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-lg">
                {idx + 1}
              </span>
              <span className="text-gray-800 font-medium text-base break-words">
                {b}
              </span>
            </div>
          ))}
        </div>
        <a
          href="https://card-apply-demo.site/offer?utm_campaign=velocity_test&utm_source=presale&utm_medium=button"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
        >
          {data.cta}
        </a>
      </div>
    );
  }