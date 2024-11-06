import Field from "@/components/Field";
import Checkbox from "@/components/Checkbox";
import GuestLayout from "@/layouts/Guest";
import { router, useForm, usePage } from "@inertiajs/react";
import { UserLoginDto } from "@/features/User"
import { PageProps } from "@/types";
import { FormEventHandler, useState } from "react";
import { useToast } from "@/components/Toast";


const SignIn = () => {
    const { errors } = usePage<PageProps>().props
    const { toast, ToastContainer } = useToast();
    const [data, setData] = useState<UserLoginDto>({
        email: '',
        password: '',
        remember: false,
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        router.post(route('admin.login'), data, {
            onError: (e) => {
                toast('Gagal!', Object.values(e).join('<br/>'))
            },
            onSuccess: () => {
                toast('Login Berhasil', 'Login Berhasil')
            }
        })
    }

    return (
        <GuestLayout>
            {ToastContainer}
            <form onSubmit={handleSubmit}>
                <div className="mb-1 text-h1">Login</div>
                <div className="mb-12 text-sm text-n-2 dark:text-white/50">
                    Hai, Admin! Silahkan masukan email dan password
                </div>
                <Field
                    className="mb-4.5"
                    label="Email"
                    type="email"
                    placeholder="Masukan email"
                    icon="email"
                    value={data.email}
                    onChange={(e: any) => setData({ ...data, email: e.target.value })}
                    required
                />
                <Field
                    className="mb-6.5"
                    label="Password"
                    type="password"
                    placeholder="Masukan password"
                    value={data.password}
                    onChange={(e: any) => setData({ ...data, password: e.target.value })}
                    required
                />
                <div className="flex justify-between items-center mb-6.5">
                    <Checkbox
                        label="Ingat saya"
                        value={data.remember}
                        onChange={() => setData({ ...data, remember: !data.remember })}
                    />
                </div>
                <button
                    className="btn-purple btn-shadow w-full h-14"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </GuestLayout>
    )
};

export default SignIn;
