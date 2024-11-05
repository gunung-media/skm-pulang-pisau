import { useState, FC } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}

const Image: FC<ImageProps> = ({ className, ...props }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <img
            className={`inline-block align-top opacity-0 transition-opacity ${loaded ? "opacity-100" : ""} ${className}`}
            onLoad={() => setLoaded(true)}
            {...props}
        />
    );
};

export default Image;
