const CollapsibleCard = ({
  title,
  icon,
  color,
  section,
  expanded,
  onToggle,
  content,
  span,
}) => (
  <div
    className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-${color}-200/50 hover:shadow-2xl transition-all duration-300 cursor-pointer group ${span || ""}`}
    onClick={() => onToggle(section)}
  >
    <div className={`p-6 md:p-8 hover:bg-${color}-50/50 transition-colors`}>
      <div className="flex items-center justify-between mb-3">
        <h3
          className={`text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2 group-hover:text-${color}-700 transition-colors`}
        >
          <span className={`text-${color}-600 text-xl md:text-2xl`}>
            {icon}
          </span>
          {title}
        </h3>
        <button
          className={`p-2 rounded-xl bg-${color}-100/50 group-hover:bg-${color}-200 transition-all`}
        >
          {expanded ? (
            <span className="text-xl">−</span>
          ) : (
            <span className="text-xl">+</span>
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out text-gray-700 leading-relaxed prose prose-sm ${
          expanded ? "max-h-96 opacity-100 py-3" : "max-h-0 opacity-0"
        }`}
      >
        {content || "No information available."}
      </div>
    </div>
  </div>
);

export default CollapsibleCard;
