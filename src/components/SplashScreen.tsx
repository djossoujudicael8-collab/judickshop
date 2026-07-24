import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSupabase";

interface SplashScreenProps {
    exiting: boolean;
}

export default function SplashScreen({ exiting }: SplashScreenProps) {
    const { settings, loading } = useSiteSettings();
    const shopName = settings?.shop_name?.trim() || "JA Jí Yoū";

    return (
        <motion.div
            initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            animate={
                exiting
                    ? { opacity: 0, scale: 1.5, filter: "blur(6px)" }
                    : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-primary via-primary to-secondary px-6 text-center"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-[1.75rem] bg-white/95 shadow-premium-xl md:h-28 md:w-28"
            >
                {!loading && settings?.logo_url ? (
                    <img
                        src={settings.logo_url}
                        alt={shopName}
                        className="h-full w-full object-contain p-3"
                    />
                ) : (
                    <Sparkles className="h-10 w-10 text-primary" />
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: loading ? 0 : 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-col items-center gap-2"
            >
                <span className="text-xs font-bold uppercase tracking-[0.35em] text-white/80">
                    Bienvenue chez
                </span>
                <span className="font-display text-3xl font-semibold italic text-white md:text-4xl">
                    {shopName}
                </span>
            </motion.div>
        </motion.div>
    );
}