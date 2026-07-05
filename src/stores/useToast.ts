import { create } from "zustand";

export interface ToastMessage {
    id: number;
    type: "success" | "error";
    message: string;
}

interface ToastState {
    toasts: ToastMessage[];
    showToast: (type: "success" | "error", message: string) => void;
    removeToast: (id: number) => void;
}

export const useToast = create<ToastState>((set) => ({
    toasts: [],

    showToast: (type, message) => {
        const id = Date.now() + Math.random();
        set((state) => ({ toasts: [...state.toasts, { id, type, message }] }));

        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id),
            }));
        }, 4000);
    },

    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        })),
}));