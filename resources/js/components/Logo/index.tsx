import Image from "@/components/Image";
import { Link } from "@inertiajs/react";
import Logo from "@/images/logo.png"

type TestProps = {
    className?: string;
    light?: boolean;
};

const Test = ({ className, light }: TestProps) => {
    return (
        <Link className={`flex w-[8rem] ${className}`} href={route('admin.dashboard')}>
            <Image
                className="w-full h-auto"
                src={Logo}
                alt="FeedbackHub"
            />
        </Link>
    );
};

export default Test;
