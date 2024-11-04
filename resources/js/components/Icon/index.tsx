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
                'cursor-pointer hover:scale-125 transition duration-150 transform ',
                isActive && `scale-125 ${color.split('hover:')[1]}`
            )
            }
            style={{
                filter: 'drop-shadow(2px 2px 0px #000)'
            }}
        />
    )

}
