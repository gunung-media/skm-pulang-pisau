import Field from "@/components/Field";
import { useToast } from "@/components/Toast";
import { QTDto, QTType } from "@/features/QuestionType";
import AuthenticatedLayout from "@/layouts/Authenticated";
import { PageProps } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

export default function Form({ questionType }: PageProps & { questionType: QTType }) {
    const { data: dto, setData, post } = useForm<QTDto>({
        name: ""
    })
    const [isEditing, setIsEditing] = useState(false);
    const { toast, ToastContainer } = useToast()

    useEffect(() => {
        if (questionType) {
            setIsEditing(true)
            setData(() => ({
                name: questionType.name
            }))
        }
    }, [questionType])

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        if (!isEditing) return handleCreate(e)

        router.post(route('admin.questionType.update', questionType!.id), { _method: 'put', ...dto }, {
            onSuccess: () => {
                toast("Tipe Pertanyaan diperbarui")
                setTimeout(() => router.visit(route('admin.questionType.index')), 1000)
            },
            onError: (error) => {
                toast("Gagal menyimpan tipe pertanyaan", error.toString())
            }
        })

    }

    const handleCreate: FormEventHandler = () => {
        post(route('admin.questionType.store'), {
            onError: (error) => {
                console.error(error)
                toast("Gagal menyimpan tipe pertanyaan", error.toString())
            },
            onSuccess: () => {
                toast("Tipe pertanyaan ditambahkan")
                setTimeout(() => router.visit(route('admin.questionType.index')), 1000)
            }
        })
    }

    const handleCancel: FormEventHandler = (e) => {
        e.preventDefault()
        router.visit(route('admin.questionType.index'))
    }

    return (
        <AuthenticatedLayout title={isEditing ? "Edit Tipe Pertanyaan" : "Buat Tipe Pertanyaan"} back={route('admin.questionType.index')}>
            <form
                className="max-w-[30.625rem] w-full mx-auto py-4"
                action=""
                onSubmit={handleSubmit}
            >
                <div className="w-full">
                    <Field
                        className="mb-5"
                        label="Tipe pertanyaan"
                        placeholder="Masukan tipe pertanyaan..."
                        value={dto?.name}
                        onChange={(e: any) => setData('name', e.target.value)}
                        required
                    />
                </div>
                <div className="mt-20 flex justify-between md:block">
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
