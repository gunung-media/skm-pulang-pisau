import Icon from "@/components/Icon";
import Sorting from "@/components/Sorting";
import { useToast } from "@/components/Toast";
import { ServiceType } from "@/features/Service";
import AuthenticatedLayout from "@/layouts/Authenticated";
import { PageProps } from "@/types";
import { icons } from "lucide-react";
import calculateLuminance from "@/utils/calculateLuminance";
import { router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import LucideIcon from "@/components/LucideIcon";

export default function Service({ services }: PageProps & { services: ServiceType[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const { toast, ToastContainer } = useToast();

    const toggleMenu = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setActiveIndex(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    return (
        <AuthenticatedLayout title="Jenis Pelayanan">
            <table className="table-custom ">
                <thead>
                    <tr>
                        <th className="th-custom">
                            <Sorting title="Nomor" />
                        </th>
                        <th className="th-custom ">
                            <Sorting title="Nama Layanan" />
                        </th>
                        <th className="th-custom ">
                            <Sorting title="Icon " />
                        </th>
                        <th className="th-custom text-right"></th>
                    </tr>
                </thead>
                <tbody>
                    {services.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center font-bold">
                                Service tidak ada!
                            </td>
                        </tr>
                    )}
                    {services.map((item, index) => (
                        <tr className="" key={index}>
                            <td className="td-custom ">
                                {index + 1}
                            </td>
                            <td className="td-custom">
                                {item.title}
                            </td>
                            <td className="td-custom">
                                <LucideIcon
                                    name={item.icon as keyof typeof icons}
                                    size={50}
                                    fill={item.fill}
                                    className={calculateLuminance(item.fill) > 0.179 ? 'text-gray-600' : 'text-gray-200'}
                                />
                            </td>
                            <td className="td-custom text-right">
                                <button
                                    onClick={() => toggleMenu(index)}
                                    className="btn-transparent-dark btn-small btn-square">
                                    <Icon name="dots" />
                                </button>
                            </td>

                            {activeIndex === index && (
                                <div
                                    ref={menuRef}
                                    className="absolute right-0 mt-2 w-32 bg-white border-2 border-black rounded-lg shadow-dark z-10 p-1"
                                >
                                    <button
                                        onClick={() => {
                                            router.get(route('admin.service.edit', item.id))
                                            setActiveIndex(null);
                                        }}
                                        className="block w-full px-4 py-2 text-left border-b-2 border-black text-black hover:bg-gray-200"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            router.delete(route('admin.service.destroy', item.id), {
                                                onSuccess: () => {
                                                    toast("Tipe Pertanyaan dihapus")
                                                }, onError: (error) => {
                                                    console.error(error)
                                                    toast("Gagal menghapus tipe pertanyaan", error.toString())
                                                }
                                            })
                                            setActiveIndex(null);
                                        }}
                                        className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {ToastContainer}
        </AuthenticatedLayout >
    );
}
