import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon, LayoutGrid, ShoppingBag, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/stores/useCart";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function MobileNavBar() {
    const location = useLocation();
    const { totalItems, setIsOpen } = useCart();
    const cartCount = totalItems();

    const isHome = location.pathname === "/";
    const isCatalogue = location.pathname.startsWith("/catalogue");
    const whatsappLink = getWhatsAppLink();

    return (
        <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:hidden">
            <div className="glass flex items-center gap-1 rounded-full px-2 py-2 shadow-premium-lg">
                <Link to="/" className="relative flex h-11 w-11 items-center justify-center rounded-full">
                    {isHome && <motion.div layoutId="nav-bubble" className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary shadow-md" transition={{ type: "spring", stiffness: 300, damping: 25 }} />}
                    <HomeIcon className={"relative z-10 h-5 w-5 " + (isHome ? "text-white" : "text-foreground/50")} />
                </Link>

                <Link to="/catalogue" className="relative flex h-11 w-11 items-center justify-center rounded-full">
                    {isCatalogue && <motion.div layoutId="nav-bubble" className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary shadow-md" transition={{ type: "spring", stiffness: 300, damping: 25 }} />}
                    <LayoutGrid className={"relative z-10 h-5 w-5 " + (isCatalogue ? "text-white" : "text-foreground/50")} />
                </Link>

                <button onClick={() => setIsOpen(true)} className="relative flex h-11 w-11 items-center justify-center rounded-full">
                    <ShoppingBag className="h-5 w-5 text-foreground/50" />
                    {cartCount > 0 && <span className="absolute -top-0.5 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-[10px] font-bold text-white shadow-sm">{cartCount}</span>}
                </button>

                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full">
                    <MessageCircle className="h-5 w-5 text-foreground/50" />
                </a>
            </div>
        </nav>
    );
}