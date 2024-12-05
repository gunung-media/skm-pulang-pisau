import { ColorPicker } from "@/components/ColorPicker";
import Field from "@/components/Field";
import Select from "@/components/Select";
import { useToast } from "@/components/Toast";
import { ServiceDto, ServiceType } from "@/features/Service";
import AuthenticatedLayout from "@/layouts/Authenticated";
import { PageProps } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { icons } from "lucide-react";
import { FormEventHandler, useEffect, useState } from "react";

export default function Form({ service }: PageProps & { service: ServiceType }) {
    const { data: dto, setData, post } = useForm<ServiceDto>({
        title: "",
        fill: "",
        icon: "",
    })
    const [isEditing, setIsEditing] = useState(false);
    const { toast, ToastContainer } = useToast()
    const iconsArray = Object.keys(icons) as Array<keyof typeof icons>;

    useEffect(() => {
        if (service) {
            setIsEditing(true)
            setData(() => ({
                title: service.title,
                fill: service.fill,
                icon: service.icon
            }))
        }
    }, [service])

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        if (!isEditing) return handleCreate(e)

        router.post(route('admin.service.update', service!.id), { _method: 'put', ...dto }, {
            onSuccess: () => {
                toast("Jenis Pelayanan diperbarui")
                setTimeout(() => router.visit(route('admin.service.index')), 1000)
            },
            onError: (error) => {
                toast("Gagal menyimpan jenis pelayanan", error.toString())
            }
        })

    }

    const handleCreate: FormEventHandler = () => {
        post(route('admin.service.store'), {
            onError: (error) => {
                console.error(error)
                toast("Gagal menyimpan Jenis Pelayanan", error.toString())
            },
            onSuccess: () => {
                toast("Jenis Pelayanan ditambahkan")
                setTimeout(() => router.visit(route('admin.service.index')), 1000)
            }
        })
    }

    const handleCancel: FormEventHandler = (e) => {
        e.preventDefault()
        router.visit(route('admin.service.index'))
    }

    return (
        <AuthenticatedLayout title={isEditing ? "Edit Jenis Pelayanan" : "Buat Jenis Pelayanan"} back={route('admin.service.index')}>
            <form
                className="max-w-[30.625rem] w-full mx-auto py-4"
                action=""
                onSubmit={handleSubmit}
            >
                <div className="w-full">
                    <Field
                        className="mb-5"
                        label="Jenis Pelayanan"
                        placeholder="Masukan Jenis Pelayanan..."
                        value={dto?.title}
                        onChange={(e: any) => setData('title', e.target.value)}
                        required
                    />
                    <div className="mb-3 text-xs font-bold">Icon</div>
                    <select className="flex items-center w-full h-16 px-5 bg-white border border-n-1 rounded-sm text-sm text-n-1 font-bold outline-none transition-colors tap-highlight-color dark:bg-n-1 dark:border-white dark:text-white mb-5"
                        value={dto?.icon} onChange={(e) => setData('icon', e.target.value)} required>

                        {iconsArray.map((icon) => <option key={icon} value={icon} selected={icon === dto?.icon}>{icon}</option>)}
                    </select>
                    <ColorPicker
                        name="Warna"
                        value={dto?.fill}
                        onChange={(e) => setData('fill', e)}
                        isRequired
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
