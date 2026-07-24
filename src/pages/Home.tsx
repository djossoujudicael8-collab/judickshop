import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrustBadges from "@/components/TrustBadges";
import SectionDivider from "@/components/SectionDivider";
import { useCategories, useProducts, useFeaturedProducts, useBlogPosts, useSiteSettings } from "@/hooks/useSupabase";
import { motion } from "framer-motion";

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", { month: "long", day: "numeric" });
}

export default function Home() {
    const { categories } = useCategories();
    const { products } = useProducts();
    const { products: featuredProducts } = useFeaturedProducts();
    const { posts } = useBlogPosts();
    const { settings } = useSiteSettings();

    const hasVideo = Boolean(settings?.hero_video_url);
    const selectionProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 8);

    return (
        <div className="overflow-x-hidden">
            {/* HERO */}
            <section className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-background pb-16">
                <div className="blob -left-32 -top-32 h-96 w-96 bg-primary" />
                <div className="blob -right-20 top-10 h-80 w-80 bg-secondary" style={{ animationDelay: "3s" }} />
                <div className="blob left-1/3 bottom-0 h-72 w-72 bg-primary/70" style={{ animationDelay: "6s" }} />

                {hasVideo && (
                    <>
                        <video
                            src={settings!.hero_video_url!}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
                    </>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-10 text-center md:px-8 md:py-12"
                >
                    <span className="glass flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        <Sparkles className="h-3.5 w-3.5" />
                        Édition exclusive
                    </span>

                    <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl md:text-7xl">
                        L'art de sublimer
                        <br />
                        <span className="text-gradient italic">votre quotidien</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
                        JA ✨ Jí Yoū — des pieces selectionnees avec passion, pensees pour celles et ceux qui aiment se demarquer.
                    </p>

                    <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                        <Button
                            asChild
                            size="lg"
                            className="group gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-6 text-base text-white shadow-xl glow-primary transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
                        >
                            <Link to="/catalogue">
                                Decouvrir la collection
                                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </section>

            {/* REASSURANCE */}
            <TrustBadges />

            <div className="mt-16 md:mt-20">
                <SectionDivider />
            </div>

            {/* CATEGORIES — carrousel mobile / grille desktop */}
            <section className="pb-20 md:pb-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display px-4 text-center text-3xl font-semibold text-foreground md:px-8 md:text-5xl"
                >
                    Nos <span className="text-gradient italic">univers</span>
                </motion.h2>

                <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 md:mx-auto md:mt-16 md:grid md:max-w-7xl md:grid-cols-3 md:overflow-visible md:px-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-[72vw] shrink-0 snap-start md:w-auto"
                        >
                            <Link
                                to={"/catalogue?category=" + category.slug}
                                className="group relative block aspect-[4/5] overflow-hidden rounded-[2rem] shadow-md"
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-colors duration-500 group-hover:from-black/70" />
                                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                                    <span className="font-display text-2xl font-semibold text-white transition-transform duration-500 group-hover:-translate-y-1">
                                        {category.name}
                                    </span>
                                    <span className="glass flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform duration-500 group-hover:translate-x-1">
                                        <ArrowRight className="h-4 w-4" />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            <SectionDivider flip />

            {/* LA SELECTION — carrousel mobile / grille desktop */}
            <section className="relative overflow-hidden bg-accent/40 py-20 md:py-24">
                <div className="blob left-10 top-0 h-72 w-72 bg-secondary/60" />
                <div className="relative mx-auto max-w-7xl">
                    <div className="flex items-end justify-between px-4 mb-10 md:px-8 md:mb-12">
                        <h2 className="font-display text-2xl font-semibold text-foreground md:text-5xl">
                            La <span className="text-gradient italic">Selection</span>
                        </h2>
                        <Link
                            to="/catalogue"
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-secondary transition-colors md:text-sm"
                        >
                            Voir tout <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 md:grid md:grid-cols-4 md:overflow-visible md:px-8">
                        {selectionProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="w-[62vw] shrink-0 snap-start md:w-auto"
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
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* BLOG */}
            <section className="mx-auto max-w-7xl px-4 py-20 md:py-24 md:px-8">
                <div className="flex items-end justify-between mb-10">
                    <h2 className="font-display text-2xl font-semibold text-foreground md:text-4xl">
                        Dernieres <span className="text-gradient italic">actualites</span>
                    </h2>
                    <Link
                        to="/blog"
                        className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex"
                    >
                        Voir tout <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
                    {posts.slice(0, 3).map((post) => (
                        <Link
                            key={post.id}
                            to={"/blog/" + post.id}
                            className="w-[75vw] shrink-0 snap-start overflow-hidden rounded-3xl glass shadow-sm transition-shadow hover:shadow-premium-lg md:w-auto"
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

            {/* CTA WHATSAPP */}
            <section className="mx-auto max-w-3xl px-4 pb-16 text-center md:px-8 md:pb-24">
                <div className="glass rounded-[2rem] px-8 py-14">
                    <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
                        Une question ?
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Notre equipe vous repond directement sur WhatsApp.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <WhatsAppButton className="rounded-full px-8 py-4 text-base transition-transform duration-300 hover:scale-105" />
                    </div>
                </div>
            </section>
        </div>
    );
}