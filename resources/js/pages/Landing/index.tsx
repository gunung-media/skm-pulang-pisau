import { QuestionType } from '@/features/Question';
import { RespondentDto, RespondentType } from '@/features/Respondent';
import { PageProps } from '@/types';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrown, faFaceGrin, faFaceGrinStars, faFaceMeh, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

export default function UserSatisfactionSurvey({ questions }: PageProps & { questions: QuestionType[] }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [respondentData, setRespondentData] = useState<RespondentDto>({
        name: '',
        gender: '',
        education: '',
        jobs: '',
    });
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [sortedQuestions, setSortedQuestions] = useState<QuestionType[]>([]);

    const fasIcons = {
        'text-red-500': faFaceFrown,
        'text-yellow-500': faFaceMeh,
        'text-green-500': faFaceSmile,
        'text-blue-500': faFaceGrin,
        'text-purple-500': faFaceGrinStars
    }

    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 3));
    };

    const handleNextQuestion = () => {
        setCurrentQuestion((prev) => (prev < sortedQuestions.length - 1 ? prev + 1 : prev));
    };

    useEffect(() => {
        const activeSortedQuestions = questions
            .filter((question) => question.is_active)
            .sort((a, b) => a.position - b.position);
        setSortedQuestions(activeSortedQuestions);
    }, [questions]);

    const handleRespondentDataChange = (field: keyof RespondentDto, value: string) => {
        setRespondentData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans">
            {currentStep === 0 && (
                <div className="bg-blue-100 border-4 border-black p-10 text-center max-w-lg mx-auto">
                    <h1 className="text-4xl font-extrabold mb-4 text-black tracking-wide">
                        Welcome to Our Survey!
                    </h1>
                    <p className="text-lg mb-8 text-black font-semibold">
                        We value your feedback. Please help us improve!
                    </p>
                    <button
                        onClick={handleNext}
                        className="bg-blue-600 text-white px-6 py-3 rounded-none border-2 border-black hover:bg-blue-800 active:translate-y-1 transition"
                    >
                        Start Survey
                    </button>
                </div>
            )}

            {currentStep === 1 && (
                <div className="bg-green-100 border-4 border-black p-10 text-center max-w-lg mx-auto mt-10">
                    <h2 className="text-3xl font-bold mb-6 text-black uppercase tracking-wide">
                        Tell Us About Yourself
                    </h2>
                    <form className="w-full max-w-md space-y-4">
                        {["name", "gender", "education", "jobs"].map((field) => (
                            <div key={field} className="flex flex-col text-left">
                                <label className="text-black font-bold mb-1 uppercase text-sm tracking-wider">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <input
                                    type="text"
                                    placeholder={`Your ${field}`}
                                    value={respondentData[field as keyof RespondentDto]}
                                    onChange={(e) =>
                                        handleRespondentDataChange(field as keyof RespondentDto, e.target.value)
                                    }
                                    className="border-2 border-black bg-white p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-700"
                                />
                            </div>
                        ))}
                        <button
                            onClick={handleNext}
                            type="button"
                            className="bg-green-600 text-white px-6 py-3 rounded-none border-2 border-black hover:bg-green-800 active:translate-y-1 transition w-full"
                        >
                            Next
                        </button>
                    </form>
                </div>
            )}

            {currentStep === 2 && sortedQuestions.length > 0 && (
                <div className="bg-yellow-100 border-4 border-black p-10 text-center max-w-lg mx-auto mt-10">
                    <h2 className="text-3xl font-bold mb-6 text-black uppercase tracking-wide">
                        {sortedQuestions[currentQuestion].question}
                    </h2>
                    <div className="flex justify-between mb-8">
                        {Object.entries(fasIcons).map(([color, icon], index) => (
                            <FontAwesomeIcon
                                key={index}
                                icon={icon}
                                onClick={handleNextQuestion}
                                size="4x"
                                className={`${color} cursor-pointer hover:scale-105 transition duration-150 transform hover:text-${color.split('-')[0]}-800`}
                                style={{
                                    color: color.replace('-500', '-600'),
                                    filter: "drop-shadow(2px 2px 0px #000)"
                                }}
                            />
                        ))}
                    </div>
                    <p className="text-black font-semibold">Question {currentQuestion + 1} of {sortedQuestions.length}</p>
                </div>
            )}
        </div>
    );
}
