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
import { Loader2 } from "lucide-react";
import { createCategory, updateCategory } from "@/hooks/useSupabase";
import type { CategoryDB } from "@/lib/supabase";
import { useToast } from "@/stores/useToast";
import ImageUploadField from "@/components/admin/ImageUploadField";

interface CategoryFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: CategoryDB | null;
    onSuccess: () => void;
}

const emptyForm = {
    name: "",
    slug: "",
    image: "",
};

function slugify(text: string) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export default function CategoryFormDialog({
    open,
    onOpenChange,
    category,
    onSuccess,
}: CategoryFormDialogProps) {
    const [form, setForm] = useState(emptyForm);
    const [slugTouched, setSlugTouched] = useState(false);
    const [saving, setSaving] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        if (category) {
            setForm({
                name: category.name,
                slug: category.slug,
                image: category.image,
            });
            setSlugTouched(true);
        } else {
            setForm(emptyForm);
            setSlugTouched(false);
        }
    }, [category, open]);

    function handleNameChange(value: string) {
        setForm((prev) => ({
            ...prev,
            name: value,
            slug: slugTouched ? prev.slug : slugify(value),
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!form.name || !form.slug) {
            showToast("error", "Le nom et le slug sont obligatoires.");
            return;
        }

        setSaving(true);

        const payload = {
            name: form.name,
            slug: form.slug,
            image: form.image,
        };

        try {
            if (category) {
                await updateCategory(category.id, payload);
                showToast("success", "Categorie modifiee avec succes.");
            } else {
                await createCategory(payload);
                showToast("success", "Categorie ajoutee avec succes.");
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
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-display text-xl">
                        {category ? "Modifier la categorie" : "Nouvelle categorie"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="cat-name">Nom</Label>
                        <Input
                            id="cat-name"
                            value={form.name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            placeholder="Mode"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="cat-slug">Slug (URL)</Label>
                        <Input
                            id="cat-slug"
                            value={form.slug}
                            onChange={(e) => {
                                setSlugTouched(true);
                                setForm({ ...form, slug: e.target.value });
                            }}
                            placeholder="mode"
                            required
                        />
                    </div>

                    <ImageUploadField
                        id="category-image-upload"
                        label="Image de la categorie"
                        value={form.image}
                        onChange={(url) => setForm({ ...form, image: url })}
                        folder="categories"
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