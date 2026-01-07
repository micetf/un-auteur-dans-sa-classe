import React from "react";
import PropTypes from "prop-types";

/**
 * Composant bouton pour accéder à l'activité du jour
 * @param {Object} props - Propriétés du composant
 * @param {boolean} props.hasActivity - Indique si une activité est disponible aujourd'hui
 * @param {string} props.status - Statut du compte à rebours
 * @param {Function} props.onClick - Callback au clic sur le bouton
 * @returns {JSX.Element} Composant BoutonActivite
 */
function BoutonActivite({ hasActivity, status, onClick }) {
    const isDisabled =
        !hasActivity || status === "after" || status === "too-early";

    const getButtonContent = () => {
        if (status === "too-early") {
            return {
                text: "Revenez bientôt",
                emoji: "⏳",
                classes: "from-gray-400 to-gray-500 cursor-not-allowed",
            };
        }

        if (status === "day-j") {
            return {
                text: "Profitez du salon ! 🎉",
                emoji: "📚",
                classes:
                    "from-green-500 to-green-700 hover:from-green-600 hover:to-green-800",
            };
        }

        if (!hasActivity) {
            return {
                text: "Pas d'activité aujourd'hui",
                emoji: "💤",
                classes: "from-gray-400 to-gray-500 cursor-not-allowed",
            };
        }

        return {
            text: "Accéder à l'activité du jour",
            emoji: "🎨",
            classes:
                "from-accent to-orange-600 hover:from-orange-500 hover:to-orange-700 hover:scale-105",
        };
    };

    const { text, emoji, classes } = getButtonContent();

    return (
        <div className="my-12">
            <button
                onClick={!isDisabled ? onClick : undefined}
                disabled={isDisabled}
                className={`
          bg-gradient-to-r ${classes}
          text-white text-projection-button font-bold
          px-16 py-8 rounded-2xl shadow-2xl
          transform transition-all duration-300
          disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
          flex items-center gap-4
        `}
                aria-label={
                    hasActivity
                        ? "Accéder à l'activité du jour"
                        : "Pas d'activité aujourd'hui"
                }
            >
                <span className="text-5xl">{emoji}</span>
                <span>{text}</span>
            </button>

            {!hasActivity && status !== "day-j" && status !== "too-early" && (
                <p className="text-center mt-6 text-xl text-gray-600">
                    Revenez demain pour une nouvelle activité !
                </p>
            )}
        </div>
    );
}

BoutonActivite.propTypes = {
    hasActivity: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default BoutonActivite;
