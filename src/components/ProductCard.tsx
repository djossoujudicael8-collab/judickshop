import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Check, PackageX } from "lucide-react";
import type { Product } from "@/data/mock";
import { useCart } from "@/stores/useCart";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

export default function ProductCard({ product }: { product: Product }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [added, setAdded] = useState(false);
    const { addItem, setIsOpen } = useCart();
    const isTouch = useIsTouchDevice();

    const outOfStock = product.inStock === false;

    // Le tilt 3D au survol n'a de sens qu'avec une souris : sur mobile on le
    // desactive completement pour eviter tout calcul inutile a chaque frame.
    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (isTouch) return;
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: py * -8, y: px * 10 });
    }

    function handleMouseLeave() {
        if (isTouch) return;
        setTilt({ x: 0, y: 0 });
    }

    function handleQuickAdd(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (outOfStock) return;
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
            setIsOpen(true);
        }, 500);
    }

    return (
        <Link to={`/produit/${product.id}`} className="group block">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="tilt-card overflow-hidden rounded-2xl bg-card border border-border/40 shadow-sm transition-shadow duration-300 active:shadow-premium sm:hover:shadow-premium-lg"
                style={
                    isTouch
                        ? undefined
                        : { transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }
                }
            >
                <div className="aspect-[4/5] overflow-hidden bg-muted/30 relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className={
                            "h-full w-full object-cover transition-transform duration-700 ease-out sm:group-hover:scale-110 " +
                            (outOfStock ? "grayscale-[35%] opacity-80" : "")
                        }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 sm:group-hover:opacity-100" />

                    {outOfStock && (
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-foreground/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                            <PackageX className="h-3 w-3" />
                            Rupture de stock
                        </span>
                    )}

                    {/* Sur tactile, il n'y a pas de "survol" : le bouton reste visible en permanence
                        pour que l'ajout rapide au panier soit toujours accessible d'un tap. */}
                    <motion.button
                        onClick={handleQuickAdd}
                        whileTap={outOfStock ? undefined : { scale: 0.9 }}
                        disabled={outOfStock}
                        className={
                            "touch-target absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-foreground shadow-md transition-all duration-300 sm:h-10 sm:w-10 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 " +
                            (isTouch && !outOfStock ? "opacity-100 translate-y-0" : "")
                        }
                        aria-label="Ajouter au panier"
                    >
                        {added ? (
                            <Check className="h-4 w-4 text-success" />
                        ) : (
                            <ShoppingBag className="h-4 w-4" />
                        )}
                    </motion.button>
                </div>

                <div
                    className="p-5 flex flex-col gap-1"
                    style={isTouch ? undefined : { transform: "translateZ(20px)" }}
                >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        {product.categoryName}
                    </span>
                    <h3 className="font-display text-lg text-foreground sm:group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                    <p className="font-display text-xl text-primary font-medium mt-1">
                        {product.price.toLocaleString()} FCFA
                    </p>
                </div>
            </div>
        </Link>
    );
}