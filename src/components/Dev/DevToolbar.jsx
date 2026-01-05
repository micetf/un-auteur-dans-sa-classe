import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Barre d'outils pour le mode développement
 * Permet de naviguer entre les dates et activités pour les tests
 * @param {Object} props - Propriétés du composant
 * @param {boolean} props.isDevMode - Indique si le mode dev est actif
 * @param {Function} props.onToggleDevMode - Callback pour activer/désactiver le mode dev
 * @param {string} props.simulatedDate - Date actuellement simulée
 * @param {Function} props.onDateChange - Callback pour changer la date simulée
 * @param {Array<string>} props.datesActivites - Liste des dates avec activités
 * @param {Array<Object>} props.activites - Liste des activités
 * @param {Function} props.onActiviteSelect - Callback pour sélectionner une activité
 * @returns {JSX.Element} Composant DevToolbar
 */
function DevToolbar({
    isDevMode,
    onToggleDevMode,
    simulatedDate,
    onDateChange,
    datesActivites,
    activites,
    onActiviteSelect,
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedTab, setSelectedTab] = useState("dates"); // 'dates' | 'activites'

    const handleDateSelect = (date) => {
        onDateChange(date);
    };

    const handleActiviteSelect = (activite) => {
        onActiviteSelect(activite);
        onDateChange(activite.date);
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="fixed bottom-0 right-0 z-50">
            {/* Bouton toggle mode dev */}
            <button
                onClick={onToggleDevMode}
                className={`
          fixed bottom-4 right-4 w-16 h-16 rounded-full shadow-2xl
          flex items-center justify-center text-2xl font-bold
          transition-all duration-300 hover:scale-110
          ${
              isDevMode
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-700 hover:bg-gray-800 text-white"
          }
        `}
                title={isDevMode ? "Mode DEV activé" : "Activer le mode DEV"}
            >
                🔧
            </button>

            {/* Panneau de contrôle */}
            {isDevMode && (
                <div
                    className={`
            fixed bottom-20 right-4 bg-gray-900 text-white rounded-2xl shadow-2xl
            border-4 border-green-500 transition-all duration-300 overflow-hidden
            ${isExpanded ? "w-[600px] h-[500px]" : "w-auto h-auto"}
          `}
                >
                    {/* Header */}
                    <div className="bg-green-500 px-6 py-4 flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <span>🔧</span>
                            <span>Mode Développement</span>
                        </h3>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                        >
                            {isExpanded ? "−" : "+"}
                        </button>
                    </div>

                    {isExpanded && (
                        <div className="flex flex-col h-[calc(100%-64px)]">
                            {/* Info date actuelle */}
                            <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
                                <p className="text-sm text-gray-300">
                                    <strong>Date réelle :</strong> {today}
                                </p>
                                <p className="text-sm text-green-400">
                                    <strong>Date simulée :</strong>{" "}
                                    {simulatedDate || "Aucune (date réelle)"}
                                </p>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-gray-700">
                                <button
                                    onClick={() => setSelectedTab("dates")}
                                    className={`
                    flex-1 px-6 py-3 font-semibold transition-colors
                    ${
                        selectedTab === "dates"
                            ? "bg-gray-800 text-green-400"
                            : "bg-gray-900 text-gray-400 hover:text-white"
                    }
                  `}
                                >
                                    📅 Dates ({datesActivites.length})
                                </button>
                                <button
                                    onClick={() => setSelectedTab("activites")}
                                    className={`
                    flex-1 px-6 py-3 font-semibold transition-colors
                    ${
                        selectedTab === "activites"
                            ? "bg-gray-800 text-green-400"
                            : "bg-gray-900 text-gray-400 hover:text-white"
                    }
                  `}
                                >
                                    🎨 Activités ({activites.length})
                                </button>
                            </div>

                            {/* Contenu scrollable */}
                            <div className="flex-1 overflow-y-auto p-4">
                                {selectedTab === "dates" && (
                                    <div className="space-y-2">
                                        {/* Bouton reset */}
                                        <button
                                            onClick={() => onDateChange(null)}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-left font-semibold transition-colors"
                                        >
                                            🔄 Réinitialiser (utiliser la date
                                            réelle)
                                        </button>

                                        {/* Liste des dates */}
                                        {datesActivites.map((date) => {
                                            const activite = activites.find(
                                                (a) => a.date === date
                                            );
                                            const isSelected =
                                                simulatedDate === date;
                                            const isToday = today === date;

                                            return (
                                                <button
                                                    key={date}
                                                    onClick={() =>
                                                        handleDateSelect(date)
                                                    }
                                                    className={`
                            w-full px-4 py-3 rounded-lg text-left transition-colors
                            ${
                                isSelected
                                    ? "bg-green-600 text-white"
                                    : isToday
                                      ? "bg-blue-600 text-white hover:bg-blue-700"
                                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }
                          `}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-semibold">
                                                            {new Date(
                                                                date
                                                            ).toLocaleDateString(
                                                                "fr-FR",
                                                                {
                                                                    weekday:
                                                                        "short",
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </span>
                                                        <span className="text-xs opacity-75">
                                                            {activite?.type ||
                                                                "N/A"}
                                                        </span>
                                                    </div>
                                                    {activite && (
                                                        <div className="text-xs mt-1 opacity-75 truncate">
                                                            {activite.titre}
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                {selectedTab === "activites" && (
                                    <div className="space-y-2">
                                        {activites.map((activite) => {
                                            const isSelected =
                                                simulatedDate === activite.date;

                                            return (
                                                <button
                                                    key={activite.date}
                                                    onClick={() =>
                                                        handleActiviteSelect(
                                                            activite
                                                        )
                                                    }
                                                    className={`
                            w-full px-4 py-3 rounded-lg text-left transition-colors
                            ${
                                isSelected
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }
                          `}
                                                >
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs font-semibold opacity-75">
                                                            {new Date(
                                                                activite.date
                                                            ).toLocaleDateString(
                                                                "fr-FR"
                                                            )}
                                                        </span>
                                                        <span className="text-xs px-2 py-1 bg-white/20 rounded">
                                                            {activite.type}
                                                        </span>
                                                    </div>
                                                    <div className="font-semibold text-sm">
                                                        {activite.titre}
                                                    </div>
                                                    {activite.auteurId && (
                                                        <div className="text-xs mt-1 opacity-75">
                                                            Auteur:{" "}
                                                            {activite.auteurId}
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Version compacte */}
                    {!isExpanded && (
                        <div className="px-6 py-4">
                            <p className="text-sm">
                                Mode DEV actif
                                {simulatedDate && (
                                    <span className="block text-green-400 font-semibold mt-1">
                                        📅{" "}
                                        {new Date(
                                            simulatedDate
                                        ).toLocaleDateString("fr-FR")}
                                    </span>
                                )}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

DevToolbar.propTypes = {
    isDevMode: PropTypes.bool.isRequired,
    onToggleDevMode: PropTypes.func.isRequired,
    simulatedDate: PropTypes.string,
    onDateChange: PropTypes.func.isRequired,
    datesActivites: PropTypes.arrayOf(PropTypes.string).isRequired,
    activites: PropTypes.arrayOf(PropTypes.object).isRequired,
    onActiviteSelect: PropTypes.func.isRequired,
};

export default DevToolbar;
