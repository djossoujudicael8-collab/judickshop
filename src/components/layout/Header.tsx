import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Search, ShoppingBag, X, Sparkles } from "lucide-react";
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
        <header className="sticky top-0 z-50 w-full glass shadow-sm">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
                <Link to="/" className="flex items-center gap-2">
                    {settings?.logo_url ? (
                        <img
                            src={settings.logo_url}
                            alt="Logo"
                            className="h-12 w-auto object-contain"
                        />
                    ) : (
                        <div className="flex flex-col leading-none">
                            <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
                                JA <Sparkles className="inline h-4 w-4 text-secondary -mt-2" />
                            </span>
                            <span className="font-display text-xs italic text-primary">
                                Jí Yoū
                            </span>
                        </div>
                    )}
                </Link>

                <nav className="hidden items-center gap-1 rounded-full glass px-2 py-1.5 md:flex">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `rounded-full px-4 py-2 text-sm font-semibold transition-all ${isActive
                                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                                    : "text-foreground/70 hover:text-foreground"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-primary/10"
                        onClick={() => setSearchOpen(true)}
                    >
                        <Search className="h-5 w-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative rounded-full hover:bg-primary/10"
                        onClick={() => setIsOpen(true)}
                    >
                        <ShoppingBag className="h-5 w-5" />
                        {cartCount > 0 && (
                            <Badge className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full bg-gradient-to-r from-primary to-secondary p-0 text-[11px] text-white shadow-sm">
                                {cartCount}
                            </Badge>
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-primary/10 md:hidden"
                        onClick={() => setMobileOpen((o) => !o)}
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {mobileOpen && (
                <nav className="flex flex-col gap-1 border-t border-white/30 glass px-4 py-4 md:hidden">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                `rounded-xl px-3 py-3 text-sm font-semibold ${isActive
                                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                                    : "text-foreground/80 hover:bg-primary/10"
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