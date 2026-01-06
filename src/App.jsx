import React, { useState, useEffect } from "react";
import Accueil from "@components/Accueil";
import {
    QuizVisuel,
    JeuIntrus,
    LectureImage,
    DefiCreatif,
} from "@components/Activite";
import { DevToolbar } from "@components/Dev";
import { useDevMode } from "@hooks/useDevMode";
import { useUrlPreview } from "@hooks/useUrlPreview";
import { getTodayISO } from "@utils/dateUtils";
import { ENABLE_URL_PREVIEW, ENABLE_DEV_MODE } from "./config/features";

/**
 * Composant racine de l'application
 * Gère le chargement des données et la navigation
 * @returns {JSX.Element} Composant App
 */
function App() {
    const [config, setConfig] = useState(null);
    const [activites, setActivites] = useState(null);
    const [currentView, setCurrentView] = useState("accueil");
    const [activiteDuJour, setActiviteDuJour] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hooks pour les modes de prévisualisation
    const devMode = useDevMode();
    const urlPreview = useUrlPreview(config?.dateSalon, ENABLE_URL_PREVIEW);

    // Calcul de la date effective selon priorité
    const effectiveDate = (() => {
        // Priorité 1 : Paramètre URL (si feature activée et valide)
        if (ENABLE_URL_PREVIEW && urlPreview.isValid) {
            return urlPreview.calculatedDate;
        }

        // Priorité 2 : Mode dev (si feature activée et date simulée)
        if (ENABLE_DEV_MODE && devMode.simulatedDate) {
            return devMode.simulatedDate;
        }

        // Priorité 3 : Date réelle
        return getTodayISO();
    })();

    // Chargement des données au montage du composant
    useEffect(() => {
        const loadData = async () => {
            try {
                // Chargement de la configuration
                const configResponse = await fetch("/data/config.json");
                if (!configResponse.ok) {
                    throw new Error("Impossible de charger la configuration");
                }
                const configData = await configResponse.json();
                setConfig(configData);

                // Chargement des activités
                const activitesResponse = await fetch("/data/activites.json");
                if (!activitesResponse.ok) {
                    throw new Error("Impossible de charger les activités");
                }
                const activitesData = await activitesResponse.json();
                setActivites(activitesData);

                setIsLoading(false);
            } catch (err) {
                console.error("Erreur lors du chargement des données:", err);
                setError(err.message);
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // Gestionnaire de clic sur le bouton d'activité
    const handleActiviteClick = () => {
        if (!activites) return;

        const activite = activites.activites.find(
            (act) => act.date === effectiveDate
        );

        if (activite) {
            setActiviteDuJour(activite);
            setCurrentView("activite");
        }
    };

    // Gestionnaire de retour à l'accueil
    const handleRetourAccueil = () => {
        setCurrentView("accueil");
        setActiviteDuJour(null);
    };

    // Gestionnaire de sélection d'activité depuis le mode dev
    const handleDevActiviteSelect = (activite) => {
        setActiviteDuJour(activite);
        setCurrentView("activite");
    };

    // Récupère l'auteur de l'activité
    const getAuteurActivite = (auteurId) => {
        if (!config || !auteurId) return null;
        return config.auteurs.find((a) => a.id === auteurId);
    };

    // Affichage du chargement
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-primary mx-auto mb-6"></div>
                    <p className="text-3xl text-gray-600 font-semibold">
                        Chargement de l'application...
                    </p>
                </div>
            </div>
        );
    }

    // Affichage de l'erreur
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-6">
                <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl border-4 border-red-300">
                    <div className="text-6xl text-center mb-6">⚠️</div>
                    <h1 className="text-4xl font-bold text-red-600 text-center mb-4">
                        Erreur de chargement
                    </h1>
                    <p className="text-2xl text-gray-700 text-center mb-6">
                        {error}
                    </p>
                    <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-8">
                        <p className="text-lg text-gray-700">
                            <strong>
                                Vérifiez que les fichiers suivants existent :
                            </strong>
                        </p>
                        <ul className="list-disc list-inside mt-3 text-lg text-gray-600">
                            <li>
                                <code className="bg-gray-100 px-2 py-1 rounded">
                                    /public/data/config.json
                                </code>
                            </li>
                            <li>
                                <code className="bg-gray-100 px-2 py-1 rounded">
                                    /public/data/activites.json
                                </code>
                            </li>
                        </ul>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 mx-auto block bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl text-xl transition-colors"
                    >
                        Recharger la page
                    </button>
                </div>
            </div>
        );
    }

    // Erreur de paramètre URL invalide
    if (ENABLE_URL_PREVIEW && urlPreview.hasParam && !urlPreview.isValid) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
                <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl border-4 border-yellow-300">
                    <div className="text-6xl text-center mb-6">⚠️</div>
                    <h1 className="text-4xl font-bold text-yellow-600 text-center mb-4">
                        Paramètre URL invalide
                    </h1>
                    <p className="text-2xl text-gray-700 text-center mb-6">
                        {urlPreview.error}
                    </p>
                    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8">
                        <p className="text-lg text-gray-700 mb-3">
                            <strong>Format attendu :</strong>
                        </p>
                        <code className="block bg-gray-100 px-4 py-3 rounded text-base mb-4">
                            ?j=-18
                        </code>
                        <p className="text-base text-gray-600">
                            Le paramètre <code>j</code> doit être un nombre
                            entier :
                        </p>
                        <ul className="list-disc list-inside mt-2 text-base text-gray-600">
                            <li>
                                <code>j=-100</code> : J-100 (100 jours avant le
                                salon)
                            </li>
                            <li>
                                <code>j=-1</code> : J-1 (veille du salon)
                            </li>
                            <li>
                                <code>j=0</code> : Jour du salon
                            </li>
                        </ul>
                    </div>
                    <button
                        onClick={() =>
                            (window.location.href = window.location.pathname)
                        }
                        className="mt-4 mx-auto block bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl text-xl transition-colors"
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        );
    }

    // Vérification que les données sont bien chargées
    if (!config || !activites) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
                <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl border-4 border-yellow-300">
                    <div className="text-6xl text-center mb-6">⚠️</div>
                    <h1 className="text-4xl font-bold text-yellow-600 text-center mb-4">
                        Données manquantes
                    </h1>
                    <p className="text-2xl text-gray-700 text-center">
                        Les fichiers de configuration ou d'activités n'ont pas
                        pu être chargés.
                    </p>
                </div>
            </div>
        );
    }

    // Déterminer si on affiche la banner de prévisualisation
    const showPreviewBanner = ENABLE_URL_PREVIEW && urlPreview.isValid;

    // Rendu principal
    return (
        <div className="app">
            {/* Banner de prévisualisation */}
            {showPreviewBanner && (
                <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-3 px-6 text-center z-50 shadow-lg">
                    <p className="text-xl font-semibold">
                        📅 Mode prévisualisation : J
                        {urlPreview.jValue >= 0 ? "+" : ""}
                        {urlPreview.jValue} (
                        {new Date(effectiveDate).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                        )
                    </p>
                </div>
            )}

            {/* Contenu principal avec décalage si banner */}
            <div style={showPreviewBanner ? { marginTop: "3.5rem" } : {}}>
                {currentView === "accueil" && (
                    <Accueil
                        config={config}
                        datesActivites={activites.datesActivites}
                        onActiviteClick={handleActiviteClick}
                        simulatedDate={effectiveDate}
                    />
                )}

                {currentView === "activite" && activiteDuJour && (
                    <>
                        {/* Quiz visuel */}
                        {activiteDuJour.type === "quiz" && (
                            <QuizVisuel
                                activite={activiteDuJour}
                                auteur={getAuteurActivite(
                                    activiteDuJour.auteurId
                                )}
                                onRetour={handleRetourAccueil}
                            />
                        )}

                        {/* Jeu de l'intrus */}
                        {activiteDuJour.type === "intrus" && (
                            <JeuIntrus
                                activite={activiteDuJour}
                                auteur={getAuteurActivite(
                                    activiteDuJour.auteurId
                                )}
                                onRetour={handleRetourAccueil}
                            />
                        )}

                        {/* Je lis une image */}
                        {activiteDuJour.type === "lecture" && (
                            <LectureImage
                                activite={activiteDuJour}
                                auteur={getAuteurActivite(
                                    activiteDuJour.auteurId
                                )}
                                onRetour={handleRetourAccueil}
                            />
                        )}

                        {/* Micro-défi créatif */}
                        {activiteDuJour.type === "defi" && (
                            <DefiCreatif
                                activite={activiteDuJour}
                                auteur={getAuteurActivite(
                                    activiteDuJour.auteurId
                                )}
                                onRetour={handleRetourAccueil}
                            />
                        )}

                        {/* Type non implémenté */}
                        {!["quiz", "intrus", "lecture", "defi"].includes(
                            activiteDuJour.type
                        ) && (
                            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50">
                                <div className="text-center max-w-2xl p-12">
                                    <h1 className="text-6xl font-bold text-primary mb-8">
                                        Type d'activité : {activiteDuJour.type}
                                    </h1>
                                    <p className="text-3xl text-gray-700 mb-12">
                                        Ce type d'activité n'est pas encore
                                        implémenté.
                                    </p>
                                    <button
                                        onClick={handleRetourAccueil}
                                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-6 px-12 rounded-xl text-2xl transition-colors"
                                    >
                                        ← Retour à l'accueil
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Barre d'outils de développement (conditionnelle) */}
            {ENABLE_DEV_MODE && !showPreviewBanner && (
                <DevToolbar
                    isDevMode={devMode.isDevMode}
                    onToggleDevMode={devMode.toggleDevMode}
                    simulatedDate={devMode.simulatedDate}
                    onDateChange={devMode.setDate}
                    datesActivites={activites.datesActivites}
                    activites={activites.activites}
                    onActiviteSelect={handleDevActiviteSelect}
                />
            )}
        </div>
    );
}

export default App;
