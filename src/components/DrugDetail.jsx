import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchDrug } from "./API/fdaApi";
import { extractDrugInfo } from "../utils/drugHelpers";
import CollapsibleCard from "./CollapsibleCard";

export default function DrugDetail() {
  const { drugName } = useParams();
  const [drugInfo, setDrugInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const [expandedSections, setExpandedSections] = useState({
    name: false,
    activeIngredient: false,
    routeOfAdministration: false,
    mechanismOfAction: false,
    physiologicEffect: false,
    chemicalStructure: false,
    purpose: false,
    conditions: false,
    dosage: false,
    askDoctor: false,
    warnings: false,
    pregnancy: false,
    storage: false,
  });

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

  useEffect(() => {
    localStorage.setItem("drugFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite
  const toggleFavorite = () => {
    const drugId = drugInfo.name;
    const isFavorite = favorites.some((fav) => fav.name === drugId);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.name !== drugId));
    } else {
      setFavorites([...favorites, drugInfo]);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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
            to="/"
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
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/50 hover:bg-white transition-all duration-300 text-gray-800 font-semibold"
        >
          ← Back to Search
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden mb-12 border border-white/50 p-8 md:p-12 lg:p-16 text-center">
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-xl">
            <span className="text-4xl md:text-5xl">💊</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
            {drugInfo.name}
          </h1>
        </div>

        {/* ALL 13 Collapsible Fields */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* 1. Name */}
          <CollapsibleCard
            title="Generic Name"
            icon="🏷️"
            color="gray"
            section="name"
            expanded={expandedSections.name}
            onToggle={toggleSection}
            content={drugInfo.name}
          />

          {/* 2. Active Ingredient */}
          <CollapsibleCard
            title="Active Ingredient"
            icon="⚗️"
            color="indigo"
            section="activeIngredient"
            expanded={expandedSections.activeIngredient}
            onToggle={toggleSection}
            content={drugInfo.activeIngredient}
          />

          {/* 3. Route of Administration */}
          <CollapsibleCard
            title="Route"
            icon="💉"
            color="green"
            section="routeOfAdministration"
            expanded={expandedSections.routeOfAdministration}
            onToggle={toggleSection}
            content={drugInfo.routeOfAdministration}
          />

          {/* 4. Mechanism of Action */}
          <CollapsibleCard
            title="Mechanism of Action"
            icon="🔬"
            color="purple"
            section="mechanismOfAction"
            expanded={expandedSections.mechanismOfAction}
            onToggle={toggleSection}
            content={drugInfo.mechanismOfAction}
          />

          {/* 5. Physiologic Effect */}
          <CollapsibleCard
            title="Physiologic Effect"
            icon="📈"
            color="blue"
            section="physiologicEffect"
            expanded={expandedSections.physiologicEffect}
            onToggle={toggleSection}
            content={drugInfo.PhysiologicEffectOrPharmacodynamicEffect}
          />

          {/* 6. Chemical Structure */}
          <CollapsibleCard
            title="Chemical Structure"
            icon="🧪"
            color="teal"
            section="chemicalStructure"
            expanded={expandedSections.chemicalStructure}
            onToggle={toggleSection}
            content={drugInfo.ChemicalStructureClassification}
          />

          {/* 7. Purpose */}
          <CollapsibleCard
            title="Purpose"
            icon="📋"
            color="blue"
            section="purpose"
            expanded={expandedSections.purpose}
            onToggle={toggleSection}
            content={drugInfo.purpose}
          />

          {/* 8. Conditions */}
          <CollapsibleCard
            title="Conditions"
            icon="🏥"
            color="red"
            section="conditions"
            expanded={expandedSections.conditions}
            onToggle={toggleSection}
            content={drugInfo.conditions}
          />

          {/* 9. Dosage */}
          <CollapsibleCard
            title="Dosage"
            icon="💊"
            color="green"
            section="dosage"
            expanded={expandedSections.dosage}
            onToggle={toggleSection}
            content={drugInfo.dosage}
          />

          {/* 10. Ask Doctor */}
          <CollapsibleCard
            title="Ask Doctor"
            icon="🩺"
            color="orange"
            section="askDoctor"
            expanded={expandedSections.askDoctor}
            onToggle={toggleSection}
            content={drugInfo.askDoctorOrPharmacist}
          />

          {/* 11. Warnings */}
          <CollapsibleCard
            title="Warnings"
            icon="⚠️"
            color="orange"
            section="warnings"
            expanded={expandedSections.warnings}
            onToggle={toggleSection}
            content={drugInfo.warnings}
          />

          {/* 12. Pregnancy */}
          <CollapsibleCard
            title="Pregnancy/Breastfeeding"
            icon="🤰"
            color="pink"
            section="pregnancy"
            expanded={expandedSections.pregnancy}
            onToggle={toggleSection}
            content={drugInfo.pregnancyOrBreastFeeding}
          />

          {/* 13. Storage */}
          <CollapsibleCard
            title="Storage"
            icon="❄️"
            color="teal"
            section="storage"
            expanded={expandedSections.storage}
            onToggle={toggleSection}
            content={drugInfo.storage}
            span="md:col-span-2 lg:col-span-3"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 pt-8 border-t border-gray-200">
          <button
            onClick={toggleFavorite}
            className={`group p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center font-semibold flex flex-col items-center gap-2 ${
              favorites.some((fav) => fav.name === drugInfo.name)
                ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            }`}
          >
            <span className="text-3xl">
              {favorites.some((fav) => fav.name === drugInfo.name)
                ? "❤️"
                : "🤍"}
            </span>
            <span>
              {favorites.some((fav) => fav.name === drugInfo.name)
                ? "Remove from Favorites"
                : "Add to Favorites"}
              <span className="text-sm block opacity-75 mt-1">
                ({favorites.length} total)
              </span>
            </span>
          </button>

          <Link
            to="/favorites"
            className="group p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center col-span-1 md:col-span-3"
          >
            <span className="text-2xl mb-2 block">📋</span>
            <span className="font-semibold">View All Favorites</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
