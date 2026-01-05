import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useCountdown } from "@hooks/useCountdown";
import { useActiviteDuJour } from "@hooks/useActiviteDuJour";
import DecompteAffichage from "./DecompteAffichage";
import BoutonActivite from "./BoutonActivite";
import MessageStatut from "./MessageStatut";

/**
 * Composant principal de la page d'accueil
 * Affiche le compte à rebours et donne accès à l'activité du jour
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.config - Configuration globale de l'application
 * @param {Array<string>} props.datesActivites - Liste des dates où une activité est disponible
 * @param {Function} props.onActiviteClick - Callback déclenché au clic sur le bouton d'activité
 * @param {string|null} props.simulatedDate - Date simulée (mode dev)
 * @returns {JSX.Element} Composant Accueil
 */
function Accueil({
    config,
    datesActivites,
    onActiviteClick,
    simulatedDate = null,
}) {
    const countdown = useCountdown(
        config.dateSalon,
        config.dateDebutCompteARebours || 0,
        simulatedDate
    );

    const { hasActivity, isLoading: activityLoading } = useActiviteDuJour(
        datesActivites,
        simulatedDate
    );

    // Calcul de l'état de chargement
    const isLoading = useMemo(() => {
        return countdown.status === "loading" || activityLoading;
    }, [countdown.status, activityLoading]);

    // Vérification que les données sont chargées
    const isDataLoaded = useMemo(() => {
        return !!(config && datesActivites);
    }, [config, datesActivites]);

    if (isLoading || !isDataLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
                    <p className="text-projection-text text-gray-600">
                        Chargement...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col">
            {/* En-tête */}
            <header className="bg-primary text-white py-8 shadow-lg">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-projection-title font-bold mb-2">
                        {config.titre}
                    </h1>
                    <p className="text-projection-text opacity-90">
                        {config.description}
                    </p>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="flex-1 container mx-auto px-6 py-12 flex flex-col items-center justify-center">
                {/* Affichage du décompte */}
                <DecompteAffichage
                    daysRemaining={countdown.daysRemaining}
                    status={countdown.status}
                    dateSalon={config.dateSalon}
                />

                {/* Message selon le statut */}
                <MessageStatut
                    status={countdown.status}
                    hasActivity={hasActivity}
                    config={config}
                />

                {/* Bouton d'accès à l'activité */}
                {countdown.status !== "after" && (
                    <BoutonActivite
                        hasActivity={hasActivity}
                        status={countdown.status}
                        onClick={onActiviteClick}
                    />
                )}

                {/* Mode d'emploi */}
                <div className="mt-16 max-w-3xl bg-white rounded-2xl shadow-xl p-8 border-4 border-accent/20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        📚 Mode d'emploi
                    </h2>
                    <ul className="space-y-4 text-2xl text-gray-700">
                        <li className="flex items-start">
                            <span className="text-accent font-bold mr-3">
                                ⏱️
                            </span>
                            <span>
                                <strong>Durée :</strong> environ 10 minutes par
                                activité
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-accent font-bold mr-3">
                                👥
                            </span>
                            <span>
                                <strong>Public :</strong> de la maternelle au
                                CM2
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-accent font-bold mr-3">
                                📺
                            </span>
                            <span>
                                <strong>Usage :</strong> activité collective à
                                projeter
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-accent font-bold mr-3">
                                🎯
                            </span>
                            <span>
                                <strong>Objectif :</strong> découvrir les
                                auteurs et illustrateurs invités
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-accent font-bold mr-3">
                                📅
                            </span>
                            <span>
                                <strong>Période :</strong> du{" "}
                                {getDateDebutFormatted(config)} au{" "}
                                {getDateFinFormatted(config)}
                            </span>
                        </li>
                    </ul>
                </div>
            </main>

            {/* Pied de page */}
            <footer className="bg-gray-800 text-white py-6 mt-auto">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-xl">
                        Salon du livre ·{" "}
                        {new Date(config.dateSalon).toLocaleDateString(
                            "fr-FR",
                            {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }
                        )}
                    </p>
                </div>
            </footer>
        </div>
    );
}

/**
 * Formate la date de début du compte à rebours
 * @param {Object} config - Configuration
 * @returns {string} Date formatée
 */
function getDateDebutFormatted(config) {
    if (!config.dateDebutCompteARebours) {
        return new Date(config.dateSalon).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
        });
    }

    const dateSalon = new Date(config.dateSalon);
    const dateDebut = new Date(dateSalon);
    dateDebut.setDate(dateSalon.getDate() - config.dateDebutCompteARebours);

    return dateDebut.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
    });
}

/**
 * Formate la date de fin (veille du salon)
 * @param {Object} config - Configuration
 * @returns {string} Date formatée
 */
function getDateFinFormatted(config) {
    const dateSalon = new Date(config.dateSalon);
    const dateFin = new Date(dateSalon);
    dateFin.setDate(dateSalon.getDate() - 1);

    return dateFin.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
    });
}

Accueil.propTypes = {
    config: PropTypes.shape({
        titre: PropTypes.string.isRequired,
        dateSalon: PropTypes.string.isRequired,
        dateDebutCompteARebours: PropTypes.number,
        description: PropTypes.string.isRequired,
        messageAvantDebut: PropTypes.string,
        messageApres: PropTypes.string,
        messageJourJ: PropTypes.string,
    }).isRequired,
    datesActivites: PropTypes.arrayOf(PropTypes.string).isRequired,
    onActiviteClick: PropTypes.func.isRequired,
    simulatedDate: PropTypes.string,
};

export default Accueil;
