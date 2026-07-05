import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, ImageOff } from "lucide-react";
import { uploadImage } from "@/lib/storage";
import { useToast } from "@/stores/useToast";

interface ImageUploadFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (url: string) => void;
    folder: string;
}

export default function ImageUploadField({
    id,
    label,
    value,
    onChange,
    folder,
}: ImageUploadFieldProps) {
    const [uploading, setUploading] = useState(false);
    const { showToast } = useToast();

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            showToast("error", "L'image ne doit pas depasser 5 Mo.");
            e.target.value = "";
            return;
        }

        setUploading(true);
        try {
            const url = await uploadImage(file, folder);
            onChange(url);
            showToast("success", "Image televersee avec succes.");
        } catch {
            showToast("error", "Erreur lors du televersement de l'image.");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <Label>{label}</Label>
            <div className="flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border/50 bg-muted/30 flex items-center justify-center">
                    {value ? (
                        <img src={value} alt="Apercu" className="h-full w-full object-cover" />
                    ) : (
                        <ImageOff className="h-6 w-6 text-muted-foreground/50" />
                    )}
                </div>

                <div className="flex-1">
                    <input
                        id={id}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="hidden"
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={uploading}
                        className="gap-2"
                        onClick={() => document.getElementById(id)?.click()}
                    >
                        {uploading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Upload className="h-4 w-4" />
                        )}
                        {uploading
                            ? "Televersement..."
                            : value
                                ? "Changer l'image"
                                : "Choisir une image"}
                    </Button>
                </div>
            </div>
        </div>
    );
}