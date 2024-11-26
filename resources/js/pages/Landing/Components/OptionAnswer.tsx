import LucideIcon from "@/components/LucideIcon";
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
    function calculateLuminance(hexColor: string): number {
        hexColor = hexColor.replace('#', '');

        // Split the hex color into RGB components
        const r = parseInt(hexColor.substring(0, 2), 16) / 255;
        const g = parseInt(hexColor.substring(2, 4), 16) / 255;
        const b = parseInt(hexColor.substring(4, 6), 16) / 255;

        // Apply the sRGB gamma correction
        const adjustedR = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
        const adjustedG = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
        const adjustedB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

        // Calculate luminance
        return (0.2126 * adjustedR) + (0.7152 * adjustedG) + (0.0722 * adjustedB);
    }

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
