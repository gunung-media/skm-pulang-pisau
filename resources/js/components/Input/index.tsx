import { cn } from '@/utils/neobrutalism'
import { ClassValue } from 'clsx'
import { ChangeEvent } from 'react'

type Props = {
    name: string
    value: string
    className?: ClassValue
    setValue: (event: ChangeEvent<HTMLInputElement>) => void
    placeholder: string
}

export default function Input({
    name,
    className,
    value,
    setValue,
    placeholder,
}: Props) {
    return (
        <input
            className={cn(
                'rounded-base bg-white border-2 border-border p-[10px] font-base ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 outline-none',
                className,
            )}
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={setValue}
            aria-label={placeholder}
        />
    )
}
