import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour récupérer l'activité du jour
 * @param {Array<string>} datesActivites - Liste des dates où une activité est disponible
 * @param {string|null} simulatedDate - Date simulée (mode dev)
 * @returns {Object} État de l'activité du jour
 */
export function useActiviteDuJour(datesActivites, simulatedDate = null) {
    const [state, setState] = useState({
        hasActivity: false,
        isLoading: true,
        error: null,
        activite: null,
    });

    useEffect(() => {
        const checkActivity = () => {
            const today =
                simulatedDate || new Date().toISOString().split("T")[0];

            const hasActivity = datesActivites.includes(today);

            setState({
                hasActivity,
                isLoading: false,
                error: null,
                activite: null,
            });
        };

        checkActivity();
    }, [datesActivites, simulatedDate]);

    return state;
}
