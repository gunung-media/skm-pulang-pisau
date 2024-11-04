import { QuestionType } from '@/features/Question';
import { RespondentDto } from '@/features/Respondent';
import { PageProps } from '@/types';
import { ChangeEvent, useEffect, useState } from 'react';
import { faFaceFrown, faFaceGrin, faFaceGrinStars, faFaceMeh, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import Tabs from '@/components/Tabs';
import ProgressBar from '@/components/ProgressBar';
import Button from '@/components/Button';
import { Icon } from '@/components/Icon';
import Input from '@/components/Input';
import { RadioGroup } from '@/components/RadioGroup';
import { Combobox } from '@/components/Combobox';
import { Form } from '@/components/Form';
import "./styles.css"

enum TabEnum {
    personal = 'Data Diri',
    survey = 'Survey'
}

export default function UserSatisfactionSurvey({ questions }: PageProps & { questions: QuestionType[] }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [activeTab, setActiveTab] = useState(TabEnum.personal.toString())
    const tabsArray = [TabEnum.personal.toString(), TabEnum.survey.toString()]
    const [respondentData, setRespondentData] = useState<RespondentDto>({
        name: '',
        age: 0,
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

    const handlePreviousQuestion = () => {
        setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
    };

    useEffect(() => {
        const activeSortedQuestions = questions
            .filter((question) => question.is_active)
            .sort((a, b) => a.position - b.position);
        setSortedQuestions(activeSortedQuestions);
    }, [questions]);

    const handleRespondentDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRespondentData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const renderPersonal = () => {
        return (
            <div className="w-full">
                <div className='mt-5 mb-14'>
                    <h2 className="text-3xl font-heading tracking-wide">
                        Lengkapi Data Diri Anda!
                    </h2>
                    <h5 className="text-base font-base tracking-wide">Mari Berkenalan! Isi Data Diri Anda untuk Membantu Kami Lebih Baik Lagi</h5>
                </div>
                <form className="w-full">
                    <Form label="Nama Lengkap">
                        <Input
                            name='name'
                            value={respondentData.name}
                            setValue={handleRespondentDataChange}
                            placeholder='Nama Anda'
                            className="w-full"
                        />
                    </Form>

                    <div className='flex w-full gap-3'>
                        <Form label="Jenis Kelamin" className='w-1/2'>
                            <RadioGroup
                                items={['Pria', 'Wanita']}
                                onChange={(value) => setRespondentData({ ...respondentData, gender: value })}
                            />
                        </Form>
                        <Form label="Umur" className='w-1/2'>
                            <Input
                                name='age'
                                value={respondentData.age.toString()}
                                setValue={handleRespondentDataChange}
                                placeholder='Umur Anda'
                                className="w-full"
                            />
                        </Form>
                    </div>

                    <div className='flex w-full gap-3'>
                        <Form label="Edukasi" className='w-full'>
                            <Combobox
                                name='Edukasi'
                                items={['SD', 'SMP', 'SMA', 'Diploma', 'S1', 'S2', 'S3']}
                                onChange={(value) => setRespondentData({ ...respondentData, education: value })}
                            />
                        </Form>
                        <Form label="Pekerjaan" className='w-full'>
                            <Combobox
                                name="Pekerjaan"
                                items={['PNS', 'Pegawai Swasta', 'Wiraswasta', 'Pelajar/Mahasiswa', 'Lainnya']}
                                onChange={(value) => setRespondentData({ ...respondentData, jobs: value })}
                            />
                        </Form>
                    </div>

                    <Form label="Jenis Layanan yang diterima">
                        <Input
                            name='type_of_service'
                            value={respondentData.type_of_service ?? ""}
                            setValue={handleRespondentDataChange}
                            placeholder='Jenis Layanan yang diterima'
                            className="w-full"
                        />
                    </Form>
                </form>
            </div>
        )
    }

    const renderSurvey = () => {
        return (
            <div>
                <div className='w-full'>
                    <ProgressBar
                        maxValue={sortedQuestions.length - 1}
                        currentValue={currentQuestion}
                        rounded='full'
                    />
                    <p className="text-black font-semibold p-1 text-right">Question {currentQuestion + 1} of {sortedQuestions.length}</p>
                </div>

                <div className='my-20'>
                    <h2 className="text-3xl font-bold mb-6 text-black uppercase tracking-wide">
                        {sortedQuestions[currentQuestion].question}
                    </h2>
                    <div className="flex justify-between mb-8">
                        {Object.entries(fasIcons).map(([color, icon], index) => (
                            <Icon
                                key={index}
                                icon={icon}
                                color={color}
                                onClick={handleNextQuestion}
                            />
                        ))}
                    </div>
                </div>

                <div className='w-full flex justify-between'>
                    <Button onClick={handlePreviousQuestion} >
                        Soal Sebelumnya
                    </Button>
                    <Button onClick={handleNextQuestion}>
                        Soal Berikutnya
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-grid font-sans">
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
                <div className="max-w-[50rem] rounded-base w-full">
                    <Tabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        tabsArray={tabsArray}
                    />
                    <div className="max-w-full rounded-b-base border-2 border-border bg-white p-5 font-base flex justify-center">
                        {activeTab === TabEnum.personal.toString() && renderPersonal()}
                        {activeTab === TabEnum.survey.toString() && renderSurvey()}
                    </div>
                </div>
            )}
        </div>
    );
}
