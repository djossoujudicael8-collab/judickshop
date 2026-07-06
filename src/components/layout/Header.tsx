import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/stores/useCart";
import { useSiteSettings } from "@/hooks/useSupabase";
import SearchDialog from "@/components/SearchDialog";

const navLinks = [
    { label: "Accueil", path: "/" },
    { label: "Catalogue", path: "/catalogue" },
    { label: "Blog", path: "/blog" },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { totalItems, setIsOpen } = useCart();
    const cartCount = totalItems();
    const { settings } = useSiteSettings();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/60 shadow-sm backdrop-blur-md transition-all">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    {settings?.logo_url ? (
                        <img
                            src={settings.logo_url}
                            alt="Logo de la boutique"
                            className="h-9 w-auto object-contain"
                        />
                    ) : (
                        <span className="font-display text-xl font-bold tracking-tight text-foreground">
                            JUDICK<span className="text-primary">SHOP</span>
                        </span>
                    )}
                </Link>

                {/* Navigation desktop */}
                <nav className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-sm font-semibold uppercase tracking-wider transition-all hover:text-primary ${isActive ? "text-primary" : "text-foreground/70"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Actions à droite */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Rechercher"
                        className="hover:bg-foreground/5 rounded-full"
                        onClick={() => setSearchOpen(true)}
                    >
                        <Search className="h-5 w-5" />
                    </Button>

                    {/* Bouton panier avec badge compteur */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative hover:bg-foreground/5 rounded-full"
                        aria-label="Panier"
                        onClick={() => setIsOpen(true)}
                    >
                        <ShoppingBag className="h-5 w-5" />
                        {cartCount > 0 && (
                            <Badge className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full bg-primary p-0 text-[11px] text-primary-foreground shadow-sm">
                                {cartCount}
                            </Badge>
                        )}
                    </Button>

                    {/* Bouton menu mobile */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden hover:bg-foreground/5 rounded-full"
                        onClick={() => setMobileOpen((open) => !open)}
                        aria-label="Menu"
                    >
                        {mobileOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Menu mobile déroulant */}
            {mobileOpen && (
                <nav className="flex flex-col gap-1 border-t border-border/50 bg-background/95 px-4 py-4 backdrop-blur-md md:hidden shadow-lg">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                `rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-wider ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-foreground/80 hover:bg-foreground/5"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            )}

            <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        </header>
    );
}