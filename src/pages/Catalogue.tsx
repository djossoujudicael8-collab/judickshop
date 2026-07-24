import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PackageX, SlidersHorizontal } from "lucide-react";
import { useCategories, useProducts } from "@/hooks/useSupabase";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Catalogue() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeSlug = searchParams.get("category") ?? undefined;
    const [sort, setSort] = useState<"recent" | "price_asc" | "price_desc">("recent");

    const { categories } = useCategories();
    const { products, loading } = useProducts(activeSlug);

    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => {
            if (sort === "price_asc") return a.price - b.price;
            if (sort === "price_desc") return b.price - a.price;
            return b.id - a.id;
        });
    }, [products, sort]);

    function handleCategoryClick(slug?: string) {
        if (slug) {
            setSearchParams({ category: slug });
        } else {
            setSearchParams({});
        }
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-background pb-24">
            <div className="blob -right-40 top-0 h-96 w-96 bg-primary/70" />
            <div className="blob -left-32 top-64 h-72 w-72 bg-secondary/60" style={{ animationDelay: "4s" }} />

            <section className="relative py-14 md:py-24 border-b border-border/30">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 mx-auto max-w-7xl px-4 text-center md:px-8"
                >
                    <span className="glass-light inline-block rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        La collection complete
                    </span>
                    <h1 className="font-display mt-6 text-3xl font-semibold text-foreground sm:text-4xl md:text-6xl">
                        Notre <span className="text-gradient italic">catalogue</span>
                    </h1>
                    <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        {sortedProducts.length} article{sortedProducts.length > 1 ? "s" : ""}
                    </p>
                </motion.div>
            </section>

            {/* Barre de filtres : sticky sur mobile pour rester accessible pendant le
                scroll, sans reposer sur un backdrop-filter lourd empile en continu. */}
            <section className="sticky top-16 z-30 -mx-4 border-b border-border/30 bg-background/95 px-4 py-4 backdrop-blur-sm md:static md:mx-0 md:border-none md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
                <div className="mx-auto max-w-7xl md:px-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 md:flex-wrap md:gap-3 md:pb-0">
                            <button
                                onClick={() => handleCategoryClick(undefined)}
                                className={
                                    "touch-target shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-200 " +
                                    (!activeSlug
                                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                                        : "glass-light text-foreground")
                                }
                            >
                                Tous
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat.slug)}
                                    className={
                                        "touch-target shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-200 " +
                                        (activeSlug === cat.slug
                                            ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                                            : "glass-light text-foreground")
                                    }
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 glass-light rounded-2xl p-1.5 self-start md:self-auto">
                            <div className="pl-3 text-primary shrink-0">
                                <SlidersHorizontal className="h-4 w-4" />
                            </div>
                            <Select value={sort} onValueChange={(value) => setSort(value as typeof sort)}>
                                <SelectTrigger className="w-[170px] border-none bg-transparent shadow-none font-medium">
                                    <SelectValue placeholder="Trier par" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl shadow-premium">
                                    <SelectItem value="recent">Plus recents</SelectItem>
                                    <SelectItem value="price_asc">Prix croissant</SelectItem>
                                    <SelectItem value="price_desc">Prix decroissant</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-8">
                {loading ? (
                    <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i}>
                                <div className="aspect-[4/5] rounded-2xl shimmer-bg" />
                                <div className="mt-4 h-4 w-3/4 rounded shimmer-bg" />
                                <div className="mt-2 h-4 w-1/2 rounded shimmer-bg" />
                            </div>
                        ))}
                    </div>
                ) : sortedProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-32">
                        <div className="glass-light rounded-full p-6">
                            <PackageX className="h-10 w-10 text-primary/60" />
                        </div>
                        <p className="text-base font-medium text-muted-foreground text-center px-4">
                            Aucun produit trouve dans cette categorie.
                        </p>
                    </div>
                ) : (
                    // Pas d'animation "layout" FLIP sur chaque carte ici : avec beaucoup
                    // d'articles, ce recalcul de mise en page peut saccader sur un GPU
                    // Android d'entree de gamme. On garde uniquement un fondu simple,
                    // peu couteux et deja tres agreable a l'oeil.
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlug ?? "all"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4"
                        >
                            {sortedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={{
                                        id: product.id,
                                        name: product.name,
                                        description: product.description,
                                        price: product.price,
                                        image: product.image,
                                        categoryId: product.category_id,
                                        categoryName: product.categories?.name ?? "",
                                        sku: "",
                                        inStock: product.in_stock,
                                    }}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}
            </section>
        </div>
    );
}