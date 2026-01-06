import { useMemo } from "react";

/**
 * Hook personnalisé pour gérer le paramètre URL ?j=-18
 * Permet d'accéder à une activité spécifique via URL
 * @param {string} dateSalon - Date du salon au format ISO (YYYY-MM-DD)
 * @param {boolean} enabled - Si false, le paramètre est ignoré
 * @returns {Object} État du paramètre URL
 */
export function useUrlPreview(dateSalon, enabled = true) {
    const urlState = useMemo(() => {
        // Si la fonctionnalité est désactivée, retourner un état vide
        if (!enabled) {
            return {
                hasParam: false,
                jValue: null,
                calculatedDate: null,
                isValid: false,
                error: null,
            };
        }

        // Lecture du paramètre URL
        const params = new URLSearchParams(window.location.search);
        const jParam = params.get("j");

        // Pas de paramètre → retour état vide
        if (!jParam) {
            return {
                hasParam: false,
                jValue: null,
                calculatedDate: null,
                isValid: false,
                error: null,
            };
        }

        // Validation du paramètre
        const jValue = parseInt(jParam, 10);

        if (isNaN(jValue)) {
            return {
                hasParam: true,
                jValue: jParam,
                calculatedDate: null,
                isValid: false,
                error: "Le paramètre j doit être un nombre entier",
            };
        }

        // Calcul de la date correspondante
        if (!dateSalon) {
            return {
                hasParam: true,
                jValue,
                calculatedDate: null,
                isValid: false,
                error: "Date du salon non disponible",
            };
        }

        const salon = new Date(dateSalon);
        const targetDate = new Date(salon);
        targetDate.setDate(salon.getDate() + jValue);

        return {
            hasParam: true,
            jValue,
            calculatedDate: targetDate.toISOString().split("T")[0],
            isValid: true,
            error: null,
        };
    }, [dateSalon, enabled]);

    return urlState;
}
