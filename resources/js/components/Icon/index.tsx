import { IconNames, icons } from "@/constants/icon";
import { twMerge } from "tailwind-merge";

type IconProps = {
    className?: string;
    name: IconNames;
    fill?: string;
};

const Icon = ({ className, name, fill }: IconProps) => (
    <svg
        className={twMerge(`inline-block w-4 h-4 ${className}`)}
        width={16}
        height={16}
        viewBox="0 0 16 16"
    >
        <path fill={fill} d={icons[name]}></path>
    </svg>
);

export default Icon;
