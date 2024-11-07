import Field from "@/components/Field";
import { useToast } from "@/components/Toast";
import ToggleSwitch from "@/components/ToggleSwitch";
import { QuestionDto, QuestionType } from "@/features/Question";
import AuthenticatedLayout from "@/layouts/Authenticated";
import { PageProps } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

export default function Form({ question }: PageProps & { question?: QuestionType }) {
    const { data: dto, setData, post } = useForm<QuestionDto>()
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
                custom_answers: question.custom_answers
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
                className="max-w-[30.625rem] w-full mx-auto py-4"
                action=""
                onSubmit={handleSubmit}
            >
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
                    label="Posisi"
                    placeholder="Masukan posisi..."
                    value={dto?.position?.toString()}
                    type="number"
                    onChange={(e: any) => setData('position', e.target.value)}
                    required
                />

                <Field
                    className="mb-5"
                    label="Jumlah Pertanyaan"
                    placeholder="Masukan jumlah pertanyaan..."
                    value={dto?.number_of_answers?.toString() ?? "5"}
                    type="number"
                    onChange={(e: any) => setData('position', e.target.value)}
                    disabled
                />

                <ToggleSwitch
                    label="Apakah tampil?"
                    isToggled={dto?.is_active ?? true}
                    setIsToggled={(e) => setData('is_active', e)}
                />

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
