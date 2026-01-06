import React, { useState } from "react";
import PropTypes from "prop-types";
import QuestionLecture from "./QuestionLecture";
import PhotoAuteur from "./PhotoAuteur";
import AideEnseignant from "./AideEnseignant";

/**
 * Composant "Je lis une image" - Analyse progressive d'une illustration
 * L'élève répond à 2-3 questions successives (observation → compréhension → interprétation)
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.activite - Données de l'activité
 * @param {Object} props.auteur - Informations sur l'auteur/illustrateur
 * @param {Function} props.onRetour - Callback pour retourner à l'accueil
 * @returns {JSX.Element} Composant LectureImage
 */
function LectureImage({ activite, auteur, onRetour }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showHelp, setShowHelp] = useState(false);

    const currentQuestion = activite.questions[currentQuestionIndex];
    const isLastQuestion =
        currentQuestionIndex === activite.questions.length - 1;
    const hasAnsweredCurrent = answers[currentQuestionIndex] !== undefined;

    const handleAnswer = (questionId, optionId) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = optionId;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (!isLastQuestion) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handleReset = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
    };

    const progressPercent =
        ((currentQuestionIndex + 1) / activite.questions.length) * 100;

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-50 overflow-hidden">
            {/* En-tête compact */}
            <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 shadow-lg flex-shrink-0">
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

            {/* Contenu principal */}
            <main className="flex-1 container mx-auto px-6 py-4 flex flex-col min-h-0">
                {/* Barre de progression */}
                <div className="flex-shrink-0 mb-4">
                    <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-indigo-600">
                        <div className="flex items-center justify-between mb-2">
                            {/* Auteur */}
                            {auteur && (
                                <div className="flex items-center gap-3">
                                    <PhotoAuteur
                                        photo={auteur.photo}
                                        nom={auteur.nom}
                                        source={auteur.source}
                                        size="small"
                                        borderColor="border-indigo-600"
                                        iconColor="text-indigo-600"
                                    />
                                    <div>
                                        <span className="text-lg font-bold text-gray-800">
                                            {auteur.nom}
                                        </span>
                                        {auteur.voteCE2 && (
                                            <span className="ml-2 text-xs bg-accent text-white px-2 py-1 rounded font-semibold">
                                                Vote CE2
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Progression */}
                            <div className="text-right">
                                <p className="text-sm text-gray-600 mb-1">
                                    Question {currentQuestionIndex + 1} sur{" "}
                                    {activite.questions.length}
                                </p>
                                <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-600 to-blue-600 transition-all duration-500"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Consigne élève */}
                        <p className="text-lg font-bold text-indigo-600">
                            📖 {activite.consigneEleves}
                        </p>
                    </div>
                </div>

                {/* Zone image + question */}
                <div className="flex-1 flex gap-4 min-h-0">
                    {/* Image principale - 60% */}
                    <div className="w-3/5 flex flex-col">
                        <div className="flex-1 bg-white rounded-xl shadow-xl overflow-hidden border-4 border-indigo-200 flex items-center justify-center">
                            <img
                                src={activite.image}
                                alt="Illustration à analyser"
                                className="max-w-full max-h-full object-contain"
                                onError={(e) => {
                                    e.target.src =
                                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="800" height="600" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" font-size="24" text-anchor="middle" fill="%239ca3af"%3EImage non disponible%3C/text%3E%3C/svg%3E';
                                }}
                            />
                        </div>
                    </div>

                    {/* Question courante - 40% */}
                    <div className="w-2/5 flex flex-col">
                        <QuestionLecture
                            question={currentQuestion}
                            questionNumber={currentQuestionIndex + 1}
                            totalQuestions={activite.questions.length}
                            selectedOption={answers[currentQuestionIndex]}
                            onAnswer={handleAnswer}
                            hasAnswered={hasAnsweredCurrent}
                        />

                        {/* Boutons navigation */}
                        <div className="flex-shrink-0 mt-4 flex gap-3">
                            {!isLastQuestion && hasAnsweredCurrent && (
                                <button
                                    onClick={handleNext}
                                    className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-xl px-6 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                                >
                                    Question suivante →
                                </button>
                            )}

                            {isLastQuestion && hasAnsweredCurrent && (
                                <button
                                    onClick={handleReset}
                                    className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold text-xl px-6 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                                >
                                    🔄 Recommencer
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

LectureImage.propTypes = {
    activite: PropTypes.shape({
        titre: PropTypes.string.isRequired,
        consigneEnseignant: PropTypes.string.isRequired,
        consigneEleves: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        questions: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                texte: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                options: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.string.isRequired,
                        texte: PropTypes.string.isRequired,
                        image: PropTypes.string,
                    })
                ).isRequired,
                feedback: PropTypes.string.isRequired,
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
        photo: PropTypes.string,
        source: PropTypes.string,
        voteCE2: PropTypes.bool,
    }),
    onRetour: PropTypes.func.isRequired,
};

export default LectureImage;
