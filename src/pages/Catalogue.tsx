import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PackageX, SlidersHorizontal } from "lucide-react";
import { useCategories, useProducts } from "@/hooks/useSupabase";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
        <div className="min-h-screen bg-background pb-24">
            <section className="relative bg-accent/30 py-16 md:py-24 border-b border-border/40">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative mx-auto max-w-7xl px-4 text-center md:px-8"
                >
                    <h1 className="font-display text-4xl font-bold text-foreground md:text-6xl">
                        Notre catalogue
                    </h1>
                    <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        {sortedProducts.length} piece{sortedProducts.length > 1 ? "s" : ""}
                    </p>
                </motion.div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => handleCategoryClick(undefined)}
                            className={"rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 " + (!activeSlug ? "bg-foreground text-background shadow-md" : "bg-muted/50 text-foreground hover:bg-muted")}
                        >
                            Tous
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.slug)}
                                className={"rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 " + (activeSlug === cat.slug ? "bg-foreground text-background shadow-md" : "bg-muted/50 text-foreground hover:bg-muted")}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 shrink-0 bg-muted/30 p-1.5 rounded-2xl border border-border/50">
                        <div className="pl-3 text-muted-foreground">
                            <SlidersHorizontal className="h-4 w-4" />
                        </div>
                        <Select value={sort} onValueChange={(value) => setSort(value as typeof sort)}>
                            <SelectTrigger className="w-[180px] border-none bg-transparent shadow-none font-medium">
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

                {loading ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-[4/5] rounded-2xl bg-muted" />
                                <div className="mt-4 h-4 w-3/4 rounded bg-muted" />
                                <div className="mt-2 h-4 w-1/2 rounded bg-muted" />
                            </div>
                        ))}
                    </div>
                ) : sortedProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-32">
                        <div className="rounded-full bg-muted/50 p-6 border border-border/50">
                            <PackageX className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                        <p className="text-base font-medium text-muted-foreground">
                            Aucun produit trouve dans cette categorie.
                        </p>
                    </div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <AnimatePresence mode="popLayout">
                            {sortedProducts.map((product) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    key={product.id}
                                >
                                    <Link
                                        to={"/produit/" + product.id}
                                        className="group block overflow-hidden rounded-2xl bg-card border border-border/40 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-premium"
                                    >
                                        <div className="aspect-[4/5] overflow-hidden bg-muted/30">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-5 flex flex-col gap-1">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                                                {product.categories?.name}
                                            </span>
                                            <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="font-display text-xl text-primary font-medium mt-1">
                                                {product.price.toLocaleString()} FCFA
                                            </p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </section>
        </div>
    );
}