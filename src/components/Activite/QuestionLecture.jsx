import React from "react";
import PropTypes from "prop-types";

/**
 * Composant représentant une question dans l'activité "Je lis une image"
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.question - Données de la question
 * @param {number} props.questionNumber - Numéro de la question (1, 2, 3...)
 * @param {number} props.totalQuestions - Nombre total de questions
 * @param {string} props.selectedOption - ID de l'option sélectionnée
 * @param {Function} props.onAnswer - Callback pour sélectionner une option
 * @param {boolean} props.hasAnswered - Indique si une réponse a été donnée
 * @returns {JSX.Element} Composant QuestionLecture
 */
function QuestionLecture({
    question,
    questionNumber,
    totalQuestions,
    selectedOption,
    onAnswer,
    hasAnswered,
}) {
    const getTypeIcon = (type) => {
        switch (type) {
            case "observation":
                return "👁️";
            case "comprehension":
                return "🧠";
            case "interpretation":
                return "💭";
            default:
                return "❓";
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case "observation":
                return "Observation";
            case "comprehension":
                return "Compréhension";
            case "interpretation":
                return "Interprétation";
            default:
                return "Question";
        }
    };

    return (
        <div className="flex-1 bg-white rounded-xl shadow-xl p-6 border-4 border-indigo-200 flex flex-col">
            {/* En-tête question */}
            <div className="flex-shrink-0 mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                        {getTypeIcon(question.type)}{" "}
                        {getTypeLabel(question.type)}
                    </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 leading-tight">
                    {question.texte}
                </h3>
            </div>

            {/* Options de réponse */}
            <div className="flex-1 overflow-y-auto space-y-3 min-h-0 pr-2">
                {question.options.map((option) => {
                    const isSelected = selectedOption === option.id;

                    return (
                        <button
                            key={option.id}
                            onClick={() =>
                                !hasAnswered && onAnswer(question.id, option.id)
                            }
                            disabled={hasAnswered}
                            className={`
                                w-full text-left p-4 rounded-xl border-3 transition-all
                                ${!hasAnswered ? "hover:shadow-lg hover:scale-102" : ""}
                                ${isSelected && !hasAnswered ? "border-indigo-600 bg-indigo-50" : ""}
                                ${isSelected && hasAnswered ? "border-indigo-600 bg-indigo-50 ring-4 ring-indigo-200" : ""}
                                ${!isSelected && hasAnswered ? "opacity-50 cursor-not-allowed" : ""}
                                ${!isSelected && !hasAnswered ? "border-gray-300 hover:border-indigo-300" : ""}
                            `}
                        >
                            <div className="flex items-start gap-3">
                                {/* Cercle de sélection */}
                                <div
                                    className={`
                                    flex-shrink-0 w-6 h-6 rounded-full border-2 mt-1
                                    flex items-center justify-center
                                    ${isSelected ? "border-indigo-600 bg-indigo-600" : "border-gray-400"}
                                `}
                                >
                                    {isSelected && (
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </div>

                                {/* Contenu */}
                                <div className="flex-1">
                                    {/* Image si présente */}
                                    {option.image && (
                                        <div className="mb-3">
                                            <img
                                                src={option.image}
                                                alt={option.texte}
                                                className="w-full h-32 object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.target.parentElement.style.display =
                                                        "none";
                                                }}
                                            />
                                        </div>
                                    )}

                                    {/* Texte */}
                                    <p
                                        className={`
                                        text-lg font-semibold
                                        ${isSelected ? "text-indigo-900" : "text-gray-700"}
                                    `}
                                    >
                                        {option.texte}
                                    </p>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Feedback après réponse */}
            {hasAnswered && (
                <div className="flex-shrink-0 mt-4 p-4 bg-blue-50 border-2 border-blue-300 rounded-xl animate-[slideInUp_0.5s_ease-out]">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 text-3xl">💡</div>
                        <div className="flex-1">
                            <p className="text-base text-gray-700 leading-relaxed">
                                {question.feedback}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

QuestionLecture.propTypes = {
    question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        texte: PropTypes.string.isRequired,
        type: PropTypes.oneOf([
            "observation",
            "comprehension",
            "interpretation",
        ]).isRequired,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                texte: PropTypes.string.isRequired,
                image: PropTypes.string,
            })
        ).isRequired,
        feedback: PropTypes.string.isRequired,
    }).isRequired,
    questionNumber: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    selectedOption: PropTypes.string,
    onAnswer: PropTypes.func.isRequired,
    hasAnswered: PropTypes.bool.isRequired,
};

export default QuestionLecture;
