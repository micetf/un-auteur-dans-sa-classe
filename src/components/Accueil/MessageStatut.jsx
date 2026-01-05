import React from "react";
import PropTypes from "prop-types";

/**
 * Composant affichant un message selon le statut du compte à rebours
 * @param {Object} props - Propriétés du composant
 * @param {string} props.status - Statut du compte à rebours
 * @param {boolean} props.hasActivity - Indique si une activité est disponible
 * @param {Object} props.config - Configuration contenant les messages
 * @returns {JSX.Element|null} Composant MessageStatut ou null
 */
function MessageStatut({ status, hasActivity, config }) {
    const getMessage = () => {
        if (status === "too-early") {
            return {
                text: config.messageAvantDebut,
                type: "warning",
                icon: "⏳",
            };
        }

        if (status === "day-j") {
            return {
                text: config.messageJourJ,
                type: "success",
                icon: "🎊",
            };
        }

        if (status === "after") {
            return {
                text: config.messageApres,
                type: "info",
                icon: "📖",
            };
        }

        if (status === "before" && hasActivity) {
            return {
                text: "Une nouvelle activité vous attend aujourd'hui !",
                type: "primary",
                icon: "✨",
            };
        }

        return null;
    };

    const message = getMessage();

    if (!message) return null;

    const typeClasses = {
        success: "bg-green-50 border-green-300 text-green-800",
        info: "bg-blue-50 border-blue-300 text-blue-800",
        primary: "bg-orange-50 border-orange-300 text-orange-800",
        warning: "bg-yellow-50 border-yellow-300 text-yellow-800",
    };

    return (
        <div
            className={`
      max-w-4xl mx-auto mb-8
      border-4 rounded-2xl p-8
      ${typeClasses[message.type]}
      shadow-lg
    `}
        >
            <div className="flex items-center justify-center gap-4">
                <span className="text-6xl">{message.icon}</span>
                <p className="text-3xl font-bold text-center">{message.text}</p>
            </div>
        </div>
    );
}

MessageStatut.propTypes = {
    status: PropTypes.string.isRequired,
    hasActivity: PropTypes.bool.isRequired,
    config: PropTypes.shape({
        messageAvantDebut: PropTypes.string,
        messageApres: PropTypes.string,
        messageJourJ: PropTypes.string,
    }).isRequired,
};

export default MessageStatut;
