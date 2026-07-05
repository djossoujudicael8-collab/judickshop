import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { createBlogPost, updateBlogPost } from "@/hooks/useSupabase";
import type { BlogPostDB } from "@/lib/supabase";
import { useToast } from "@/stores/useToast";
import ImageUploadField from "@/components/admin/ImageUploadField";

interface BlogFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    post: BlogPostDB | null;
    onSuccess: () => void;
}

function todayISO() {
    return new Date().toISOString().slice(0, 10);
}

const emptyForm = {
    title: "",
    excerpt: "",
    content: "",
    cover_image: "",
    category: "",
    published_at: todayISO(),
};

export default function BlogFormDialog({
    open,
    onOpenChange,
    post,
    onSuccess,
}: BlogFormDialogProps) {
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        if (post) {
            setForm({
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                cover_image: post.cover_image,
                category: post.category,
                published_at: post.published_at.slice(0, 10) || todayISO(),
            });
        } else {
            setForm(emptyForm);
        }
    }, [post, open]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!form.title || !form.category) {
            showToast("error", "Le titre et la categorie sont obligatoires.");
            return;
        }

        setSaving(true);

        const payload = {
            title: form.title,
            excerpt: form.excerpt,
            content: form.content,
            cover_image: form.cover_image,
            category: form.category,
            published_at: form.published_at,
        };

        try {
            if (post) {
                await updateBlogPost(post.id, payload);
                showToast("success", "Article modifie avec succes.");
            } else {
                await createBlogPost(payload);
                showToast("success", "Article ajoute avec succes.");
            }
            onSuccess();
            onOpenChange(false);
        } catch {
            showToast("error", "Une erreur est survenue. Reessayez.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="font-display text-xl">
                        {post ? "Modifier l'article" : "Nouvel article"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="post-title">Titre</Label>
                        <Input
                            id="post-title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Comment choisir votre style"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="post-excerpt">Extrait</Label>
                        <Textarea
                            id="post-excerpt"
                            value={form.excerpt}
                            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                            placeholder="Court resume affiche sur la liste des articles"
                            rows={2}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="post-content">Contenu</Label>
                        <Textarea
                            id="post-content"
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            placeholder="Contenu complet de l'article"
                            rows={8}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="post-category">Categorie</Label>
                            <Input
                                id="post-category"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                placeholder="Style"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="post-date">Date de publication</Label>
                            <Input
                                id="post-date"
                                type="date"
                                value={form.published_at}
                                onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                            />
                        </div>
                    </div>

                    <ImageUploadField
                        id="blog-cover-image-upload"
                        label="Image de couverture"
                        value={form.cover_image}
                        onChange={(url) => setForm({ ...form, cover_image: url })}
                        folder="blog"
                    />

                    <DialogFooter className="mt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Annuler
                        </Button>
                        <Button type="submit" disabled={saving} className="gap-2">
                            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                            {saving ? "Enregistrement..." : "Enregistrer"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}