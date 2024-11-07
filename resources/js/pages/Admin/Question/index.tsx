import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import Sorting from "@/components/Sorting";
import AuthenticatedLayout from "@/layouts/Authenticated";
import SimpleTabs from "@/components/SimpleTabs";
import { PageProps } from "@/types";
import { QuestionType } from "@/features/Question";

const types = [
    {
        title: "Semua Pertanyaan",
        value: "all-questions",
    },
    {
        title: "Pertanyaan Aktif",
        value: "active-question",
    },
    {
        title: "Pertanyaan Tidak Aktif",
        value: "inactive-question",
    },
];

export default function Question({ questions }: PageProps & { questions: QuestionType[] }) {
    const [type, setType] = useState<string>("all-questions");
    const [activeQuestions, setActiveQuestions] = useState<QuestionType[]>([])
    const [inactiveQuestions, setInactiveQuestions] = useState<QuestionType[]>([])

    useEffect(() => {
        setActiveQuestions(questions.filter((item) => item.is_active))
        setInactiveQuestions(questions.filter((item) => !item.is_active))
    }, []);

    const questionsByType = () => {
        switch (type) {
            case "active-question":
                return activeQuestions
            case "inactive-question":
                return inactiveQuestions
            default:
                return questions
        }
    }

    return (
        <AuthenticatedLayout title="Pertanyaan">
            <div className="flex mb-6 md:mb-5 md:block">
                <SimpleTabs
                    className="mr-auto md:ml-0"
                    classButton="md:ml-0 md:flex-1"
                    items={types}
                    value={type}
                    setValue={setType}
                />
            </div>
            <table className="table-custom ">
                <thead>
                    <tr>
                        <th className="th-custom">
                            <Sorting title="Soal Nomor" />
                        </th>
                        <th className="th-custom ">
                            <Sorting title="Pertanyaan" />
                        </th>
                        <th className="th-custom">
                            <Sorting title="Jumlah Opsi Jawaban" />
                        </th>
                        <th className="th-custom text-right"></th>
                    </tr>
                </thead>
                <tbody>
                    {questionsByType().length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center font-bold">
                                Pertanyaan tidak ada!
                            </td>
                        </tr>
                    )}
                    {questionsByType().map((item, index) => (
                        <tr className="" key={index}>
                            <td className="td-custom text-center">
                                {item.position}
                            </td>
                            <td className="td-custom">
                                {item.question}
                            </td>
                            <td className="td-custom text-center">{item.number_of_answers ?? 5}</td>
                            <td className="td-custom text-right">
                                <button className="btn-transparent-dark btn-small btn-square">
                                    <Icon name="dots" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AuthenticatedLayout >
    );
};
