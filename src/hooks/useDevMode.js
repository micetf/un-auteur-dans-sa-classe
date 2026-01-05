import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour gérer le mode développement
 * Permet de simuler n'importe quelle date et de naviguer entre les activités
 * @returns {Object} État et fonctions du mode développement
 */
export function useDevMode() {
    const [isDevMode, setIsDevMode] = useState(() => {
        // Récupère l'état depuis localStorage
        const saved = localStorage.getItem("devMode");
        return saved === "true";
    });

    const [simulatedDate, setSimulatedDate] = useState(() => {
        // Récupère la date simulée depuis localStorage
        const saved = localStorage.getItem("devSimulatedDate");
        return saved || null;
    });

    // Persiste le mode dev dans localStorage
    useEffect(() => {
        localStorage.setItem("devMode", isDevMode);
    }, [isDevMode]);

    // Persiste la date simulée dans localStorage
    useEffect(() => {
        if (simulatedDate) {
            localStorage.setItem("devSimulatedDate", simulatedDate);
        } else {
            localStorage.removeItem("devSimulatedDate");
        }
    }, [simulatedDate]);

    /**
     * Active/désactive le mode développement
     */
    const toggleDevMode = () => {
        setIsDevMode((prev) => !prev);
        if (isDevMode) {
            // Nettoie la date simulée en sortant du mode dev
            setSimulatedDate(null);
        }
    };

    /**
     * Définit une date simulée
     * @param {string} date - Date au format ISO (YYYY-MM-DD)
     */
    const setDate = (date) => {
        setSimulatedDate(date);
    };

    /**
     * Réinitialise la date simulée
     */
    const resetDate = () => {
        setSimulatedDate(null);
    };

    /**
     * Obtient la date courante (simulée ou réelle)
     * @returns {string} Date au format ISO
     */
    const getCurrentDate = () => {
        if (isDevMode && simulatedDate) {
            return simulatedDate;
        }
        const today = new Date();
        return today.toISOString().split("T")[0];
    };

    return {
        isDevMode,
        simulatedDate,
        toggleDevMode,
        setDate,
        resetDate,
        getCurrentDate,
    };
}
