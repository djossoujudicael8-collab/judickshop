import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeColors {
    primary: string;
    secondary: string;
}

interface ThemeState {
    colors: ThemeColors;
    setColors: (colors: ThemeColors) => void;
    applyColors: () => void;
}

const DEFAULT_COLORS: ThemeColors = {
    primary: "258 90% 66%",
    secondary: "24 95% 53%",
};

export const useTheme = create<ThemeState>()(
    persist(
        (set, get) => ({
            colors: DEFAULT_COLORS,

            setColors: (colors) => {
                set({ colors });
                get().applyColors();
            },

            applyColors: () => {
                const { colors } = get();
                document.documentElement.style.setProperty("--primary", colors.primary);
                document.documentElement.style.setProperty("--secondary", colors.secondary);
                document.documentElement.style.setProperty("--ring", colors.primary);
            },
        }),
        {
            name: "jayou-theme",
        }
    )
);