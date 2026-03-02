import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchDrug } from "./API/fdaApi";
import { extractDrugInfo } from "../utils/drugHelpers";

export default function SearchDrug() {
  const [query, setQuery] = useState("");
  const [drugInfo, setDrugInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const drug = await fetchDrug(query);

      if (drug) {
        const info = extractDrugInfo(drug);
        console.log(info);
        setDrugInfo(info);
      } else {
        setDrugInfo(null);
      }
    } catch (error) {
      console.error("❌ Error", error);
      setDrugInfo(null);
    }

    setLoading(false);
  };

  const handleClear = () => {
    setQuery("");
    setDrugInfo(null);
    setHasSearched(false);
    setLoading(false);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-[420px]:w-11/12 max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="text-center mb-8 mx-auto">
        <h1 className=" text-3xl md:text-5xl font-serif tracking-tighter bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          💊 MedicineFinder
        </h1>
        <p className="text-xl text-gray-600">
          Search FDA-approved medications instantly
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="e.g., acetaminophen, aspirin, ibuprofen..."
            className="flex-1 px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-sm"
            disabled={loading}
          />

          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
          >
            {loading ? "🔍 Searching..." : "🔍 Search"}
          </button>

          <button
            onClick={handleClear}
            disabled={loading}
            className="px-6 py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center mt-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-600">
            Searching FDA database...
          </p>
        </div>
      )}

      {!loading && hasSearched && (
        <>
          {drugInfo ? (
            /* DRUG LINK TO DETAIL PAGE */
            <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
              <Link
                to={`/drug/${encodeURIComponent(drugInfo.name || query)}`}
                state={{ drugInfo }}
                className="block p-8 hover:bg-blue-50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl group-hover:scale-105 transition-transform">
                    <span className="text-3xl">💊</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm sm:text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 truncate">
                      {drugInfo.name || query}
                    </h2>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mb-2 mx-auto"></div>
                    <span className="text-sm text-green-600 font-medium block">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            /* NO RESULTS - ONLY AFTER SEARCH */
            <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-yellow-200 border-opacity-50 p-8 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No Results Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                No drug found for "<strong>{query}</strong>". Try
                "acetaminophen", "ibuprofen", or "aspirin".
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <button
                  onClick={() => setQuery("acetaminophen")}
                  className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium rounded-lg transition-colors"
                >
                  acetaminophen
                </button>
                <button
                  onClick={() => setQuery("ibuprofen")}
                  className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium rounded-lg transition-colors"
                >
                  ibuprofen
                </button>
                <button
                  onClick={() => setQuery("aspirin")}
                  className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium rounded-lg transition-colors"
                >
                  aspirin
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
