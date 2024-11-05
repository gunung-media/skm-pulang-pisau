import { useState, useCallback, FC } from 'react';
import { X } from 'lucide-react';
import './styles.css';

const toastStyles = {
    container: 'fixed bottom-0 right-0 z-[100] flex max-h-screen flex-col-reverse p-4 font-base',
    toast: 'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-base border-2 border-border shadow-light p-6 pr-8 transition-all transform',
    closeButton: 'absolute right-2 top-2 rounded-md p-1 text-black text-inherit opacity-0 transition-opacity group-hover:opacity-100',
    title: 'text-sm font-heading',
    description: 'text-sm font-base',
};

interface ToastMessage {
    id: string;
    title?: string;
    description?: string;
    variant?: 'default' | 'destructive';
}

interface ToastProps {
    messages: ToastMessage[];
    removeToast: (id: string) => void;
}

const ToastContainer: FC<ToastProps> = ({ messages, removeToast }) => (
    <div className={toastStyles.container}>
        {messages.map((message) => (
            <div
                key={message.id}
                className={`${toastStyles.toast} ${message.variant === 'destructive' ? 'bg-black text-white' : 'bg-main text-black'
                    } transition-transform duration-300 ease-in-out transform translate-y-0 mt-3`}
                style={{ animation: 'fade-in 0.3s ease-in forwards', opacity: 1 }}
            >
                <div>
                    {message.title && <div className={toastStyles.title}>{message.title}</div>}
                    {message.description && <div className={toastStyles.description}>{message.description}</div>}
                </div>
                <button onClick={() => removeToast(message.id)} className={toastStyles.closeButton}>
                    <X className="h-4 w-4" />
                </button>
            </div>
        ))}
    </div>
);

export const useToast = () => {
    const [messages, setMessages] = useState<ToastMessage[]>([]);

    const toast = useCallback((title: string, description?: string, variant: 'default' | 'destructive' = 'default') => {
        const id = Date.now().toString();
        setMessages((prev) => [...prev, { id, title, description, variant }]);

        setTimeout(() => {
            removeToast(id);
        }, 2000);
    }, []);

    const removeToast = (id: string) => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === id ? { ...msg, isVisible: false } : msg
            )
        );

        setTimeout(() => {
            setMessages((prev) => prev.filter((msg) => msg.id !== id));
        }, 300);
    };

    return { toast, ToastContainer: <ToastContainer messages={messages} removeToast={removeToast} /> };
};
