import { cn } from '@/utils/neobrutalism'
import { ClassValue } from 'clsx'
import { ChangeEvent } from 'react'

type Props = {
    className?: ClassValue
    value: string
    setValue: (event: ChangeEvent<HTMLTextAreaElement>) => void
    placeholder: string
}

export default function Textarea({
    className,
    value,
    setValue,
    placeholder,
}: Props) {
    return (
        <textarea
            className={cn(
                'h-[12rem] w-full bg-white dark:bg-secondaryBlack resize-none rounded-base border-2 border-border dark:border-darkBorder p-[10px] font-base ring-offset-white dark:ring-offset-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 outline-none',
                className,
            )}
            name="textarea"
            placeholder={placeholder}
            value={value}
            onChange={setValue}
        ></textarea>
    )
}
