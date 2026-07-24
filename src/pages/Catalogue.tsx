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
        <div className="relative min-h-screen overflow-hidden bg-background pb-24">
            <div className="blob -right-40 top-0 h-96 w-96 bg-primary/70" />
            <div className="blob -left-32 top-64 h-72 w-72 bg-secondary/60" style={{ animationDelay: "4s" }} />

            <section className="relative py-16 md:py-24 border-b border-white/30">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 mx-auto max-w-7xl px-4 text-center md:px-8"
                >
                    <span className="glass inline-block rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        La collection complete
                    </span>
                    <h1 className="font-display mt-6 text-4xl font-semibold text-foreground md:text-6xl">
                        Notre <span className="text-gradient italic">catalogue</span>
                    </h1>
                    <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        {sortedProducts.length} article{sortedProducts.length > 1 ? "s" : ""}
                    </p>
                </motion.div>
            </section>

            <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => handleCategoryClick(undefined)}
                            className={
                                "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 " +
                                (!activeSlug
                                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md glow-primary"
                                    : "glass text-foreground hover:bg-primary/10")
                            }
                        >
                            Tous
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.slug)}
                                className={
                                    "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 " +
                                    (activeSlug === cat.slug
                                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md glow-primary"
                                        : "glass text-foreground hover:bg-primary/10")
                                }
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 shrink-0 glass p-1.5 rounded-2xl">
                        <div className="pl-3 text-primary">
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
                                <div className="aspect-[4/5] rounded-3xl bg-muted" />
                                <div className="mt-4 h-4 w-3/4 rounded bg-muted" />
                                <div className="mt-2 h-4 w-1/2 rounded bg-muted" />
                            </div>
                        ))}
                    </div>
                ) : sortedProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-32">
                        <div className="glass rounded-full p-6">
                            <PackageX className="h-10 w-10 text-primary/60" />
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
                                        className="group block overflow-hidden rounded-3xl glass shadow-sm transition-all duration-500 hover:-translate-y-2 hover:glow-primary"
                                    >
                                        <div className="aspect-[4/5] overflow-hidden bg-muted/30">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-5 flex flex-col gap-1">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">
                                                {product.categories?.name}
                                            </span>
                                            <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="font-display text-xl font-semibold text-gradient mt-1">
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