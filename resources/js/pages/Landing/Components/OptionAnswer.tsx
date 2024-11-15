import LucideIcon from "@/components/LucideIcon";
import { icons } from "lucide-react";
import { FC } from "react";

interface OptionAnswerProps {
    name: string;
    icon: string;
    onClick: any;
}

const OptionAnswer: FC<OptionAnswerProps> = ({ name, icon, onClick }) => {
    return (
        <div className="
            w-[20%] px-6 py-4 flex flex-col text-text cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
            onClick={onClick}
        >
            <LucideIcon
                name={icon as keyof typeof icons}
                size={50}
                className="text-black"
            />
            <p className="text-sm mt-5 font-bold text-center">{name}</p>
        </div >
    );
};

export default OptionAnswer;
