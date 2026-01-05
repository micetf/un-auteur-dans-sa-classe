import React from "react";
import PropTypes from "prop-types";
import { formatCountdown } from "@utils/dateUtils";

/**
 * Composant d'affichage du décompte J-??
 * @param {Object} props - Propriétés du composant
 * @param {number} props.daysRemaining - Nombre de jours restants
 * @param {string} props.status - Statut du compte à rebours ('too-early' | 'before' | 'day-j' | 'after')
 * @param {string} props.dateSalon - Date du salon au format ISO
 * @returns {JSX.Element} Composant DecompteAffichage
 */
function DecompteAffichage({ daysRemaining, status, dateSalon }) {
    const getColorClasses = () => {
        if (status === "too-early") {
            return "from-gray-400 to-gray-500";
        }
        if (status === "day-j") {
            return "from-green-400 to-green-600 animate-pulse";
        }
        if (status === "after") {
            return "from-gray-400 to-gray-600";
        }
        if (daysRemaining <= 7) {
            return "from-orange-400 to-red-500";
        }
        return "from-blue-400 to-purple-600";
    };

    const getEmoji = () => {
        if (status === "too-early") return "⏳";
        if (status === "day-j") return "🎉";
        if (status === "after") return "📚";
        if (daysRemaining <= 7) return "⏰";
        return "📅";
    };

    const getText = () => {
        if (status === "too-early")
            return "Le compte à rebours n'a pas encore commencé";
        if (status === "day-j") return "C'est aujourd'hui !";
        if (status === "after") return "L'événement est passé";
        return "avant le salon";
    };

    return (
        <div className="text-center mb-12">
            <div className="inline-block">
                {/* Badge compte à rebours */}
                <div
                    className={`
          bg-gradient-to-r ${getColorClasses()}
          text-white rounded-3xl px-16 py-8 shadow-2xl
          transform transition-all duration-300 hover:scale-105
        `}
                >
                    <div className="text-6xl mb-2">{getEmoji()}</div>
                    <div className="text-[8rem] font-black leading-none tracking-tight">
                        {formatCountdown(daysRemaining)}
                    </div>
                    <div className="text-3xl mt-4 font-semibold opacity-90">
                        {getText()}
                    </div>
                </div>

                {/* Date du salon */}
                <div className="mt-6 text-2xl text-gray-600 font-medium">
                    Salon du livre le{" "}
                    <span className="text-primary font-bold">
                        {new Date(dateSalon).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
}

DecompteAffichage.propTypes = {
    daysRemaining: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["too-early", "before", "day-j", "after"])
        .isRequired,
    dateSalon: PropTypes.string.isRequired,
};

export default DecompteAffichage;
