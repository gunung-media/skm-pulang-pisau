import AuthenticatedLayout from "@/layouts/Authenticated";
import { PageProps } from "@/types";
import { SpanText } from "./Components/SpanText";
import Select from "@/components/Select";
import { QTType } from "@/features/QuestionType";
import { useState } from "react";
import Field from "@/components/Field";
import Button from "@/components/Button";
import { Calendar } from "lucide-react";
import Sorting from "@/components/Sorting";

export default function Report({ questionTypes }: PageProps & { questionTypes: QTType[] }) {
    const [search, setSearch] = useState<{
        question_type_id: number,
        start_date?: string,
        end_date?: string
    }>({
        question_type_id: -1,
        start_date: "",
        end_date: ""
    });
    const items = [
        { name: "Semua ", value: -1 },
        ...questionTypes.map((item) => ({ name: item.name, value: item.id })),
    ];

    console.log(items)
    return (
        <AuthenticatedLayout title="Hasil SKM">
            <div className="card px-5 py-3 text-center">
                <h5 className="text-sm font-bold text-blue-500 mb-5">Hasil Penilaian SKM (Ongoing):</h5>
                <h1 className="text-2xl font-bold">
                    Nilai IKM: <SpanText score={25.5} />,
                    Mutu Pelayanan: <SpanText score={90} isQuality />,
                    Kinerja Pelayanan: <SpanText score={76} isPerformace />
                </h1>
                <p className="text-left mt-10 text-xs">Buat Laporan SKM dengan mengisi kolom-kolom berikut sebagai parameter (opsional)</p>
                <div className="flex justify-between gap-5 mt-10">
                    <Select
                        className="mb-5 w-full"
                        label="Pilih Unit Layanan"
                        items={items}
                        value={search.question_type_id}
                        onChange={(e) => setSearch({ ...search, question_type_id: e })}
                        isName={true}
                    />
                    <Field
                        type="date"
                        className="mb-5 w-full"
                        label="Awal Periode SKM"
                        placeholder="Masukan pertanyaan..."
                        value={search.start_date ?? ""}
                        onChange={(e: any) => setSearch({ ...search, start_date: e.target.value })}
                        required
                    />

                    <Field
                        type="date"
                        className="mb-5 w-full"
                        label="Akhir Periode SKM"
                        placeholder="Masukan pertanyaan..."
                        value={search.end_date ?? ""}
                        onChange={(e: any) => setSearch({ ...search, end_date: e.target.value })}
                        required
                    />
                </div>
                <Button className="m-auto mt-5" onClick={() => { }}><Calendar size={10} className="mr-2" /> Lihat Laporan</Button>
            </div>
            <div className="overflow-x-auto mt-20">
                <table className="table-custom ">
                    <thead>
                        <tr>
                            <th className="th-custom">
                                <Sorting title="#" />
                            </th>
                            <th className="th-custom">
                                <Sorting title="Unit Layanan" />
                            </th>
                            <th className="th-custom ">
                                <Sorting title="Unsur Penilaian" />
                            </th>
                            <th className="th-custom ">
                                <Sorting title="Pertanyaan" />
                            </th>
                            <th className="th-custom ">
                                <Sorting title="Tanggapan Responden" />
                            </th>
                            <th className="th-custom ">
                                <Sorting title="Bobot Tanggapan" />
                            </th>
                            <th className="th-custom ">
                                <Sorting title="Usia Responden" />
                            </th>
                            <th className="th-custom ">
                                <Sorting title="Jenis Kelamin Responden" />
                            </th>
                            <th className="th-custom ">
                                <Sorting title="Jenis Kelamin Responden" />
                            </th>
                            <th className="th-custom ">
                                <Sorting title="Pekerjaan Responden" />
                            </th>
                            <th className="th-custom ">
                                <Sorting title="Pendidikan Responden" />
                            </th>
                            <th className="th-custom ">
                                <Sorting title="Waktu Survey" />
                            </th>
                            <th className="th-custom text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionTypes.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center font-bold">
                                    Pertanyaan tidak ada!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    )
}
