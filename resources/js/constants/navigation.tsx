export const navigation = [
    {
        title: "Dashboard",
        icon: "dashboard",
        url: route('admin.dashboard'),
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

export const navigationMobile = [
    {
        icon: "dashboard",
        url: route('admin.dashboard'),
    },
    {
        icon: "projects",
        url: route('admin.question.index'),
    },
    {
        icon: "tasks",
        url: route('admin.respondent.index'),
    },
];
