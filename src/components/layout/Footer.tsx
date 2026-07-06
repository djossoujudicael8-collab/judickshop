import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSupabase";

export default function Footer() {
    const { settings } = useSiteSettings();

    return (
        <footer className="border-t border-border bg-foreground text-background">
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    {/* Bloc marque */}
                    <div className="md:col-span-2">
                        {settings?.logo_url ? (
                            <img
                                src={settings.logo_url}
                                alt="Logo de la boutique"
                                className="h-8 w-auto object-contain"
                            />
                        ) : (
                            <span className="font-display text-xl font-semibold">
                                JUDICK<span className="text-primary">SHOP</span>
                            </span>
                        )}
                        <p className="mt-3 max-w-sm text-sm text-background/70">
                            Vêtements, électroniques et bijoux soigneusement sélectionnés
                            pour vous, livrés où que vous soyez.
                        </p>
                    </div>

                    {/* Liens navigation */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-background/90">
                            Navigation
                        </h4>
                        <ul className="mt-4 flex flex-col gap-2 text-sm text-background/70">
                            <li><Link to="/" className="hover:text-primary">Accueil</Link></li>
                            <li><Link to="/catalogue" className="hover:text-primary">Catalogue</Link></li>
                            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-background/90">
                            Contact
                        </h4>
                        <ul className="mt-4 flex flex-col gap-2 text-sm text-background/70">
                            <li>Parakou, Cotonou, Bénin</li>
                            <li>contact@judickshop.com</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-background/20 pt-6 text-center text-xs text-background/60">
                    &copy; {new Date().getFullYear()} JUDICKSHOP. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}