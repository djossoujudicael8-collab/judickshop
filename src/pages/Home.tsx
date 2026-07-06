import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCategories, useProducts, useBlogPosts } from "@/hooks/useSupabase";
import { motion } from "framer-motion";

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", { month: "long", day: "numeric" });
}

export default function Home() {
    const { categories } = useCategories();
    const { products } = useProducts();
    const { posts } = useBlogPosts();

    return (
        <div>
            <section className="relative overflow-hidden bg-accent/30">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-transparent" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-12 text-center md:px-8 md:py-16"
                >
                    <span className="rounded-full border border-primary/30 bg-primary/5 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        Nouvelle collection
                    </span>
                    <h1 className="font-display mt-8 text-5xl font-bold leading-[1.1] text-foreground md:text-7xl">
                        Des tresors
                        <br />
                        <span className="text-primary italic">pour votre style</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
                        JUDICKSHOP — Mode, Electronique et Bijoux soigneusement selectionnes pour vous.
                    </p>
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Button asChild size="lg" className="gap-2 rounded-full px-8 py-6 text-base shadow-xl">
                            <Link to="/catalogue">
                                Explorer le catalogue
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </section>

            {/* Categories */}
            <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-display text-center text-3xl font-bold text-foreground md:text-5xl"
                >
                    Explorez nos univers
                </motion.h2>

                <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                to={"/catalogue?category=" + category.slug}
                                className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-md block"
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="font-display text-2xl font-semibold text-white">
                                        {category.name}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Produits phares */}
            <section className="bg-muted/20 py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                    <div className="flex items-end justify-between mb-12">
                        <h2 className="font-display text-3xl font-bold text-foreground md:text-5xl">
                            Nos pieces maitresses
                        </h2>
                        <Link
                            to="/catalogue"
                            className="hidden items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary hover:text-foreground transition-colors md:flex"
                        >
                            Voir tout <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {products.slice(0, 4).map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    </div>
                </div>
            </section>

            {/* Blog */}
            <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
                <div className="flex items-end justify-between mb-10">
                    <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                        Dernieres actualites
                    </h2>
                    <Link
                        to="/blog"
                        className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex"
                    >
                        Voir tout <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {posts.slice(0, 3).map((post) => (
                        <Link
                            key={post.id}
                            to={"/blog/" + post.id}
                            className="group block overflow-hidden rounded-xl bg-card shadow-premium transition-shadow hover:shadow-premium-lg"
                        >
                            <div className="aspect-video overflow-hidden bg-muted">
                                <img
                                    src={post.cover_image}
                                    alt={post.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-5">
                                <span className="text-xs font-medium text-primary">{post.category}</span>
                                <h3 className="font-display mt-1 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {formatDate(post.published_at)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA WhatsApp */}
            <section className="mx-auto max-w-3xl px-4 py-20 text-center md:px-8">
                <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                    Une question ?
                </h2>
                <p className="mt-4 text-muted-foreground">
                    Notre equipe vous repond directement sur WhatsApp.
                </p>
                <div className="mt-8 flex justify-center">
                    <WhatsAppButton className="rounded-full px-8 py-4 text-base" />
                </div>
            </section>
        </div>
    );
}