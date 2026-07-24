import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSupabase";

export default function Footer() {
    const { settings } = useSiteSettings();

    return (
        <footer className="relative overflow-hidden bg-foreground text-background">
            <div className="blob left-1/4 top-0 h-64 w-64 bg-primary/40" />
            <div className="blob right-1/4 bottom-0 h-64 w-64 bg-secondary/40" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    <div className="md:col-span-2">
                        {settings?.logo_url ? (
                            <img
                                src={settings.logo_url}
                                alt="Logo"
                                className="h-9 w-auto object-contain"
                            />
                        ) : (
                            <span className="font-display text-xl font-semibold flex items-center gap-1.5">
                                JA <Sparkles className="h-4 w-4 text-secondary" /> Jí Yoū
                            </span>
                        )}
                        <p className="mt-3 max-w-sm text-sm text-background/70">
                            Des pieces selectionnees avec passion pour sublimer votre quotidien, livrees ou que vous soyez.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-background/90">
                            Navigation
                        </h4>
                        <ul className="mt-4 flex flex-col gap-2 text-sm text-background/70">
                            <li><Link to="/" className="hover:text-secondary transition-colors">Accueil</Link></li>
                            <li><Link to="/catalogue" className="hover:text-secondary transition-colors">Catalogue</Link></li>
                            <li><Link to="/blog" className="hover:text-secondary transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-background/90">
                            Contact
                        </h4>
                        <ul className="mt-4 flex flex-col gap-2 text-sm text-background/70">
                            <li>Cotonou, Benin</li>
                            <li>contact@jayou.com</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-background/20 pt-6 text-center text-xs text-background/60">
                    &copy; {new Date().getFullYear()} JA ✨ Jí Yoū. Tous droits reserves.
                </div>
            </div>
        </footer>
    );
}