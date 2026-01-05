import React from "react";
import PropTypes from "prop-types";

/**
 * Composant représentant une vignette dans le jeu de l'intrus
 * Version simplifiée pour grandes vignettes
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.vignette - Données de la vignette
 * @param {Function} props.onClick - Callback au clic sur la vignette
 * @returns {JSX.Element} Composant VignetteIntrus
 */
function VignetteIntrus({ vignette, onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-3xl border-4 border-purple-300 hover:border-purple-500 group"
            aria-label={vignette.titre || `Vignette ${vignette.id}`}
        >
            <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-white to-purple-50">
                {/* Image de la vignette */}
                <img
                    src={vignette.image}
                    alt={vignette.titre || `Vignette ${vignette.id}`}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        e.target.src =
                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600"%3E%3Crect width="600" height="600" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" font-size="24" text-anchor="middle" fill="%239ca3af"%3EImage%0Anon disponible%3C/text%3E%3C/svg%3E';
                    }}
                />

                {/* Numéro de vignette discret */}
                <div className="absolute top-4 left-4 bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold shadow-lg">
                    {vignette.id}
                </div>

                {/* Effet hover */}
                <div className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>
        </button>
    );
}

VignetteIntrus.propTypes = {
    vignette: PropTypes.shape({
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        titre: PropTypes.string,
        isIntrus: PropTypes.bool.isRequired,
        explication: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default VignetteIntrus;
