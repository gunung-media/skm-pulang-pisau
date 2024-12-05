import '../css/app.css'
import './bootstrap'

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
    resolve: (name: string) => {
        console.log(name)
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true }) as Record<string, any>
        return pages[`./Pages/${name}.tsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
})
