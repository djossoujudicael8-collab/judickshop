import { Link, useParams } from "react-router-dom";
import { ShieldCheck, ShoppingBag, Truck, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/stores/useCart";
import { useProduct, useRelatedProducts } from "@/hooks/useSupabase";
import type { ProductDB } from "@/lib/supabase";
import { motion } from "framer-motion";

function toProductCard(p: ProductDB) {
    return {
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        categoryId: p.category_id,
        categoryName: p.categories?.name ?? "",
        sku: p.sku,
    };
}

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const { product, loading } = useProduct(Number(id));
    const { products: related } = useRelatedProducts(
        product?.category_id ?? 0,
        Number(id)
    );
    const { addItem, setIsOpen } = useCart();

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    <div className="animate-pulse rounded-3xl bg-muted aspect-[4/5]" />
                    <div className="flex flex-col gap-6 justify-center">
                        <div className="animate-pulse h-4 bg-muted rounded w-24" />
                        <div className="animate-pulse h-10 bg-muted rounded w-3/4" />
                        <div className="animate-pulse h-8 bg-muted rounded w-1/3" />
                        <div className="animate-pulse h-24 bg-muted rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
                <p className="font-display text-3xl font-bold text-foreground">
                    Produit introuvable
                </p>
                <Link
                    to="/catalogue"
                    className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Retour au catalogue
                </Link>
            </div>
        );
    }

    function handleAddToCart() {
        if (!product) return;
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            sku: product.sku,
        });
        setIsOpen(true);
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="mx-auto max-w-7xl px-4 pt-8 md:px-8">
                <Link
                    to="/catalogue"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Retour
                </Link>
            </div>

            <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="aspect-[4/5] overflow-hidden rounded-3xl bg-muted/20 border border-border/40 shadow-sm"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </motion.div>

                    <div className="flex flex-col justify-center">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="text-xs font-bold uppercase tracking-[0.2em] text-primary"
                        >
                            {product.categories?.name}
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="font-display mt-3 text-4xl font-bold leading-tight text-foreground md:text-5xl"
                        >
                            {product.name}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="font-display mt-6 text-3xl font-medium text-foreground/90"
                        >
                            {product.price.toLocaleString()} FCFA
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground"
                        >
                            {product.description}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.45 }}
                            className="mt-4 text-xs font-medium text-muted-foreground/60 uppercase tracking-wider"
                        >
                            Ref : {product.sku}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                            className="mt-10 flex flex-col gap-4 sm:flex-row"
                        >
                            <WhatsAppButton
                                product={{
                                    name: product.name,
                                    sku: product.sku,
                                    price: product.price,
                                }}
                                className="flex-1 rounded-full py-4 text-base"
                            />
                            <Button
                                variant="outline"
                                size="lg"
                                className="flex-1 gap-2 rounded-full py-4 text-base"
                                onClick={handleAddToCart}
                            >
                                <ShoppingBag className="h-5 w-5" />
                                Ajouter au panier
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            className="mt-12 flex flex-col gap-4 rounded-2xl bg-muted/30 p-6 border border-border/40"
                        >
                            <div className="flex items-center gap-4 text-sm font-medium text-foreground/80">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Truck className="h-5 w-5" />
                                </div>
                                Livraison rapide disponible
                            </div>
                            <div className="flex items-center gap-4 text-sm font-medium text-foreground/80">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                Paiement securise a la livraison
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {related.length > 0 && (
                <section className="bg-muted/10 py-24 mt-12 border-t border-border/30">
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        <h2 className="font-display text-3xl font-bold text-foreground">
                            Vous aimerez aussi
                        </h2>
                        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {related.map((p, index) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <ProductCard product={toProductCard(p)} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}