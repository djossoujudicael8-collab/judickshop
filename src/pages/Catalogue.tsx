import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PackageX, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { mockCategories, mockProducts } from "@/data/mock";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

export default function Catalogue() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeSlug = searchParams.get("category");
    const [sort, setSort] = useState<"recent" | "price_asc" | "price_desc">("recent");

    const activeCategory = mockCategories.find((c) => c.slug === activeSlug);

    const filteredProducts = useMemo(() => {
        let result = activeCategory
            ? mockProducts.filter((p) => p.categoryId === activeCategory.id)
            : mockProducts;

        result = [...result].sort((a, b) => {
            if (sort === "price_asc") return a.price - b.price;
            if (sort === "price_desc") return b.price - a.price;
            return b.id - a.id;
        });

        return result;
    }, [activeCategory, sort]);

    function handleCategoryClick(slug?: string) {
        if (slug) {
            setSearchParams({ category: slug });
        } else {
            setSearchParams({});
        }
    }

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* En-tête Animé */}
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
                        {filteredProducts.length} pièce{filteredProducts.length > 1 ? "s" : ""} unique{filteredProducts.length > 1 ? "s" : ""}
                    </p>
                </motion.div>
            </section>

            {/* Filtres + Grille */}
            <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">

                    {/* Pilules de catégories */}
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => handleCategoryClick(undefined)}
                            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${!activeSlug
                                    ? "bg-foreground text-background shadow-md"
                                    : "bg-muted/50 text-foreground hover:bg-muted"
                                }`}
                        >
                            Tous
                        </button>
                        {mockCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.slug)}
                                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${activeSlug === cat.slug
                                        ? "bg-foreground text-background shadow-md"
                                        : "bg-muted/50 text-foreground hover:bg-muted"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Menu de tri */}
                    <div className="flex items-center gap-3 shrink-0 bg-muted/30 p-1.5 rounded-2xl border border-border/50">
                        <div className="pl-3 text-muted-foreground">
                            <SlidersHorizontal className="h-4 w-4" />
                        </div>
                        <Select value={sort} onValueChange={(value) => setSort(value as typeof sort)}>
                            <SelectTrigger className="w-[180px] border-none bg-transparent shadow-none focus:ring-0 font-medium">
                                <SelectValue placeholder="Trier par" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl shadow-premium">
                                <SelectItem value="recent">Plus récents</SelectItem>
                                <SelectItem value="price_asc">Prix croissant</SelectItem>
                                <SelectItem value="price_desc">Prix décroissant</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Grille de produits */}
                {filteredProducts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center gap-4 py-32"
                    >
                        <div className="rounded-full bg-muted/50 p-6 border border-border/50">
                            <PackageX className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                        <p className="text-base font-medium text-muted-foreground">
                            Aucun trésor trouvé dans cette catégorie.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product) => (
                                /* Le prop "layout" permet aux cartes de glisser doucement quand on change le tri */
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    key={product.id}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </section>
        </div>
    );
}