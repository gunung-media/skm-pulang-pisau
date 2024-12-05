import CardChart from "@/components/CardChart";
import ChartPie, { ChartData } from "@/components/ChartPie";
import ChartPolar from "@/components/ChartPolar";
import Select from "@/components/Select";
import Sorting from "@/components/Sorting";
import { QuestionType } from "@/features/Question";
import AuthenticatedLayout from "@/Layouts/Authenticated";
import axios from "axios";
import { useEffect, useState } from "react";

type GenderFilter = 'Semua' | 'Pria' | 'Wanita';
type DashboardData = {
    avgSatisfaction: {
        avg: any,
        count: number
    },
    questionRanking: (QuestionType & { index_satisfaction: any })[]
    answerDistribution: ChartData[],
    answerResponseCount: number,
    answerTrend: {
        name: string,
        price: number
    }[]

}

export default function Dashboard() {
    const [genderFilter, setGenderFilter] = useState<GenderFilter>('Semua');
    const [dashboardData, setDashboardData] = useState<DashboardData>()

    const fetchDashboardData = async () => {
        try {
            const { data } = await axios.get<DashboardData>(route('admin.dashboard.get'), {
                params: {
                    gender: genderFilter
                }
            });
            console.log(data)
            setDashboardData(data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    useEffect(() => {
        fetchDashboardData()
    }, [genderFilter])

    return (
        <AuthenticatedLayout title="Dashboard">
            <div className="flex mb-6 md:mb-5">
                <div>
                    <div className="mb-0.5 text-h5">
                        Skor kepuasan rata-rata <span className="text-green-1">{parseFloat(dashboardData?.avgSatisfaction.avg ?? '0').toFixed(2)}</span>
                    </div>
                    <div className="text-sm font-medium text-n-3 dark:text-white/50">
                        Berdasarkan <span className="font-semibold">{dashboardData?.avgSatisfaction.count ?? 0}</span> Responden
                    </div>
                </div>
                <div className="flex items-center h-8 px-3 ml-auto border border-n-1 text-xs font-bold dark:border-white">
                    Jenis Kelamin:
                    <Select
                        className="ml-1"
                        classButton="h-auto px-0 border-none bg-trasparent"
                        classOptions="-left-4 -right-3 w-24 py-1"
                        classArrow="ml-1"
                        items={['Semua', 'Pria', 'Wanita'].map((item) => ({ name: item, value: item }))}
                        value={genderFilter}
                        onChange={(value) => setGenderFilter(value)}
                        small
                    />
                </div>
            </div>
            <div className="lg:flex lg:-mx-2.5 block mx-0">
                <div className="lg:w-[calc(65%-1.25rem)] lg:mx-2.5 w-full mx-0 mb-5">
                    <CardChart title="Distribusi Skala Jawaban ">
                        <ChartPie
                            data={dashboardData?.answerDistribution ?? []}
                            count={dashboardData?.answerResponseCount ?? 0}
                        />
                    </CardChart>
                    <CardChart title="Trend Jawaban Selama 6 Bulan Kebelakang" className="mt-5">
                        <ChartPolar items={dashboardData?.answerTrend ?? []} />
                    </CardChart>
                </div>
                <div className="lg:w-[calc(35%-1.25rem)] lg:mx-2.5 w-full mx-0">
                    <CardChart title="Peringkat Pertanyaan">
                        <table className="table-custom !border-none">
                            <thead className="md:hidden">
                                <tr>
                                    <th className="th-custom">
                                        <Sorting title="No" />
                                    </th>
                                    <th className="th-custom">
                                        <Sorting title="Pertanyan" />
                                    </th>
                                    <th className="th-custom">
                                        <Sorting title="Indeks" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboardData?.questionRanking.map((question, index) => (
                                    <tr key={question.id}>
                                        <td className="td-custom">{index + 1}</td>
                                        <td className="td-custom">{question.question}</td>
                                        <td className="td-custom">{parseFloat(question.index_satisfaction).toFixed(2)}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </CardChart>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
