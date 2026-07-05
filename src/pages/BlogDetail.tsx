import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlogPost, useBlogPosts } from "@/hooks/useSupabase";

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function BlogDetail() {
    const { id } = useParams();
    const { post, loading } = useBlogPost(Number(id));
    const { posts: allPosts } = useBlogPosts();

    const related = allPosts.filter((p) => p.id !== Number(id)).slice(0, 2);

    if (loading) {
        return (
            <div className="animate-pulse">
                <div className="h-72 bg-muted md:h-96" />
                <div className="mx-auto max-w-3xl px-4 py-12 flex flex-col gap-4">
                    <div className="h-4 w-1/4 rounded bg-muted" />
                    <div className="h-8 w-3/4 rounded bg-muted" />
                    <div className="h-24 w-full rounded bg-muted" />
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-32 text-center">
                <p className="font-display text-2xl text-foreground">Article non trouve</p>
                <Link to="/blog" className="mt-4 text-sm text-primary hover:underline">
                    Retour au blog
                </Link>
            </div>
        );
    }

    const paragraphs = post.content.split("\n\n").filter(Boolean);

    return (
        <div>
            <div className="relative h-72 overflow-hidden bg-muted md:h-96">
                <img
                    src={post.cover_image}
                    alt={post.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-end">
                    <div className="mx-auto w-full max-w-3xl px-4 pb-10 md:px-8">
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                            {post.category}
                        </span>
                        <h1 className="font-display mt-4 text-3xl font-semibold text-white md:text-4xl">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
                <div className="flex items-center gap-6 mb-10 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.published_at)}
                    </span>
                    <span className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        {post.category}
                    </span>
                </div>

                <div>
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className="mb-6 text-base leading-relaxed text-foreground/80">
                            {paragraph}
                        </p>
                    ))}
                </div>

                <div className="mt-12 border-t border-border pt-8">
                    <Button asChild variant="outline" className="gap-2">
                        <Link to="/blog">
                            <ArrowLeft className="h-4 w-4" />
                            Retour au blog
                        </Link>
                    </Button>
                </div>
            </div>

            {related.length > 0 && (
                <section className="bg-muted/40 py-16">
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
                            Articles similaires
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {related.map((rpost) => (
                                <Link
                                    key={rpost.id}
                                    to={"/blog/" + rpost.id}
                                    className="group flex gap-4 rounded-xl bg-card p-4 shadow-premium transition-shadow hover:shadow-premium-lg"
                                >
                                    <div className="h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                                        <img
                                            src={rpost.cover_image}
                                            alt={rpost.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div>
                                        <span className="text-xs font-medium text-primary">{rpost.category}</span>
                                        <h3 className="font-display mt-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {rpost.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {formatDate(rpost.published_at)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}