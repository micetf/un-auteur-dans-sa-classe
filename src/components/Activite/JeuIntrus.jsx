import React, { useState } from "react";
import PropTypes from "prop-types";
import VignetteIntrus from "./VignetteIntrus";
import AideEnseignant from "./AideEnseignant";
import PhotoAuteur from "./PhotoAuteur";

/**
 * Composant Jeu de l'intrus - Design optimisé plein écran
 * Les vignettes occupent tout l'espace disponible
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.activite - Données de l'activité
 * @param {Object} props.auteur - Informations sur l'auteur/illustrateur
 * @param {Function} props.onRetour - Callback pour retourner à l'accueil
 * @returns {JSX.Element} Composant JeuIntrus
 */
function JeuIntrus({ activite, auteur, onRetour }) {
    const [selectedVignette, setSelectedVignette] = useState(null);
    const [showHelp, setShowHelp] = useState(false);

    // Limiter à 4 vignettes maximum
    const vignettes = activite.vignettes.slice(0, 4);

    const handleVignetteClick = (vignette) => {
        if (selectedVignette) return;
        setSelectedVignette(vignette);
    };

    const handleReset = () => {
        setSelectedVignette(null);
    };

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
            {/* En-tête ultra-compact avec consigne intégrée */}
            <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 shadow-lg flex-shrink-0">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Bouton retour */}
                    <button
                        onClick={onRetour}
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors text-base font-semibold"
                        aria-label="Retour à l'accueil"
                    >
                        <span className="text-lg">←</span>
                        <span>Accueil</span>
                    </button>

                    {/* Titre + Auteur + Consigne - tout sur une ligne */}
                    <div className="flex-1 flex items-center justify-center gap-6 px-6">
                        {/* Auteur avec photo */}
                        {auteur && (
                            <div className="flex items-center gap-3">
                                <PhotoAuteur
                                    photo={auteur.photo}
                                    nom={auteur.nom}
                                    source={auteur.source}
                                    size="small"
                                    borderColor="border-white"
                                    iconColor="text-purple-600"
                                />
                                <span className="text-base font-semibold">
                                    {auteur.nom}
                                </span>
                            </div>
                        )}

                        {/* Séparateur */}
                        <div className="w-px h-6 bg-white/30"></div>

                        {/* Consigne */}
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🔍</span>
                            <span className="text-xl font-bold">
                                {activite.consigneEleves}
                            </span>
                        </div>
                    </div>

                    {/* Bouton aide */}
                    <button
                        onClick={() => setShowHelp(!showHelp)}
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors text-base font-semibold"
                        aria-label={
                            showHelp ? "Masquer l'aide" : "Afficher l'aide"
                        }
                    >
                        <span className="text-lg">💡</span>
                        <span>Aide</span>
                    </button>
                </div>
            </header>

            {/* Panneau d'aide enseignant */}
            {showHelp && (
                <AideEnseignant
                    consigneEnseignant={activite.consigneEnseignant}
                    adaptations={activite.adaptations}
                    onClose={() => setShowHelp(false)}
                />
            )}

            {/* Zone principale : vignettes en plein écran */}
            <main className="flex-1 p-4 flex flex-col min-h-0">
                {!selectedVignette ? (
                    // Vue normale : grandes vignettes occupant tout l'espace
                    <div
                        className={`
            h-full grid gap-4
            ${
                vignettes.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-2 grid-rows-2"
            }
          `}
                    >
                        {vignettes.map((vignette) => (
                            <VignetteIntrus
                                key={vignette.id}
                                vignette={vignette}
                                onClick={() => handleVignetteClick(vignette)}
                            />
                        ))}
                    </div>
                ) : (
                    // Vue après sélection : vignette sélectionnée + feedback
                    <div className="h-full flex gap-4">
                        {/* Vignette sélectionnée à gauche (50%) */}
                        <div className="w-1/2 h-full">
                            <div
                                className={`
                h-full bg-white rounded-2xl shadow-2xl overflow-hidden relative
                border-8 ${selectedVignette.isIntrus ? "border-success" : "border-error"}
              `}
                            >
                                <img
                                    src={selectedVignette.image}
                                    alt={selectedVignette.titre}
                                    className="w-full h-full object-contain p-8"
                                    onError={(e) => {
                                        e.target.src =
                                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="800"%3E%3Crect width="800" height="800" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" font-size="32" text-anchor="middle" fill="%239ca3af"%3EImage non disponible%3C/text%3E%3C/svg%3E';
                                    }}
                                />
                                {/* Badge résultat */}
                                <div
                                    className={`
                  absolute top-6 right-6 rounded-2xl px-6 py-4 shadow-2xl
                  ${selectedVignette.isIntrus ? "bg-success" : "bg-error"}
                `}
                                >
                                    <div className="text-white text-center">
                                        <div className="text-5xl mb-2">
                                            {selectedVignette.isIntrus
                                                ? "🎯"
                                                : "✗"}
                                        </div>
                                        <div className="text-xl font-bold">
                                            {selectedVignette.isIntrus
                                                ? "C'est l'intrus !"
                                                : "Pas l'intrus"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feedback + autres vignettes à droite (50%) */}
                        <div className="w-1/2 h-full flex flex-col gap-4">
                            {/* Feedback explicatif - hauteur fixe */}
                            <div
                                className={`
                rounded-2xl p-6 shadow-xl border-4 flex-shrink-0
                ${
                    selectedVignette.isIntrus
                        ? "bg-green-50 border-success"
                        : "bg-orange-50 border-accent"
                }
              `}
                            >
                                <h3
                                    className={`
                  text-2xl font-bold mb-3
                  ${selectedVignette.isIntrus ? "text-green-800" : "text-orange-800"}
                `}
                                >
                                    {selectedVignette.isIntrus
                                        ? "✓ Bravo ! Vous avez trouvé l'intrus !"
                                        : "✗ Ce n'est pas l'intrus, réessayez !"}
                                </h3>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    {selectedVignette.explication}
                                </p>
                            </div>

                            {/* Miniatures des autres vignettes - prend l'espace restant */}
                            <div
                                className={`
                flex-1 grid gap-3 min-h-0
                ${
                    vignettes.length === 3
                        ? "grid-cols-2"
                        : "grid-cols-2 grid-rows-2"
                }
              `}
                            >
                                {vignettes
                                    .filter((v) => v.id !== selectedVignette.id)
                                    .map((vignette) => (
                                        <div
                                            key={vignette.id}
                                            className="bg-white rounded-xl shadow-md overflow-hidden opacity-50 border-2 border-gray-300"
                                        >
                                            <img
                                                src={vignette.image}
                                                alt={vignette.titre}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.parentElement.style.display =
                                                        "none";
                                                }}
                                            />
                                        </div>
                                    ))}
                            </div>

                            {/* Bouton recommencer - TOUJOURS VISIBLE en bas */}
                            <div className="flex-shrink-0">
                                <button
                                    onClick={handleReset}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-2xl px-8 py-5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                >
                                    🔄 Recommencer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

JeuIntrus.propTypes = {
    activite: PropTypes.shape({
        titre: PropTypes.string.isRequired,
        consigneEnseignant: PropTypes.string.isRequired,
        consigneEleves: PropTypes.string.isRequired,
        vignettes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                image: PropTypes.string.isRequired,
                titre: PropTypes.string,
                isIntrus: PropTypes.bool.isRequired,
                explication: PropTypes.string.isRequired,
            })
        ).isRequired,
        adaptations: PropTypes.shape({
            maternelle: PropTypes.string,
            cycle2: PropTypes.string,
            cycle3: PropTypes.string,
        }),
    }).isRequired,
    auteur: PropTypes.shape({
        nom: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        bio: PropTypes.string,
        photo: PropTypes.string,
        voteCE2: PropTypes.bool,
    }),
    onRetour: PropTypes.func.isRequired,
};

export default JeuIntrus;
