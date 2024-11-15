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
    disabled?: boolean,
    label?: string
}> = ({
    icon, color, onClick, isActive = false, size = "4x", disabled = false, label }) => {
        return (
            <div
                className='text-center mx-5 cursor-pointer group'
                onClick={onClick}>
                <FontAwesomeIcon
                    icon={icon}
                    size={size}
                    className={
                        cn(
                            color,
                            'cursor-pointer group-hover:scale-150 hover:scale-150 transition duration-150 transform ',
                            'drop-shadow-[3px_3px_0px_#000] hover:drop-shadow-none group-hover:drop-shadow-none',
                            isActive && `scale-150 drop-shadow-none`,
                            disabled && 'cursor-not-allowed hover:scale-100 drop-shadow-none hover:drop-shadow-none ',
                            (disabled && isActive) ? '!scale-[2] !hover:scale-[2] drop-shadow-[3px_3px_0px_#000] hover:drop-shadow-[3px_3px_0px_#000]' : ''
                        )
                    }
                />
                {label && (
                    <p className={
                        cn(
                            'text-h6 mt-5 group-hover:scale-125 transition',
                            isActive && 'scale-125'
                        )}>{label}</p>
                )}
            </div>
        )

    }
