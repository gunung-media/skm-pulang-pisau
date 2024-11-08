import { useEffect, useState } from "react";
import Sorting from "@/components/Sorting";
import SimpleTabs from "@/components/SimpleTabs";
import AuthenticatedLayout from "@/layouts/Authenticated";
import { getRespondents, RespondentType } from "@/features/Respondent";
import { toIndonesian } from "@/utils/date";
import TablePagination from "@/components/TablePagination";
import { PaginateTableInterface } from "@/interfaces/PaginateTableInterface";

const typeTasks = [
    {
        title: "Semua Respondent",
        value: "all-respondent",
    },
];

const durations = [
    {
        title: "All",
        value: "all",
    },
    {
        title: "1H",
        value: "1h",
    },
    {
        title: "24H",
        value: "24h",
    },
    {
        title: "1W",
        value: "1w",
    },
    , {
        title: "1M",
        value: "1m",
    }
];

export default function Index() {
    const [type, setType] = useState<string>("all-respondent");
    const [duration, setDuration] = useState<string>("all");
    const [paginate, setPaginate] = useState<PaginateTableInterface<RespondentType>>()

    const fetchRespondents = async () => {
        try {
            const data = await getRespondents(duration);
            setPaginate(data.data)
        } catch (error) {
            console.error('Error fetching respondents:', error);
        }
    };

    useEffect(() => {
        fetchRespondents();
    }, []);

    useEffect(() => {
        fetchRespondents();
    }, [duration]);

    return (
        <AuthenticatedLayout title="Respondent">
            <div className="flex -mx-2.5 mb-7 lg:block lg:mx-0">
            </div>
            <div className="flex justify-between mb-5 md:block">
                <SimpleTabs
                    className="lg:ml-0"
                    classButton="lg:ml-0 md:flex-1 md:px-3"
                    items={typeTasks}
                    value={type}
                    setValue={setType}
                />
                <SimpleTabs
                    className="lg:ml-0 md:hidden"
                    classButton="lg:ml-0"
                    items={durations}
                    value={duration}
                    setValue={setDuration}
                />
            </div>
            <table className="table-custom">
                <thead className="md:hidden">
                    <tr>
                        <th className="th-custom">
                            <Sorting title="Nama" />
                        </th>
                        <th className="th-custom">
                            <Sorting title="Tanggal" />
                        </th>
                        <th className="th-custom text-center">
                            <Sorting title="Umur" />
                        </th>
                        <th className="th-custom text-center">
                            <Sorting title="Jenis Layanan" />
                        </th>
                        <th className="th-custom text-center">
                            <Sorting title="Indeks Kepuasan" />
                        </th>
                        <th className="th-custom text-center">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginate?.data.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-100">
                            <td className="td-custom">{item.name}</td>
                            <td className="td-custom">{toIndonesian(item.created_at!)}</td>
                            <td className="td-custom text-center">{item.age}</td>
                            <td className="td-custom text-center">{item.type_of_service ?? "-"}</td>
                            <td className="td-custom text-center">{parseFloat(item.index_satisfaction ?? "").toFixed(2)}</td>
                            <td className="td-custom text-center">
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TablePagination
                currentPage={paginate?.current_page}
                totalPages={paginate?.last_page}
                previousPage={paginate?.prev_page_url}
                nextPage={paginate?.next_page_url}
                onChangePage={(data) => {
                    setPaginate(data.data)
                }}
            />
        </AuthenticatedLayout>
    );
};

