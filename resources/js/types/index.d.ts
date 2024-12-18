export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    }
    assets: string
    appName: string
    storageUrl: string
    session: {
        status: string
    }
};
