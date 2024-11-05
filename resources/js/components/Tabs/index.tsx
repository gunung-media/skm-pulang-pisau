import { cn } from '@/utils/neobrutalism'
import { ClassValue } from 'clsx'

type Props<T extends string | number> = {
    className?: ClassValue
    tabsArray: T[]
    activeTab: T
    setActiveTab: React.Dispatch<React.SetStateAction<T>>
}

export default function Tabs<T extends string | number>({
    className,
    tabsArray,
    activeTab,
    setActiveTab,
}: Props<T>) {
    return (
        <div
            style={{
                gridTemplateColumns: tabsArray.map(() => '1fr').join(' '),
            }}
            className={cn('grid w-full rounded-base text-sm sm:text-base', className)}
        >
            {tabsArray.map((tab, index) => {
                const bg = activeTab === tab ? 'bg-mainAccent' : 'bg-main'

                return (
                    <button
                        key={index}
                        onClick={() => setActiveTab(tab)}
                        className={`cursor-pointer text-text border-2 border-border dark:border-darkBorder py-2 text-center font-bold transition-colors first:rounded-ss-base last:rounded-se-base ${bg}`}
                    >
                        {tab}
                    </button>
                )
            })}
        </div>
    )
}
