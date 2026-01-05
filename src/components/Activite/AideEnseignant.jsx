import React from "react";
import PropTypes from "prop-types";

/**
 * Composant panneau d'aide pour l'enseignant (version compacte)
 * @param {Object} props - Propriétés du composant
 * @param {string} props.consigneEnseignant - Consigne générale pour l'enseignant
 * @param {Object} props.adaptations - Adaptations par cycle
 * @param {Function} props.onClose - Callback pour fermer le panneau
 * @returns {JSX.Element} Composant AideEnseignant
 */
function AideEnseignant({ consigneEnseignant, adaptations, onClose }) {
    return (
        <div className="bg-blue-900 text-white py-3 shadow-2xl border-b-4 border-blue-700 flex-shrink-0">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span>💡</span>
                        <span>Aide enseignant</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors text-lg"
                        aria-label="Fermer l'aide"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex gap-4">
                    {/* Consigne générale */}
                    <div className="flex-1 bg-white/10 rounded-lg p-3">
                        <h3 className="text-sm font-bold mb-1 text-blue-200">
                            📋 Consigne
                        </h3>
                        <p className="text-sm leading-relaxed">
                            {consigneEnseignant}
                        </p>
                    </div>

                    {/* Adaptations par cycle en ligne */}
                    {adaptations && (
                        <div className="flex-1 flex gap-2">
                            {/* Maternelle */}
                            {adaptations.maternelle && (
                                <div className="flex-1 bg-green-900/40 rounded-lg p-3 border border-green-400">
                                    <h4 className="text-xs font-bold mb-1 flex items-center gap-1">
                                        <span>🧸</span>
                                        <span>Maternelle</span>
                                    </h4>
                                    <p className="text-xs leading-snug">
                                        {adaptations.maternelle}
                                    </p>
                                </div>
                            )}

                            {/* Cycle 2 */}
                            {adaptations.cycle2 && (
                                <div className="flex-1 bg-yellow-900/40 rounded-lg p-3 border border-yellow-400">
                                    <h4 className="text-xs font-bold mb-1 flex items-center gap-1">
                                        <span>📚</span>
                                        <span>Cycle 2</span>
                                    </h4>
                                    <p className="text-xs leading-snug">
                                        {adaptations.cycle2}
                                    </p>
                                </div>
                            )}

                            {/* Cycle 3 */}
                            {adaptations.cycle3 && (
                                <div className="flex-1 bg-purple-900/40 rounded-lg p-3 border border-purple-400">
                                    <h4 className="text-xs font-bold mb-1 flex items-center gap-1">
                                        <span>🎓</span>
                                        <span>Cycle 3</span>
                                    </h4>
                                    <p className="text-xs leading-snug">
                                        {adaptations.cycle3}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

AideEnseignant.propTypes = {
    consigneEnseignant: PropTypes.string.isRequired,
    adaptations: PropTypes.shape({
        maternelle: PropTypes.string,
        cycle2: PropTypes.string,
        cycle3: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
};

export default AideEnseignant;
