import LucideIcon from "@/components/LucideIcon";
import calculateLuminance from "@/utils/calculateLuminance";
import { icons } from "lucide-react";
import { FC } from "react";

interface OptionAnswerProps {
    name: string;
    icon: string;
    fill?: string;
    customCss?: string;
    onClick: any;
}

const OptionAnswer: FC<OptionAnswerProps> = ({ name, icon, onClick, fill, customCss }) => {
    function getTextColorBasedOnLuminance(hexColor: string): string {
        const luminance = calculateLuminance(hexColor);

        return luminance > 0.179 ? 'text-gray-600' : 'text-gray-200';
    }

    return (
        <div
            className="
        w-[35%] lg:w-[20%] px-4 py-3 flex flex-col items-center border border-border bg-white text-gray-800 font-medium hover:bg-gray-100 transition-all"
            onClick={onClick}
        >
            <LucideIcon
                name={icon as keyof typeof icons}
                size={50}
                fill={fill ?? 'transparent'}
                className={customCss ?? (fill ? getTextColorBasedOnLuminance(fill) : 'text-gray-600')}
            />
            <p className="text-sm mt-4 text-center">{name}</p>
        </div>
    );
};

export default OptionAnswer;
