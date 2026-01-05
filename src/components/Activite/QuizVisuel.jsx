import React, { useState } from "react";
import PropTypes from "prop-types";
import PropositionQuiz from "./PropositionQuiz";
import InfoAuteur from "./InfoAuteur";
import AideEnseignant from "./AideEnseignant";

/**
 * Composant Quiz visuel optimisé pour tenir sur un écran sans scroll
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.activite - Données de l'activité
 * @param {Object} props.auteur - Informations sur l'auteur/illustrateur
 * @param {Function} props.onRetour - Callback pour retourner à l'accueil
 * @returns {JSX.Element} Composant QuizVisuel
 */
function QuizVisuel({ activite, auteur, onRetour }) {
    const [selectedProposition, setSelectedProposition] = useState(null);
    const [showHelp, setShowHelp] = useState(false);

    // Limiter à 3 propositions maximum
    const propositions = activite.propositions.slice(0, 3);

    const handlePropositionClick = (proposition) => {
        if (selectedProposition) return;
        setSelectedProposition(proposition);
    };

    const handleReset = () => {
        setSelectedProposition(null);
    };

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 to-orange-50 overflow-hidden">
            {/* En-tête compact */}
            <header className="bg-primary text-white py-3 shadow-lg flex-shrink-0">
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

            {/* Contenu principal - flex pour remplir l'espace restant */}
            <main className="flex-1 container mx-auto px-6 py-4 flex flex-col min-h-0">
                {/* Info auteur + consigne en une ligne compacte */}
                <div className="flex-shrink-0 mb-3">
                    <div className="bg-white rounded-xl shadow-md p-3 border-l-4 border-primary">
                        <div className="flex items-center justify-between gap-4">
                            {/* Auteur à gauche */}
                            {auteur && (
                                <div className="flex items-center gap-3">
                                    {auteur.photo && (
                                        <img
                                            src={auteur.photo}
                                            alt={auteur.nom}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                                            onError={(e) => {
                                                e.target.style.display = "none";
                                            }}
                                        />
                                    )}
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800">
                                            {auteur.nom}
                                        </h2>
                                        {auteur.voteCE2 && (
                                            <span className="text-xs bg-accent text-white px-2 py-1 rounded font-semibold">
                                                Vote CE2
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Consigne à droite */}
                            <div className="flex-1 text-right">
                                <p className="text-xl font-bold text-accent">
                                    📖 {activite.consigneEleves}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Zone centrale : Image + Propositions */}
                <div className="flex-1 flex gap-4 min-h-0">
                    {/* Image principale - 60% de la largeur */}
                    <div className="w-3/5 flex flex-col">
                        <div className="flex-1 bg-white rounded-xl shadow-xl overflow-hidden border-4 border-gray-200 flex items-center justify-center">
                            <img
                                src={activite.image}
                                alt="Image du quiz"
                                className="max-w-full max-h-full object-contain"
                                onError={(e) => {
                                    e.target.src =
                                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="800" height="600" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" font-size="24" text-anchor="middle" fill="%239ca3af"%3EImage non disponible%3C/text%3E%3C/svg%3E';
                                }}
                            />
                        </div>
                    </div>

                    {/* Propositions - 40% de la largeur, empilées verticalement */}
                    <div className="w-2/5 flex flex-col gap-3">
                        {propositions.map((proposition) => (
                            <PropositionQuiz
                                key={proposition.id}
                                proposition={proposition}
                                isSelected={
                                    selectedProposition?.id === proposition.id
                                }
                                isAnswered={!!selectedProposition}
                                onClick={() =>
                                    handlePropositionClick(proposition)
                                }
                                isCompact={true}
                            />
                        ))}
                    </div>
                </div>

                {/* Feedback après réponse - compact en bas */}
                {selectedProposition && (
                    <div className="flex-shrink-0 mt-3">
                        <div
                            className={`
                rounded-xl p-4 shadow-lg border-2 flex items-center justify-between
                ${
                    selectedProposition.correct
                        ? "bg-green-50 border-success"
                        : "bg-orange-50 border-accent"
                }
              `}
                        >
                            {/* Icône + Message */}
                            <div className="flex items-center gap-4 flex-1">
                                <div
                                    className={`
                    w-14 h-14 rounded-full flex items-center justify-center text-3xl flex-shrink-0
                    ${selectedProposition.correct ? "bg-success" : "bg-accent"}
                  `}
                                >
                                    {selectedProposition.correct ? "🎉" : "🤔"}
                                </div>
                                <div className="flex-1">
                                    <h3
                                        className={`
                      text-xl font-bold mb-1
                      ${selectedProposition.correct ? "text-green-800" : "text-orange-800"}
                    `}
                                    >
                                        {selectedProposition.correct
                                            ? "Bravo !"
                                            : "Pas tout à fait..."}
                                    </h3>
                                    <p className="text-base text-gray-700 leading-snug">
                                        {selectedProposition.commentaire}
                                    </p>
                                </div>
                            </div>

                            {/* Bouton recommencer */}
                            <button
                                onClick={handleReset}
                                className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-lg transition-colors shadow-md flex-shrink-0 ml-4"
                            >
                                🔄 Réessayer
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

QuizVisuel.propTypes = {
    activite: PropTypes.shape({
        titre: PropTypes.string.isRequired,
        consigneEnseignant: PropTypes.string.isRequired,
        consigneEleves: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        propositions: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                texte: PropTypes.string.isRequired,
                image: PropTypes.string,
                correct: PropTypes.bool.isRequired,
                commentaire: PropTypes.string.isRequired,
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

export default QuizVisuel;
