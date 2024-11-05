import { QuestionType } from '@/features/Question';
import { RespondentDto } from '@/features/Respondent';
import { PageProps } from '@/types';
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { faFaceFrown, faFaceGrin, faFaceGrinStars, faFaceMeh, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import Tabs from '@/components/Tabs';
import ProgressBar from '@/components/ProgressBar';
import Button from '@/components/Button';
import { Icon } from '@/components/FontAwesomeIcon';
import Input from '@/components/Input';
import { RadioGroup } from '@/components/RadioGroup';
import { Combobox } from '@/components/Combobox';
import { Form } from '@/components/Form';
import { ResponseDto } from '@/features/Response';
import './styles.css';
import { Head, router, usePage } from '@inertiajs/react';
import { useToast } from '@/components/Toast';

enum TabEnum {
    PERSONAL = 'Data Diri',
    SURVEY = 'Survey'
}

const fasIcons = {
    'text-red-500 hover:text-red-700': faFaceFrown,
    'text-yellow-500 hover:text-yellow-700': faFaceMeh,
    'text-green-500 hover:text-green-700': faFaceSmile,
    'text-blue-500 hover:text-blue-700': faFaceGrin,
    'text-purple-500 hover:text-purple-700': faFaceGrinStars
};

const defaultRespondent: RespondentDto = {
    name: '',
    age: 0,
    gender: '',
    education: '',
    jobs: ''
}

export default function UserSatisfactionSurvey({ questions }: PageProps & { questions: QuestionType[] }) {
    const { errors } = usePage<PageProps>().props
    const [currentStep, setCurrentStep] = useState(0);
    const [activeTab, setActiveTab] = useState(TabEnum.PERSONAL);
    const [respondentData, setRespondentData] = useState<RespondentDto>(defaultRespondent);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [sortedQuestions, setSortedQuestions] = useState<QuestionType[]>([]);
    const [responseData, setResponseData] = useState<ResponseDto[]>([]);
    const { toast, ToastContainer } = useToast()

    useEffect(() => {
        const activeSortedQuestions = questions
            .filter((question) => question.is_active)
            .sort((a, b) => a.position - b.position);
        setSortedQuestions(activeSortedQuestions);
    }, [questions]);

    const handleNextStep = () => setCurrentStep(prev => prev + 1);

    const handleNextQuestion = () => setCurrentQuestion((prev) => Math.min(prev + 1, sortedQuestions.length - 1));

    const handlePreviousQuestion = () => setCurrentQuestion((prev) => Math.max(prev - 1, 0));

    const handleRespondentDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRespondentData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectAnswer = (answer: number) => {
        const updatedResponses = responseData.filter((response) => response.question_id !== sortedQuestions[currentQuestion].id);
        setResponseData([...updatedResponses, { question_id: sortedQuestions[currentQuestion].id, answer: answer.toString() }]);
        handleNextQuestion();
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        router.post(route('landing.submit'), {
            ...respondentData,
            response: responseData.map((response) => ({ question_id: response.question_id, answer: response.answer }))
        }, {
            onError: (error) => {
                const formatError = error ? Object.entries(error).map(([errorField, desc]) => (`${errorField}: ${desc}`)).join('</br>') : undefined
                toast(
                    'Gagal Menyimpan',
                    formatError
                )
            },
            onSuccess: (newProps) => {
                toast('Sukses Menyimpan', 'Terima kasih sudah mau meluangkan waktunya!')
                handleReset()
            }
        })
    }

    const handleReset = () => {
        setCurrentStep(0)
        setActiveTab(TabEnum.PERSONAL)
        setRespondentData(defaultRespondent)
        setResponseData([])
    }

    const renderPersonal = () => (
        <div className="w-full mt-5 ">
            <h2 className="text-3xl font-heading tracking-wide">Lengkapi Data Diri Anda!</h2>
            <p className="text-base font-base tracking-wide">Mari Berkenalan! Isi Data Diri Anda untuk Membantu Kami Lebih Baik Lagi</p>
            <Form label="Nama Lengkap" error={errors.name}>
                <Input
                    name="name"
                    value={respondentData.name}
                    setValue={handleRespondentDataChange}
                    placeholder="Nama Anda"
                    className="w-full"
                />
            </Form>
            <div className="flex w-full gap-3">
                <Form label="Jenis Kelamin" className="w-1/2" error={errors.gender}>
                    <RadioGroup items={['Pria', 'Wanita']} onChange={(value) => setRespondentData({ ...respondentData, gender: value })} />
                </Form>
                <Form label="Umur" className="w-1/2" error={errors.age}>
                    <Input
                        name="age"
                        value={respondentData.age.toString()}
                        setValue={handleRespondentDataChange}
                        placeholder="Umur Anda"
                        className="w-full"
                    />
                </Form>
            </div>
            <div className="flex w-full gap-3">
                <Form label="Edukasi" className="w-full" error={errors.education}>
                    <Combobox name="Edukasi" items={['SD', 'SMP', 'SMA', 'Diploma', 'S1', 'S2', 'S3']} onChange={(value) => setRespondentData({ ...respondentData, education: value })} />
                </Form>
                <Form label="Pekerjaan" className="w-full" error={errors.jobs}>
                    <Combobox name="Pekerjaan" items={['PNS', 'Pegawai Swasta', 'Wiraswasta', 'Pelajar/Mahasiswa', 'Lainnya']} onChange={(value) => setRespondentData({ ...respondentData, jobs: value })} />
                </Form>
            </div>
            <Form label="Jenis Layanan yang diterima" error={errors.type_of_service}>
                <Input
                    name="type_of_service"
                    value={respondentData.type_of_service ?? ""}
                    setValue={handleRespondentDataChange}
                    placeholder="Jenis Layanan yang diterima"
                    className="w-full"
                />
            </Form>
        </div>
    );

    const renderSurvey = () => {
        const isNotSufficient = errors.response && responseData.length !== sortedQuestions.length
        return (
            <div className="flex flex-col justify-between">
                <div className="w-full">
                    <ProgressBar
                        maxValue={sortedQuestions.length}
                        currentValue={responseData.length}
                        rounded="full"
                        color={isNotSufficient ? 'red' : 'cyan'}
                    />
                    <div className='flex justify-between'>
                        <p className='text-red-500 font-semibold p-1'>{isNotSufficient ? "Isi semua pertanyaan!" : null}</p>
                        <p className="text-black font-semibold p-1 text-right">
                            Pertanyaan {currentQuestion + 1} dari {sortedQuestions.length}
                        </p>

                    </div>
                </div>
                <h2 className="text-3xl font-bold mb-6 text-black uppercase tracking-wide text-center">
                    {sortedQuestions[currentQuestion].question}
                </h2>
                <div className="flex justify-between mb-8">
                    {Object.entries(fasIcons).map(([color, icon], index) => (
                        <Icon
                            key={index}
                            icon={icon}
                            color={color}
                            isActive={!!responseData.find((response) => response.question_id === sortedQuestions[currentQuestion].id && response.answer === index.toString())}
                            onClick={() => handleSelectAnswer(index)}
                        />
                    ))}
                </div>
                <div className="w-full flex justify-between">
                    <Button onClick={handlePreviousQuestion}>Soal Sebelumnya</Button>
                    {currentQuestion === sortedQuestions.length - 1 ? (
                        <Button onClick={handleSubmit} className="bg-green-500">Simpan</Button>
                    ) : (
                        <Button onClick={handleNextQuestion}>Soal Berikutnya</Button>
                    )}
                </div>
            </div>
        )
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-grid font-sans">

            <Head title='Survey Kepuasan' />

            {currentStep === 0 ? (
                <div className="bg-blue-100 border-4 border-black p-10 text-center max-w-lg mx-auto">
                    <h1 className="text-4xl font-extrabold mb-4 text-black tracking-wide">FeedbackHub</h1>
                    <p className="text-lg mb-8 text-black font-semibold">Listen, Understand, Improve</p>
                    <center>
                        <Button onClick={handleNextStep}>Mulai Survey</Button>
                    </center>
                </div>
            ) : (
                <div className="max-w-[50rem] rounded-base w-full">
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabsArray={[TabEnum.PERSONAL, TabEnum.SURVEY]} />
                    <div className="max-w-full min-h-[40rem] overflow-y-auto rounded-b-base border-2 border-border bg-white p-5 font-base flex justify-center">
                        {activeTab === TabEnum.PERSONAL && renderPersonal()}
                        {activeTab === TabEnum.SURVEY && renderSurvey()}
                    </div>
                </div>
            )}

            {ToastContainer}
        </div>
    );
}
