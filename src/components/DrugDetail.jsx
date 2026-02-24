import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchDrug } from "./API/fdaApi";
import { extractDrugInfo } from "../utils/drugHelpers";

export default function DrugDetail() {
  const { drugName } = useParams();
  const [drugInfo, setDrugInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDrug = async () => {
      if (!drugName) return;

      setLoading(true);
      setError(null);

      try {
        const drug = await fetchDrug(decodeURIComponent(drugName));
        if (drug) {
          const info = extractDrugInfo(drug);
          setDrugInfo(info);
        } else {
          setError("Drug not found");
        }
      } catch (err) {
        console.error("Drug load error:", err);
        setError("Failed to load drug information");
      } finally {
        setLoading(false);
      }
    };

    loadDrug();
  }, [drugName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-xl text-gray-600">Loading drug details...</p>
        </div>
      </div>
    );
  }

  if (error || !drugInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="text-6xl mb-6">💊</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {error || "Drug Not Found"}
          </h2>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
          >
            🔍 Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Back Navigation */}
      <div className="pt-6 px-6 max-w-7xl mx-auto">
        <Link
          to="/search"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/50 hover:bg-white transition-all duration-300 text-gray-800 font-semibold"
        >
          ← Back to Search
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Hero Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden mb-8 border border-white/50">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-xl">
                  <span className="text-4xl md:text-5xl">💊</span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 leading-tight">
                  {drugInfo.name}
                </h1>
                {drugInfo.manufacturer && (
                  <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-2xl">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-2xl font-bold text-gray-800">
                      🏭 {drugInfo.manufacturer}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Drug Information Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Uses Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-blue-600">📋</span> Uses
            </h3>
            <div className="text-gray-700 leading-relaxed max-h-32 overflow-y-auto prose prose-sm">
              {drugInfo.indications || "No usage information available."}
            </div>
          </div>

          {/* Dosage Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-green-600">💉</span> Dosage
            </h3>
            <div className="text-gray-700 leading-relaxed max-h-32 overflow-y-auto prose prose-sm">
              {drugInfo.dosage || "Consult your doctor for dosage information."}
            </div>
          </div>

          {/* Warnings Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-orange-600">⚠️</span> Warnings
            </h3>
            <div className="text-gray-700 leading-relaxed prose prose-sm">
              {drugInfo.warnings || "No specific warnings listed."}
            </div>
          </div>

          {/* Additional Info */}
          {drugInfo.additionalInfo && (
            <div className="md:col-span-2 lg:col-span-3 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-purple-600">ℹ️</span> Additional
                Information
              </h3>
              <div className="text-gray-700 leading-relaxed prose prose-sm">
                {drugInfo.additionalInfo}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 pt-8 border-t border-gray-200">
          <Link
            to="/favorites"
            className="group p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-center"
          >
            <span className="text-2xl mb-2 block">❤️</span>
            <span className="font-semibold">Add to Favorites</span>
          </Link>

          <button className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300">
            <span className="text-2xl mb-2 block">📱</span>
            <span className="font-semibold">Share</span>
          </button>

          <Link
            to="/categories"
            className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center md:col-span-2"
          >
            <span className="text-2xl mb-2 block">📂</span>
            <span className="font-semibold">Browse Categories</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
