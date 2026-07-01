import { Link } from "react-router-dom";
import type { Product } from "@/data/mock";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link
            to={`/produit/${product.id}`}
            className="group block overflow-hidden rounded-2xl bg-card border border-border/40 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-premium"
        >
            <div className="aspect-[4/5] overflow-hidden bg-muted/30 relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Petit effet d'assombrissement très léger au survol */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
            </div>
            <div className="p-5 flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {product.categoryName}
                </span>
                <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                </h3>
                <p className="font-display text-xl text-primary font-medium mt-1">
                    {product.price.toLocaleString()} FCFA
                </p>
            </div>
        </Link>
    );
}