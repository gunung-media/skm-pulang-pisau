import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";


export const Icon: FC<{
    icon: IconDefinition,
    color: string,
    onClick: () => void,
}> = ({ icon, color, onClick }) => {
    return (
        <FontAwesomeIcon
            icon={icon}
            onClick={onClick}
            size="4x"
            className={`${color} cursor-pointer hover:scale-105 transition duration-150 transform hover:${color.replace('-500', '-800')}`
            }
            style={{
                filter: ' drop-shadow(2px 2px 0px #000)'
            }}
        />
    )

}
