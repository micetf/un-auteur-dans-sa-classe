/**
 * Formate un nombre de jours en texte de compte à rebours
 * @param {number} days - Nombre de jours
 * @returns {string} Texte formaté (ex: "J-45")
 */
export function formatCountdown(days) {
    if (days > 0) {
        return `J-${days}`;
    } else if (days === 0) {
        return "J-0";
    } else {
        return `J+${Math.abs(days)}`;
    }
}

/**
 * Vérifie si une date est dans la période d'activité
 * @param {string} dateString - Date au format ISO
 * @param {Array<string>} validDates - Liste des dates valides
 * @returns {boolean}
 */
export function isValidActivityDate(dateString, validDates) {
    return validDates.includes(dateString);
}

/**
 * Obtient la date du jour au format ISO
 * @param {string|null} simulatedDate - Date simulée optionnelle (mode dev)
 * @returns {string} Date au format YYYY-MM-DD
 */
export function getTodayISO(simulatedDate = null) {
    if (simulatedDate) {
        return simulatedDate;
    }
    const today = new Date();
    return today.toISOString().split("T")[0];
}
