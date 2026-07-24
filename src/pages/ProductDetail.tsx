import { Link, useParams } from "react-router-dom";
import { ShieldCheck, ShoppingBag, Truck, ChevronLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/stores/useCart";
import { useProduct, useProducts } from "@/hooks/useSupabase";
import { motion } from "framer-motion";

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const { product, loading } = useProduct(Number(id));
    const { products: allProducts } = useProducts();
    const { addItem, setIsOpen } = useCart();

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    <div className="aspect-[4/5] animate-pulse rounded-[2rem] bg-muted" />
                    <div className="flex flex-col gap-4 pt-8">
                        <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
                        <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
                        <div className="h-8 w-1/3 animate-pulse rounded bg-muted" />
                        <div className="h-24 w-full animate-pulse rounded bg-muted" />
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
                    className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Retour au catalogue
                </Link>
            </div>
        );
    }

    const relatedProducts = allProducts
        .filter((p) => p.category_id === product.category_id && p.id !== product.id)
        .slice(0, 4);

    function handleAddToCart() {
        addItem({
            id: product!.id,
            name: product!.name,
            price: product!.price,
            image: product!.image,
        });
        setIsOpen(true);
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-background pb-20">
            <div className="blob -right-32 top-0 h-96 w-96 bg-primary/60" />
            <div className="blob left-0 top-96 h-72 w-72 bg-secondary/50" style={{ animationDelay: "5s" }} />

            <div className="relative z-10 mx-auto max-w-7xl px-4 pt-8 md:px-8">
                <Link
                    to="/catalogue"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Retour
                </Link>
            </div>

            <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="aspect-[4/5] overflow-hidden rounded-[2rem] glass shadow-sm"
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
                            className="glass inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary"
                        >
                            <Sparkles className="h-3 w-3" />
                            {product.categories?.name}
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="font-display mt-4 text-4xl font-semibold leading-tight text-foreground md:text-5xl"
                        >
                            {product.name}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="font-display text-gradient mt-6 text-3xl font-semibold"
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

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                            className="mt-10 flex flex-col gap-4 sm:flex-row"
                        >
                            <WhatsAppButton
                                product={{
                                    name: product.name,
                                    price: product.price,
                                }}
                                className="flex-1 rounded-full py-4 text-base"
                            />
                            <Button
                                variant="outline"
                                size="lg"
                                className="flex-1 gap-2 rounded-full py-4 text-base glass border-primary/30 hover:bg-primary/10"
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
                            className="mt-12 flex flex-col gap-4 rounded-3xl glass p-6"
                        >
                            <div className="flex items-center gap-4 text-sm font-medium text-foreground/80">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white">
                                    <Truck className="h-5 w-5" />
                                </div>
                                Livraison rapide disponible
                            </div>
                            <div className="flex items-center gap-4 text-sm font-medium text-foreground/80">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                Paiement securise a la livraison
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {relatedProducts.length > 0 && (
                <section className="relative z-10 py-24 mt-12 border-t border-white/30">
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        <h2 className="font-display text-3xl font-semibold text-foreground">
                            Vous aimerez <span className="text-gradient italic">aussi</span>
                        </h2>
                        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((p, index) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Link
                                        to={"/produit/" + p.id}
                                        className="group block overflow-hidden rounded-3xl glass shadow-sm transition-all hover:-translate-y-2 hover:glow-primary"
                                    >
                                        <div className="aspect-[4/5] overflow-hidden bg-muted/30">
                                            <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        </div>
                                        <div className="p-5">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">{p.categories?.name}</span>
                                            <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
                                            <p className="font-display text-xl text-gradient font-semibold mt-1">{p.price.toLocaleString()} FCFA</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}