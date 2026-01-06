import React from "react";
import PropTypes from "prop-types";

/**
 * Composant pour afficher la photo d'un auteur avec badge source cliquable
 * @param {Object} props - Propriétés du composant
 * @param {string} props.photo - URL de la photo
 * @param {string} props.nom - Nom de l'auteur (pour l'alt)
 * @param {string} props.source - URL de la source de l'image
 * @param {string} props.size - Taille : 'small' | 'medium' | 'large'
 * @param {string} props.borderColor - Couleur de la bordure (classe Tailwind)
 * @param {string} props.iconColor - Couleur de l'icône (classe Tailwind)
 * @param {string} props.className - Classes CSS additionnelles
 * @returns {JSX.Element} Composant PhotoAuteur
 */
function PhotoAuteur({
    photo,
    nom,
    source,
    size = "medium",
    borderColor = "border-primary",
    iconColor = "text-primary",
    className = "",
}) {
    // Configuration des tailles
    const sizeConfig = {
        small: {
            photo: "w-14 h-14",
            icon: "w-2.5 h-2.5",
            badge: "p-1",
            badgePosition: "-bottom-0.5 -right-0.5",
            border: "border-2",
        },
        medium: {
            photo: "w-20 h-20",
            icon: "w-3.5 h-3.5",
            badge: "p-1.5",
            badgePosition: "-bottom-1 -right-1",
            border: "border-3",
        },
        large: {
            photo: "w-32 h-32",
            icon: "w-4 h-4",
            badge: "p-2",
            badgePosition: "bottom-0 right-0",
            border: "border-4",
        },
    };

    const config = sizeConfig[size];

    if (!photo) return null;

    return (
        <div className={`flex-shrink-0 relative ${className}`}>
            <img
                src={photo}
                alt={nom}
                className={`${config.photo} rounded-full object-cover ${config.border} ${borderColor} shadow-lg`}
                onError={(e) => {
                    e.target.style.display = "none";
                }}
            />

            {/* Badge source cliquable */}
            {source && (
                <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                        absolute ${config.badgePosition}
                        bg-white rounded-full ${config.badge}
                        shadow-lg hover:shadow-xl transition-all
                        border-2 ${borderColor}
                        group hover:scale-110
                    `}
                    title={`Source de l'image : ${source}`}
                    aria-label="Source de la photo"
                    onClick={(e) => e.stopPropagation()}
                >
                    <svg
                        className={`${config.icon} ${iconColor} group-hover:text-accent transition-colors`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                </a>
            )}
        </div>
    );
}

PhotoAuteur.propTypes = {
    photo: PropTypes.string.isRequired,
    nom: PropTypes.string.isRequired,
    source: PropTypes.string,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    borderColor: PropTypes.string,
    iconColor: PropTypes.string,
    className: PropTypes.string,
};

export default PhotoAuteur;
