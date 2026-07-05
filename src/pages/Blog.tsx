import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useSupabase";

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function Blog() {
    const { posts, loading } = useBlogPosts();

    return (
        <div>
            <section className="bg-accent">
                <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
                    <h1 className="font-display text-4xl font-semibold text-foreground md:text-5xl">
                        Notre blog
                    </h1>
                    <p className="mt-3 text-sm text-muted-foreground">
                        Inspirations, tendances et conseils pour votre style de vie.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
                {loading ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="animate-pulse rounded-xl bg-muted">
                                <div className="aspect-video bg-muted/50 rounded-t-xl" />
                                <div className="p-6 flex flex-col gap-3">
                                    <div className="h-3 w-1/4 rounded bg-muted-foreground/20" />
                                    <div className="h-5 w-3/4 rounded bg-muted-foreground/20" />
                                    <div className="h-3 w-1/2 rounded bg-muted-foreground/20" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {posts.map((post) => (
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
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {formatDate(post.published_at)}
                                        </span>
                                    </div>
                                    <h2 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <span className="mt-4 inline-block text-sm font-medium text-primary">
                                        Lire la suite
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}