import Field from "@/components/Field";
import { useToast } from "@/components/Toast";
import ToggleSwitch from "@/components/ToggleSwitch";
import { QuestionDto, QuestionType } from "@/features/Question";
import AuthenticatedLayout from "@/layouts/Authenticated";
import { PageProps } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

export default function Form({ question }: PageProps & { question?: QuestionType }) {
    const { data: dto, setData, post } = useForm<QuestionDto>({
        question: "",
        number_of_answers: 4,
        is_active: true,
        custom_answers: ["", "", "", ""]
    })
    const [isEditing, setIsEditing] = useState(false);
    const { toast, ToastContainer } = useToast()

    useEffect(() => {
        if (question) {
            setIsEditing(true)
            setData(() => ({
                question: question.question,
                position: question.position,
                is_active: question.is_active,
                number_of_answers: question.number_of_answers,
                custom_answers: JSON.parse(question.custom_answers ?? "[]")
            }))
        }
    }, [question])

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        if (!isEditing) return handleCreate(e)

        router.post(route('admin.question.update', question!.id), { _method: 'put', ...dto }, {
            onSuccess: () => {
                toast("Pertanyaan diperbarui")
                setTimeout(() => router.visit(route('admin.question.index')), 1000)
            },
            onError: (error) => {
                toast("Gagal menyimpan pertanyaan", error.toString())
            }
        })

    }

    const handleCreate: FormEventHandler = () => {
        post(route('admin.question.store'), {
            onError: (error) => {
                console.error(error)
                toast("Gagal menyimpan pertanyaan", error.toString())
            },
            onSuccess: () => {
                toast("Pertanyaan ditambahkan")
                setTimeout(() => router.visit(route('admin.question.index')), 1000)
            }
        })
    }

    const handleCancel: FormEventHandler = (e) => {
        e.preventDefault()
        router.visit(route('admin.question.index'))
    }

    return (
        <AuthenticatedLayout title={isEditing ? "Edit Pertanyaan" : "Buat Pertanyaan"} back={route('admin.question.index')}>
            <form
                className="max-w-[50.625rem] w-full mx-auto py-4"
                action=""
                onSubmit={handleSubmit}
            >
                <div className="flex justify-between gap-5">
                    <div className="w-full">
                        <div className="flex items-center text-h4">
                            <div className="flex-grow border-t border-black"></div>
                            <span className="mx-4">Pertanyaan</span>
                            <div className="flex-grow border-t border-black"></div>
                        </div>
                        <Field
                            className="mb-5"
                            label="Pertanyaan"
                            placeholder="Masukan pertanyaan..."
                            value={dto?.question}
                            onChange={(e: any) => setData('question', e.target.value)}
                            required
                        />
                        <Field
                            className="mb-5"
                            label="Jumlah Pertanyaan"
                            placeholder="Masukan jumlah pertanyaan..."
                            value={dto?.number_of_answers?.toString() ?? "4"}
                            type="number"
                            onChange={(e: any) => setData('position', e.target.value)}
                            disabled
                        />

                        <ToggleSwitch
                            label="Apakah tampil?"
                            isToggled={dto?.is_active ?? true}
                            setIsToggled={(e) => setData('is_active', e)}
                        />
                    </div>
                    <div className="w-full">
                        <div className="flex items-center text-h4">
                            <div className="flex-grow border-t border-black"></div>
                            <span className="mx-4">Pilihan</span>
                            <div className="flex-grow border-t border-black"></div>
                        </div>

                        <div className="px-3">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Field
                                    className="mb-5"
                                    label={`Pilihan Jawaban ${index + 1}`}
                                    placeholder={`Bobot ${index + 1}`}
                                    value={dto.custom_answers?.[index] ?? ""}
                                    onChange={(e: any) => setData((prev) => ({
                                        ...prev, custom_answers: [...prev.custom_answers.slice(0, index), e.target.value, ...prev.custom_answers.slice(index + 1)]
                                    }))}
                                />
                            ))}
                        </div>

                    </div>

                </div>

                <div className="my-5 border-l border-n-1 pb-3.5 dark:border-white ">
                    <div className="text-xs ml-4">
                        Pertanyaan yang Anda buat akan tampil seperti yang dimasukkan. Pastikan pertanyaan relevan, jelas, dan bebas dari data pribadi. Setelah disimpan, hanya admin yang bisa mengedit atau menghapus. Terima kasih.
                    </div>
                </div>
                <div className="flex justify-between md:block">
                    <button className="btn-stroke min-w-[11.25rem] md:min-w-full md:mb-3" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="btn-purple btn-shadow min-w-[11.25rem] md:min-w-full">
                        Continue
                    </button>
                </div>
            </form>
            {ToastContainer}
        </AuthenticatedLayout>
    )
}
