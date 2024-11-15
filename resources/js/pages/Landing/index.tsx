import { QuestionType } from '@/features/Question';
import { RespondentDto } from '@/features/Respondent';
import { PageProps } from '@/types';
import { FormEventHandler, useEffect, useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import Button from '@/components/Button';
import { ResponseDto } from '@/features/Response';
import './styles.css';
import { Head, router } from '@inertiajs/react';
import { useToast } from '@/components/Toast';
import axios from 'axios';
import OptionAnswer from './Components/OptionAnswer';
import Textarea from '@/components/Textarea';

const fasIcons = {
    'text-red-500 ': 'Frown',
    'text-yellow-500 ': 'Meh',
    'text-blue-500 ': 'Smile',
    'text-purple-500 ': 'Laugh'
};

const defaultRespondent: RespondentDto = {
    name: 'Admin',
    age: 0,
    gender: '',
    education: '',
    jobs: '',
    type_of_service: '',
    suggestion: ''
}

type StaticData = {
    ages: Record<string, string>,
    educations: Record<string, string>,
    jobs: Record<string, string>,
    services: Record<string, string>,
}

export default function UserSatisfactionSurvey({ questions, ...props }: PageProps & { questions: QuestionType[] }) {
    const [isBoarding, setIsBoarding] = useState(true)
    const [currentStep, setCurrentStep] = useState(0);
    const [respondentData, setRespondentData] = useState<RespondentDto>(defaultRespondent);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [sortedQuestions, setSortedQuestions] = useState<QuestionType[]>([]);
    const [responseData, setResponseData] = useState<ResponseDto[]>([]);
    const { toast, ToastContainer } = useToast()
    const [staticData, setStaticData] = useState<StaticData>()

    useEffect(() => {
        const fetchStaticData = async () => {
            const { data } = await axios.get(route('api.static_data'));
            setStaticData(data)
        }
        fetchStaticData()
    }, [])

    useEffect(() => {
        const activeSortedQuestions = questions
            .filter((question) => question.is_active)
            .sort((a, b) => a.position - b.position);
        setSortedQuestions(activeSortedQuestions);
    }, [questions]);


    const handleNextStep = () => setCurrentStep(prev => Math.min(prev + 1, sortedQuestions.length - 1 + 6));

    const handleNextQuestion = () => setCurrentQuestion((prev) => Math.min(prev + 1, sortedQuestions.length - 1));

    const deteminatorRespondentData = (): {
        title: string;
        data?: Record<string, string>;
        onClick: (value: string) => void;
    } => {
        switch (currentStep) {
            case 1:
                return {
                    title: "Silahkan Pilih Jenis Kelamin",
                    data: {
                        'Pria': 'CircleArrowDown',
                        'Wanita': 'CircleArrowOutUpRight'
                    },
                    onClick: (value: string) => setRespondentData({ ...respondentData, gender: value })
                }
            case 2:
                return {
                    title: "Silahkan Pilih Usia",
                    data: staticData?.ages,
                    onClick: (value: string) => setRespondentData({ ...respondentData, age: parseInt(value) })
                }

            case 3:
                return {
                    title: "Silahkan Pilih Pendidikan",
                    data: staticData?.educations,
                    onClick: (value: string) => setRespondentData({ ...respondentData, education: value })
                }

            case 4:
                return {
                    title: "Silahkan Pilih Jenis Layanan",
                    data: staticData?.services,
                    onClick: (value: string) => setRespondentData({ ...respondentData, type_of_service: value })
                }

            default:
                return {
                    title: 'Silahkan Pilih Jenis Profesi Anda',
                    data: staticData?.jobs,
                    onClick: (value: string) => setRespondentData({ ...respondentData, jobs: value })
                }
        }

    }

    const handleSelectAnswer = (answer: number) => {
        const updatedResponses = responseData.filter((response) => response.question_id !== sortedQuestions[currentQuestion].id);
        setResponseData([...updatedResponses, { question_id: sortedQuestions[currentQuestion].id, answer: answer.toString() }]);
        handleNextStep()
        handleNextQuestion()
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        router.post(route('landing.submit'), {
            ...respondentData,
            response: responseData.map((response) => ({ question_id: response.question_id, answer: response.answer }))
        }, {
            onError: (e) => {
                console.log(e)
                toast(
                    'Gagal Menyimpan',
                    'Ada beberapa input yang belum sesuai!'
                )
            },
            onSuccess: () => {
                toast('Sukses Menyimpan', 'Terima kasih sudah mau meluangkan waktunya!')
                handleReset()
            }
        })
    }

    const handleReset = () => {
        setIsBoarding(true)
        setCurrentStep(0)
        setCurrentQuestion(0)
        setRespondentData(defaultRespondent)
        setResponseData([])
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-grid font-sans">

            <Head title={props.appName} />

            {isBoarding ? (
                <div className="bg-blue-100 border-4 border-black p-10 text-center max-w-lg mx-auto">
                    <h1 className="text-4xl font-extrabold mb-4 text-black tracking-wide">{props.appName}</h1>
                    <p className="text-md mb-8 text-black font-base">Kami mendengarkan setiap masukan dengan seksama, memahami kebutuhan Anda, dan berkomitmen untuk terus meningkatkan kualitas layanan kami demi kepuasan Anda.</p>
                    <center>
                        <Button onClick={() => setIsBoarding(false)}>Mulai Survey</Button>
                    </center>
                </div>
            ) : (
                <div className="max-w-[70rem] rounded-base w-full">
                    <div className="max-w-full min-h-[30rem] overflow-y-auto rounded-b-base border-2 border-border bg-white p-5 font-base ">
                        <ProgressBar
                            currentValue={currentStep + 1}
                            maxValue={sortedQuestions.length + 6}
                            rounded="full"
                            color='cyan'
                            showStep={true}
                            showPercentage={false}
                        />
                        {
                            currentStep < 5
                                ?
                                <div className="w-full p-10 flex flex-col justify-center items-center m-auto">
                                    <h2 className="text-xl font-bold mb-10 text-black uppercase tracking-wide text-center">{deteminatorRespondentData().title}</h2>
                                    <div className='flex justify-center m-auto flex-wrap w-full gap-10'>
                                        {deteminatorRespondentData().data && Object.entries(deteminatorRespondentData().data!).map(([name, icon], index) => (
                                            <OptionAnswer
                                                key={index}
                                                name={name}
                                                icon={icon}
                                                onClick={() => {
                                                    deteminatorRespondentData().onClick(name)
                                                    handleNextStep()
                                                }}

                                            />
                                        ))}
                                    </div>
                                </div>
                                : currentStep == sortedQuestions.length + 5
                                    ?
                                    <div className="w-full p-10 flex flex-col justify-center items-center m-auto">
                                        <h2 className="text-xl font-bold mb-10 text-black uppercase tracking-wide text-center">Untuk perbaikan pelayanan kami, silahkan sampaikan saran/keluhan anda di sini:</h2>
                                        <div className='flex justify-center m-auto flex-wrap w-full gap-10'>
                                            <Textarea
                                                value={respondentData.suggestion ?? ''}
                                                setValue={(e) => setRespondentData({ ...respondentData, suggestion: e.target.value })}
                                                placeholder='Masukan Saran'
                                            />
                                            <Button
                                                className="px-10"
                                                onClick={handleSubmit}
                                            >Simpan</Button>
                                        </div>
                                    </div>
                                    :
                                    <div className="w-full p-10">
                                        <h2 className="text-xl font-bold mb-10 text-black uppercase tracking-wide text-center">
                                            {sortedQuestions[currentQuestion].question}
                                        </h2>
                                        <div className="flex justify-center m-auto w-full gap-5">
                                            {Object.entries(fasIcons).map(([, icon], index) => {
                                                const currentQuestionData = questions[currentQuestion];
                                                const customAnswers: string[] = currentQuestionData?.custom_answers
                                                    ? JSON.parse(currentQuestionData.custom_answers)
                                                    : []

                                                return (
                                                    <OptionAnswer
                                                        key={index}
                                                        name={customAnswers[index]}
                                                        icon={icon}
                                                        onClick={() => handleSelectAnswer(index + 1)}

                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                        }
                    </div>
                </div>
            )}

            {ToastContainer}
        </div>
    );
}
