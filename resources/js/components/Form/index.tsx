import { cn } from "@/utils/neobrutalism"
import { FC } from "react"

type props = {
    children: React.ReactNode
    label: string
    className?: string
    error?: string
}

export const Form: FC<props> = ({ children, label, className, error }) => {
    return (
        <div className={cn('my-5', className)}>
            <label className={cn('text-base font-base')}>{label}</label>
            {children}
            {error && (
                <p className="mt-2 text-red-500 text-sm">{error}</p>
            )}
        </div>
    )
}
