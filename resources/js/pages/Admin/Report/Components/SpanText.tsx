import { FC } from "react";

type STType = {
    score: number,
    isQuality?: boolean,
    isPerformace?: boolean,
}

export const SpanText: FC<STType> = ({
    score,
    isQuality = false,
    isPerformace = false,
}) => {
    const qualityMeasure = score >= 88.31 ? "A"
        : score >= 76.61 ? "B"
            : score >= 65.00 ? "C" : "D";

    const performanceMeasure = score >= 88.31 ? "Sangat Baik"
        : score >= 76.61 ? "Baik"
            : score >= 65.00 ? "Kurang Baik" : "Tidak Baik";

    const color = score >= 88.31 ? "text-purple-500"
        : score >= 76.61 ? "text-blue-500"
            : score >= 65.00 ? "text-yellow-500" : "text-red-500";

    return <span className={`font-black text-3xl ${color}`}>{isQuality ? qualityMeasure : isPerformace ? performanceMeasure : score}</span>;
};
