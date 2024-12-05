export const navigation = [
    {
        title: "Dashboard",
        icon: "dashboard",
        url: route('admin.dashboard'),
    },
    {
        title: "Jenis Pelayanan",
        icon: "puzzle",
        url: route('admin.service.index'),
    },
    {
        title: "Tipe Pertanyaan",
        icon: "projects",
        url: route('admin.questionType.index'),
    },
    {
        title: "Pertanyaan",
        icon: "projects",
        url: route('admin.question.index'),
    },
];

export const navigationSecond = [
    {
        title: "Respondent",
        icon: "tasks",
        url: route('admin.respondent.index'),
    },
    {
        title: "Hasil SKM",
        icon: "report",
        url: route('admin.report.index'),
    },
]

export const navigationMobile = [...navigation.map((item) => ({ icon: item.icon, url: item.url })), ...navigationSecond.map((item) => ({ icon: item.icon, url: item.url }))];
