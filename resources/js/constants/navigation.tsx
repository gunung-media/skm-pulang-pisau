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
        url: "/projects/tasks-list-v1",
    },
];

export const navigationMobile = [
    {
        icon: "dashboard",
        url: "/dashboard/ecommerce",
    },
    {
        icon: "projects",
        url: "/projects/projects-list-v1",
    },
    {
        icon: "tasks",
        url: "/projects/tasks-list-v1",
    },
];
