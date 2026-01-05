import React from "react";
import PropTypes from "prop-types";

/**
 * Composant affichant le feedback après avoir répondu au quiz
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.proposition - Proposition sélectionnée
 * @param {Function} props.onReset - Callback pour réinitialiser le quiz
 * @returns {JSX.Element} Composant FeedbackQuiz
 */
function FeedbackQuiz({ proposition, onReset }) {
    const isCorrect = proposition.correct;

    return (
        <div
            className={`
        rounded-2xl p-8 shadow-2xl border-4 mb-8
        animate-[slideInUp_0.5s_ease-out]
        ${
            isCorrect
                ? "bg-green-50 border-success"
                : "bg-orange-50 border-accent"
        }
      `}
        >
            <div className="flex items-start gap-6">
                {/* Icône */}
                <div className="flex-shrink-0">
                    <div
                        className={`
              w-20 h-20 rounded-full flex items-center justify-center text-5xl
              ${isCorrect ? "bg-success" : "bg-accent"}
            `}
                    >
                        {isCorrect ? "🎉" : "🤔"}
                    </div>
                </div>

                {/* Contenu du feedback */}
                <div className="flex-1">
                    <h3
                        className={`
              text-4xl font-bold mb-4
              ${isCorrect ? "text-green-800" : "text-orange-800"}
            `}
                    >
                        {isCorrect ? "Bravo !" : "Pas tout à fait..."}
                    </h3>

                    <p className="text-2xl text-gray-700 leading-relaxed">
                        {proposition.commentaire}
                    </p>
                </div>
            </div>

            {/* Bouton pour recommencer */}
            <div className="mt-6 text-center">
                <button
                    onClick={onReset}
                    className="bg-primary hover:bg-primary-dark text-white font-bold text-xl px-8 py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
                >
                    🔄 Réessayer
                </button>
            </div>
        </div>
    );
}

FeedbackQuiz.propTypes = {
    proposition: PropTypes.shape({
        correct: PropTypes.bool.isRequired,
        commentaire: PropTypes.string.isRequired,
    }).isRequired,
    onReset: PropTypes.func.isRequired,
};

export default FeedbackQuiz;
