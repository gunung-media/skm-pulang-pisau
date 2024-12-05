export const navigation = [
    {
        title: "Dashboard",
        icon: "dashboard",
        url: route('admin.dashboard'),
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
    {
        title: "Respondent",
        icon: "tasks",
        url: route('admin.respondent.index'),
    },
];

export const navigationMobile = navigation.map((item) => ({ icon: item.icon, url: item.url }));
