import calculateLuminance from '@/utils/calculateLuminance';
import { cn } from '@/utils/neobrutalism';
import { FC } from 'react';

type CPType = {
    onChange: (value: string) => void,
    value: string,
    name: string,
    isRequired?: boolean
}

export const ColorPicker: FC<CPType> = ({ onChange, value, name, isRequired = false }) => {
    function getTextColorBasedOnLuminance(hexColor: string): string {
        const luminance = calculateLuminance(hexColor);

        return luminance > 0.179 ? 'text-gray-600' : 'text-gray-200';
    }
    return (
        <div className="flex flex-col items-start w-full">
            <label
                htmlFor={name}
                className="mb-3 text-xs font-bold"
            >
                {name}
                {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="relative w-full flex items-center gap-4">
                <input
                    type="color"
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="appearance-none w-12 h-12 border-4 border-black rounded-md cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                />
                <span
                    className="min-w-12 w-auto h-12 rounded-md border-4 border-black bg-white flex items-center justify-center"
                    style={{ backgroundColor: value }}
                >
                    <span className={cn("text-black text-sm font-bold", getTextColorBasedOnLuminance(value))}>{value}</span>
                </span>
            </div>
        </div>
    );
};

