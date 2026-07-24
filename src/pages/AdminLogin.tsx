import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/stores/useAdmin";

export default function AdminLogin() {
    const navigate = useNavigate();
    const { login } = useAdmin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        setTimeout(() => {
            const success = login(email, password);
            if (success) {
                navigate("/admin/dashboard");
            } else {
                setError("Email ou mot de passe incorrect.");
            }
            setLoading(false);
        }, 600);
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
            <div className="blob -left-32 -top-32 h-96 w-96 bg-primary/60" />
            <div className="blob -right-32 bottom-0 h-96 w-96 bg-secondary/60" style={{ animationDelay: "3s" }} />

            <div className="relative z-10 w-full max-w-md rounded-[2rem] glass p-8 shadow-premium-lg">
                <div className="mb-8 text-center">
                    <span className="font-display text-2xl font-semibold flex items-center justify-center gap-1.5">
                        JA <Sparkles className="h-4 w-4 text-secondary" /> Jí Yoū
                    </span>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Espace administrateur
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@jayou.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="rounded-lg bg-destructive/10 px-4 py-2 text-center text-sm text-destructive">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="gap-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
                    >
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {loading ? "Connexion..." : "Se connecter"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                    Demo : admin@jayou.com / admin123
                </p>
            </div>
        </div>
    );
}