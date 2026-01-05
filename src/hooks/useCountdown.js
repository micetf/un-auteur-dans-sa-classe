import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour gérer le compte à rebours jusqu'à une date cible
 * @param {string} targetDate - Date cible au format ISO (YYYY-MM-DD)
 * @param {number} joursAvantDebut - Nombre de jours avant la date cible pour débuter (ex: 100 pour J-100)
 * @param {string|null} simulatedDate - Date simulée (mode dev)
 * @returns {Object} Objet contenant le nombre de jours restants et l'état
 */
export function useCountdown(
    targetDate,
    joursAvantDebut = 0,
    simulatedDate = null
) {
    const [countdown, setCountdown] = useState({
        daysRemaining: null,
        status: "loading", // 'loading' | 'too-early' | 'before' | 'day-j' | 'after'
    });

    useEffect(() => {
        const calculateCountdown = () => {
            const today = simulatedDate ? new Date(simulatedDate) : new Date();
            today.setHours(0, 0, 0, 0);

            const target = new Date(targetDate);
            target.setHours(0, 0, 0, 0);

            const diffTime = target - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let status;
            if (diffDays > joursAvantDebut) {
                // Avant le début du compte à rebours (avant J-100)
                status = "too-early";
            } else if (diffDays > 0) {
                // Pendant le compte à rebours (entre J-100 et J-1)
                status = "before";
            } else if (diffDays === 0) {
                // Le jour J
                status = "day-j";
            } else {
                // Après l'événement
                status = "after";
            }

            setCountdown({
                daysRemaining: diffDays,
                status,
            });
        };

        calculateCountdown();

        // Si pas de date simulée, mise à jour quotidienne à minuit
        if (!simulatedDate) {
            const now = new Date();
            const night = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() + 1,
                0,
                0,
                0
            );
            const msToMidnight = night.getTime() - now.getTime();

            const midnightTimeout = setTimeout(() => {
                calculateCountdown();
                // Puis mise à jour toutes les 24h
                const dailyInterval = setInterval(
                    calculateCountdown,
                    24 * 60 * 60 * 1000
                );
                return () => clearInterval(dailyInterval);
            }, msToMidnight);

            return () => clearTimeout(midnightTimeout);
        }
    }, [targetDate, joursAvantDebut, simulatedDate]);

    return countdown;
}
