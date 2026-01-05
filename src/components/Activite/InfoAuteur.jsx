import React from "react";
import PropTypes from "prop-types";

/**
 * Composant affichant les informations sur l'auteur/illustrateur
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.auteur - Informations sur l'auteur
 * @param {string} props.className - Classes CSS additionnelles
 * @returns {JSX.Element} Composant InfoAuteur
 */
function InfoAuteur({ auteur, className = "" }) {
    if (!auteur) return null;

    return (
        <div
            className={`bg-white rounded-2xl shadow-lg p-6 border-l-8 border-primary ${className}`}
        >
            <div className="flex items-center gap-6">
                {/* Photo de l'auteur */}
                {auteur.photo && (
                    <div className="flex-shrink-0">
                        <img
                            src={auteur.photo}
                            alt={auteur.nom}
                            className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-md"
                            onError={(e) => {
                                e.target.style.display = "none";
                            }}
                        />
                    </div>
                )}

                {/* Informations textuelles */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {auteur.nom}
                    </h2>
                    <p className="text-xl text-primary font-semibold mb-2">
                        {auteur.type === "illustrateur" ||
                        auteur.type === "illustratrice"
                            ? `Illustrateur${auteur.type.endsWith("rice") ? "rice" : ""}`
                            : `Auteur${auteur.type.endsWith("rice") ? "e" : ""}`}
                    </p>
                    {auteur.bio && (
                        <p className="text-lg text-gray-600 italic">
                            {auteur.bio}
                        </p>
                    )}
                </div>

                {/* Badge Vote CE2 si applicable */}
                {auteur.voteCE2 && (
                    <div className="flex-shrink-0 bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg shadow-md">
                        🗳️ Vote CE2
                    </div>
                )}
            </div>
        </div>
    );
}

InfoAuteur.propTypes = {
    auteur: PropTypes.shape({
        nom: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        bio: PropTypes.string,
        photo: PropTypes.string,
        voteCE2: PropTypes.bool,
    }),
    className: PropTypes.string,
};

export default InfoAuteur;
