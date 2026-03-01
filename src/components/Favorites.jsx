import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("drugFavorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const removeFavorite = (drugName) => {
    const updated = favorites.filter((fav) => fav.name !== drugName);
    setFavorites(updated);
    localStorage.setItem("drugFavorites", JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="text-6xl mb-6">❤️</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            No Favorites Yet
          </h2>
          <p className="text-gray-600 mb-8">
            Start adding drugs to your favorites list!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
          >
            🔍 Start Searching
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      <div className="pt-6 px-6 max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/50 hover:bg-white transition-all duration-300 text-gray-800 font-semibold mb-8"
        >
          ← Back to Search
        </Link>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
          <h1 className="text-4xl font-black text-gray-800 mb-8 flex items-center gap-4">
            ❤️ Your Favorites ({favorites.length})
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((drug, index) => (
              <Link
                key={index}
                to={`/drug/${encodeURIComponent(drug.name)}`}
                className="block bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">💊</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {drug.name}
                </h3>

                {drug.manufacturer && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-1">
                    🏭 {drug.manufacturer}
                  </p>
                )}

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFavorite(drug.name);
                  }}
                  className="w-full p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 text-sm"
                  title="Remove from favorites"
                >
                  Remove ❤️
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
