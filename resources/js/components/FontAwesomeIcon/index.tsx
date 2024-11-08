import { cn } from "@/utils/neobrutalism";
import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";


export const FaIcon: FC<{
    icon: IconDefinition,
    color: string,
    isActive: boolean,
    onClick?: () => void,
    size?: SizeProp,
    disabled?: boolean
}> = ({
    icon, color, onClick, isActive = false, size = "4x", disabled = false }) => {
        return (
            <FontAwesomeIcon
                icon={icon}
                onClick={onClick}
                size={size}
                className={
                    cn(
                        color,
                        'cursor-pointer hover:scale-150 transition duration-150 transform ',
                        'drop-shadow-[3px_3px_0px_#000] hover:drop-shadow-none',
                        isActive && `scale-150 ${color.split('hover:')[1]} drop-shadow-none`,
                        disabled && 'cursor-not-allowed hover:scale-100 hover:drop-shadow-[3px_3px_0px_#000] ',
                    )
                }
            />
        )

    }
