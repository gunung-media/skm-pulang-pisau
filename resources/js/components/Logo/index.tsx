import Image from "@/components/Image";
import { Link } from "@inertiajs/react";

type TestProps = {
    className?: string;
    light?: boolean;
};

const Test = ({ className, light }: TestProps) => {
    const isDarkMode = false;

    return (
        <Link className={`flex w-[7.125rem] ${className}`} href="/">
            <Image
                className="w-full h-auto"
                src={
                    light
                        ? "/images/logo-light.svg"
                        : isDarkMode
                            ? "/images/logo-light.svg"
                            : "/images/logo-dark.svg"
                }
                width={113}
                height={25}
                alt="Bruddle"
            />
        </Link>
    );
};

export default Test;
