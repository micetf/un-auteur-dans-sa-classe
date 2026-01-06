import React, { useState } from "react";
import PropTypes from "prop-types";
import PhotoAuteur from "./PhotoAuteur";
import AideEnseignant from "./AideEnseignant";

/**
 * Composant Micro-défi créatif
 * Propose une consigne créative simple sans interaction numérique
 * L'activité se fait hors écran (dessin, écriture, oral)
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.activite - Données de l'activité
 * @param {Object} props.auteur - Informations sur l'auteur/illustrateur
 * @param {Function} props.onRetour - Callback pour retourner à l'accueil
 * @returns {JSX.Element} Composant DefiCreatif
 */
function DefiCreatif({ activite, auteur, onRetour }) {
    const [showHelp, setShowHelp] = useState(false);

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
            {/* En-tête compact */}
            <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 shadow-lg flex-shrink-0">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <button
                        onClick={onRetour}
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-lg font-semibold"
                        aria-label="Retour à l'accueil"
                    >
                        <span className="text-xl">←</span>
                        <span>Accueil</span>
                    </button>

                    <h1 className="text-2xl font-bold text-center flex-1 px-4 truncate">
                        {activite.titre}
                    </h1>

                    <button
                        onClick={() => setShowHelp(!showHelp)}
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-lg font-semibold"
                        aria-label={
                            showHelp ? "Masquer l'aide" : "Afficher l'aide"
                        }
                    >
                        <span className="text-xl">💡</span>
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

            {/* Contenu principal centré */}
            <main className="flex-1 container mx-auto px-6 py-8 flex items-center justify-center">
                <div className="max-w-5xl w-full">
                    {/* Carte principale du défi */}
                    <div className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-amber-300">
                        {/* En-tête avec auteur */}
                        {auteur && (
                            <div className="flex items-center justify-center gap-6 mb-8 pb-8 border-b-2 border-amber-200">
                                <PhotoAuteur
                                    photo={auteur.photo}
                                    nom={auteur.nom}
                                    source={auteur.source}
                                    size="large"
                                    borderColor="border-amber-600"
                                    iconColor="text-amber-600"
                                />
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold text-gray-800">
                                        {auteur.nom}
                                    </h2>
                                    <p className="text-xl text-amber-600 font-semibold mt-1">
                                        {auteur.type === "illustrateur" ||
                                        auteur.type === "illustratrice"
                                            ? `Illustrat${auteur.type.endsWith("rice") ? "rice" : "eur"}`
                                            : `Auteur${auteur.type.endsWith("rice") ? "e" : ""}`}
                                    </p>
                                    {auteur.voteCE2 && (
                                        <span className="inline-block text-sm bg-accent text-white px-3 py-1 rounded-full font-semibold mt-2">
                                            Vote CE2
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Badge "Défi créatif" */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-lg">
                                <span className="text-5xl">✏️</span>
                                <span className="text-3xl font-bold">
                                    DÉFI CRÉATIF
                                </span>
                            </div>
                        </div>

                        {/* Consigne principale */}
                        <div className="bg-amber-50 rounded-2xl p-8 mb-8 border-2 border-amber-300">
                            <p className="text-4xl font-bold text-center text-gray-800 leading-tight">
                                {activite.consigneEleves}
                            </p>
                        </div>

                        {/* Image de référence si présente */}
                        {activite.imageReference && (
                            <div className="mb-8">
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-amber-200 max-w-3xl mx-auto">
                                    <img
                                        src={activite.imageReference}
                                        alt="Exemple de style"
                                        className="w-full h-auto object-contain max-h-96"
                                        onError={(e) => {
                                            e.target.parentElement.style.display =
                                                "none";
                                        }}
                                    />
                                </div>
                                <p className="text-center text-lg text-gray-600 mt-3 italic">
                                    Exemple de style pour t'inspirer
                                </p>
                            </div>
                        )}

                        {/* Informations pratiques */}
                        <div className="grid grid-cols-2 gap-6 mt-8">
                            {/* Durée */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-300">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-4xl">⏱️</span>
                                    <h3 className="text-2xl font-bold text-blue-900">
                                        Durée
                                    </h3>
                                </div>
                                <p className="text-3xl font-bold text-blue-700">
                                    {activite.duree} minutes
                                </p>
                            </div>

                            {/* Matériel */}
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-300">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-4xl">📦</span>
                                    <h3 className="text-2xl font-bold text-green-900">
                                        Matériel
                                    </h3>
                                </div>
                                <ul className="space-y-1">
                                    {activite.materiel.map((item, index) => (
                                        <li
                                            key={index}
                                            className="text-xl text-green-800 flex items-center gap-2"
                                        >
                                            <span className="text-green-600">
                                                •
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Message d'encouragement */}
                        <div className="mt-8 text-center">
                            <p className="text-2xl text-gray-600 italic">
                                🎨 C'est à toi de jouer ! 🎨
                            </p>
                            <p className="text-xl text-gray-500 mt-2">
                                Laisse libre cours à ta créativité !
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

DefiCreatif.propTypes = {
    activite: PropTypes.shape({
        titre: PropTypes.string.isRequired,
        consigneEnseignant: PropTypes.string.isRequired,
        consigneEleves: PropTypes.string.isRequired,
        imageReference: PropTypes.string,
        duree: PropTypes.number.isRequired,
        materiel: PropTypes.arrayOf(PropTypes.string).isRequired,
        adaptations: PropTypes.shape({
            maternelle: PropTypes.string,
            cycle2: PropTypes.string,
            cycle3: PropTypes.string,
        }),
    }).isRequired,
    auteur: PropTypes.shape({
        nom: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        photo: PropTypes.string,
        source: PropTypes.string,
        voteCE2: PropTypes.bool,
    }),
    onRetour: PropTypes.func.isRequired,
};

export default DefiCreatif;
