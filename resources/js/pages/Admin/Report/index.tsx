import AuthenticatedLayout from "@/layouts/Authenticated";
import { PageProps } from "@/types";
import { SpanText } from "./Components/SpanText";
import Select from "@/components/Select";
import { QTType } from "@/features/QuestionType";
import { useEffect, useState } from "react";
import Field from "@/components/Field";
import Button from "@/components/Button";
import { Calendar } from "lucide-react";
import Sorting from "@/components/Sorting";
import axios, { AxiosResponse } from "axios";
import { ResponseType } from "@/features/Response";
import { toIndonesian } from "@/utils/date";
import TablePagination from "@/components/TablePagination";
import { PaginateTableInterface } from "@/interfaces/PaginateTableInterface";

type DataApiType = {
    data: PaginateTableInterface<ResponseType>
}

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

    const [dataApi, setDataApi] = useState<DataApiType>();

    useEffect(() => {
        const fetchStaticData = async () => {
            const { data }: AxiosResponse<DataApiType> = await axios.get(route('admin.report.data'));
            setDataApi(data)
        }
        fetchStaticData()
    }, []);
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
                        {dataApi?.data.data.map((item, index) => (
                            <tr>
                                <td className="text-center font-bold">
                                    {index + 1}
                                </td>
                                <td className="">
                                    {item.respondent?.service?.title ?? ''}
                                </td>
                                <td className="">
                                    {item.question?.question_type?.name ?? ''}
                                </td>
                                <td className="">
                                    {item.question?.question ?? ''}
                                </td>
                                <td className="">
                                    {JSON.parse(item.question?.custom_answers ?? '')[parseInt(item.answer) - 1]}
                                </td>
                                <td className="">
                                    {parseInt(item.answer) - 1}
                                </td>
                                <td className="">
                                    {item.respondent?.age ?? ''}
                                </td>
                                <td className="">
                                    {item.respondent?.gender ?? ''}
                                </td>
                                <td className="">
                                    {item.respondent?.jobs ?? ''}
                                </td>
                                <td className="">
                                    {item.respondent?.education ?? ''}
                                </td>
                                <td className="">
                                    {toIndonesian(item.created_at ?? '')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <TablePagination
                    currentPage={dataApi?.data.current_page}
                    totalPages={dataApi?.data.last_page}
                    previousPage={dataApi?.data.prev_page_url}
                    nextPage={dataApi?.data.next_page_url}
                    onChangePage={(data) => {
                        setDataApi({ ...dataApi, data: data.data.data })
                    }}
                />
            </div>
        </AuthenticatedLayout>
    )
}
