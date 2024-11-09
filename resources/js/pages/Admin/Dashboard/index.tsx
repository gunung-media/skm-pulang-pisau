import Select from "@/components/Select";
import AuthenticatedLayout from "@/Layouts/Authenticated";
import axios from "axios";
import { useEffect, useState } from "react";

type GenderFilter = 'Semua' | 'Pria' | 'Perempuan';
type DashboardData = {
    avgSatisfaction: {
        avg: any,
        count: number
    }
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
                        items={['Semua', 'Pria', 'Perempuan']}
                        value={genderFilter}
                        onChange={(value) => setGenderFilter(value)}
                        small
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
