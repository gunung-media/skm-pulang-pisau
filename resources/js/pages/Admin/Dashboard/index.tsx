import AuthenticatedLayout from "@/Layouts/Authenticated";

export default function Dashboard() {
    return (
        <AuthenticatedLayout title="Dashboard">
            <h1>Hello World</h1>
        </AuthenticatedLayout>
    )
}
