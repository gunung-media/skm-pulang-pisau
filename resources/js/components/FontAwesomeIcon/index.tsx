import { cn } from "@/utils/neobrutalism";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";


export const Icon: FC<{
    icon: IconDefinition,
    color: string,
    isActive: boolean,
    onClick: () => void,
}> = ({ icon, color, onClick, isActive = false }) => {
    return (
        <FontAwesomeIcon
            icon={icon}
            onClick={onClick}
            size="4x"
            className={cn(
                color,
                'cursor-pointer hover:scale-150 transition duration-150 transform ',
                'drop-shadow-[3px_3px_0px_#000] hover:drop-shadow-none',
                isActive && `scale-150 ${color.split('hover:')[1]} drop-shadow-none`,
            )
            }
        />
    )

}
