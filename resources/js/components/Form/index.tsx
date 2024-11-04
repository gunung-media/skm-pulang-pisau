import { cn } from "@/utils/neobrutalism"
import { FC } from "react"

type props = {
    children: React.ReactNode
    label: string
    className?: string
}

export const Form: FC<props> = ({ children, label, className }) => {
    return (
        <div className={cn('my-5', className)}>
            <label className={cn('text-base font-base')}>{label}</label>
            {children}
        </div>
    )
}
