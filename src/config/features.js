/**
 * Configuration des fonctionnalités de l'application
 * @module config/features
 */

/**
 * FEATURE FLAG : Prévisualisation par URL
 *
 * Si true : le paramètre ?j=-18 permet d'accéder à n'importe quelle activité
 * Si false : le paramètre est ignoré, seule la date réelle est utilisée
 *
 * USAGE :
 * - Développement / démo : true
 * - Production normale : false
 *
 * EXEMPLES D'URLS :
 * - ?j=-100 → Activité du 15 janvier 2026 (J-100)
 * - ?j=-99  → Activité du 16 janvier 2026 (J-99)
 * - ?j=0    → Jour du salon (25 avril 2026)
 * - ?j=5    → 5 jours après le salon
 */
export const ENABLE_URL_PREVIEW = true;

/**
 * FEATURE FLAG : Mode développement (bouton 🔧)
 *
 * Si true : affiche le bouton flottant de navigation entre activités
 * Si false : bouton masqué
 *
 * USAGE :
 * - Développement local uniquement : true
 * - Production / démo collègues : false
 *
 * NOTE : Ce mode utilise localStorage pour persister la date simulée
 */
export const ENABLE_DEV_MODE = true;
