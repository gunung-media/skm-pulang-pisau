import { useState } from "react";
import Field from "@/components/Field";
import Checkbox from "@/components/Checkbox";
import GuestLayout from "@/layouts/Guest";


const SignIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [remember, setRemember] = useState<boolean>(false);

    return (
        <GuestLayout>
            <form action="" onSubmit={() => console.log("Submit")}>
                <div className="mb-1 text-h1">Login</div>
                <div className="mb-12 text-sm text-n-2 dark:text-white/50">
                    Hai, Admin! Silahkan masukan email dan password
                </div>
                <Field
                    className="mb-4.5"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    icon="email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    required
                />
                <Field
                    className="mb-6.5"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    required
                />
                <div className="flex justify-between items-center mb-6.5">
                    <Checkbox
                        label="Remember me"
                        value={remember}
                        onChange={() => setRemember(!remember)}
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
    );
};

export default SignIn;
