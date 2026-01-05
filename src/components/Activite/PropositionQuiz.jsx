import React from "react";
import PropTypes from "prop-types";

/**
 * Composant représentant une proposition de réponse pour le quiz
 * Version optimisée pour affichage vertical compact
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.proposition - Données de la proposition
 * @param {boolean} props.isSelected - Indique si cette proposition est sélectionnée
 * @param {boolean} props.isAnswered - Indique si une réponse a déjà été donnée
 * @param {Function} props.onClick - Callback au clic sur la proposition
 * @param {boolean} props.isCompact - Mode compact (par défaut false)
 * @returns {JSX.Element} Composant PropositionQuiz
 */
function PropositionQuiz({ proposition, isSelected, isAnswered, onClick }) {
    const getClasses = () => {
        const baseClasses =
            "bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer flex-1";

        if (!isAnswered) {
            return `${baseClasses} hover:scale-105 hover:shadow-2xl border-4 border-gray-300`;
        }

        if (isSelected) {
            if (proposition.correct) {
                return `${baseClasses} border-6 border-success scale-105 shadow-2xl`;
            } else {
                return `${baseClasses} border-6 border-error scale-105 shadow-2xl`;
            }
        }

        return `${baseClasses} opacity-50 border-4 border-gray-300 cursor-not-allowed`;
    };

    const getIcon = () => {
        if (!isSelected || !isAnswered) return null;

        if (proposition.correct) {
            return (
                <div className="absolute top-2 right-2 bg-success text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-lg">
                    ✓
                </div>
            );
        } else {
            return (
                <div className="absolute top-2 right-2 bg-error text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-lg">
                    ✗
                </div>
            );
        }
    };

    return (
        <button
            onClick={onClick}
            disabled={isAnswered}
            className={getClasses()}
            aria-label={`Proposition: ${proposition.texte}`}
            aria-pressed={isSelected}
        >
            <div className="relative h-full flex flex-col">
                {/* Image de la proposition (si présente) */}
                {proposition.image && (
                    <div className="w-full h-32 bg-gray-100 overflow-hidden flex-shrink-0">
                        <img
                            src={proposition.image}
                            alt={proposition.texte}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.parentElement.style.display = "none";
                            }}
                        />
                    </div>
                )}

                {/* Icône de validation/erreur */}
                {getIcon()}

                {/* Texte de la proposition */}
                <div
                    className={`p-4 flex items-center justify-center flex-1 ${!proposition.image ? "min-h-[120px]" : ""}`}
                >
                    <p className="text-xl font-bold text-gray-800 text-center leading-tight">
                        {proposition.texte}
                    </p>
                </div>
            </div>
        </button>
    );
}

PropositionQuiz.propTypes = {
    proposition: PropTypes.shape({
        id: PropTypes.string.isRequired,
        texte: PropTypes.string.isRequired,
        image: PropTypes.string,
        correct: PropTypes.bool.isRequired,
        commentaire: PropTypes.string.isRequired,
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,
    isAnswered: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    isCompact: PropTypes.bool,
};

export default PropositionQuiz;
