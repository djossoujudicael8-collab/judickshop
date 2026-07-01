import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminState {
    isAuthenticated: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

const ADMIN_EMAIL = "admin@judickshop.com";
const ADMIN_PASSWORD = "admin123";

export const useAdmin = create<AdminState>()(
    persist(
        (set) => ({
            isAuthenticated: false,

            login: (email, password) => {
                if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                    set({ isAuthenticated: true });
                    return true;
                }
                return false;
            },

            logout: () => set({ isAuthenticated: false }),
        }),
        {
            name: "judickshop-admin",
        }
    )
);