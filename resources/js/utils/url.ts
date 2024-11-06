import { usePage } from "@inertiajs/react";


const getFullUrl = () => {
    const { url } = usePage()
    const fullUrl = `${window.location.origin}${url}`;

    return fullUrl
}


export { getFullUrl }
