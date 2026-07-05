import { CheckCircle2, XCircle, X } from "lucide-react";
import { useToast } from "@/stores/useToast";
import { motion, AnimatePresence } from "framer-motion";

export default function ToastContainer() {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 w-full max-w-sm">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className={
                            "flex items-start gap-3 rounded-2xl border p-4 shadow-premium-lg backdrop-blur-md bg-background " +
                            (toast.type === "success"
                                ? "border-secondary/40"
                                : "border-destructive/40")
                        }
                    >
                        {toast.type === "success" ? (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary mt-0.5" />
                        ) : (
                            <XCircle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
                        )}
                        <p className="flex-1 text-sm font-medium text-foreground">
                            {toast.message}
                        </p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}