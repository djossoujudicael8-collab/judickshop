import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, VideoOff, X } from "lucide-react";
import { uploadVideo } from "@/lib/storage";
import { useToast } from "@/stores/useToast";

interface VideoUploadFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (url: string) => void;
    folder: string;
}

export default function VideoUploadField({
    id,
    label,
    value,
    onChange,
    folder,
}: VideoUploadFieldProps) {
    const [uploading, setUploading] = useState(false);
    const { showToast } = useToast();

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 20 * 1024 * 1024) {
            showToast("error", "La video ne doit pas depasser 20 Mo.");
            e.target.value = "";
            return;
        }

        setUploading(true);
        try {
            const url = await uploadVideo(file, folder);
            onChange(url);
            showToast("success", "Video televersee avec succes.");
        } catch {
            showToast("error", "Erreur lors du televersement de la video.");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <Label>{label}</Label>

            {value ? (
                <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-border/50 bg-muted/30">
                    <video
                        src={value}
                        className="h-40 w-full object-cover"
                        muted
                        loop
                        autoPlay
                        playsInline
                    />
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute top-2 right-2 rounded-full bg-background/90 p-1.5 text-foreground shadow-md hover:bg-destructive hover:text-white transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <div className="flex h-24 w-full max-w-sm items-center justify-center rounded-xl border border-dashed border-border/50 bg-muted/20 text-muted-foreground">
                    <VideoOff className="h-6 w-6" />
                </div>
            )}

            <div>
                <input
                    id={id}
                    type="file"
                    accept="video/*"
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
                            ? "Changer la video"
                            : "Choisir une video"}
                </Button>
            </div>

            <p className="text-xs text-muted-foreground">
                Format recommande : MP4, courte (5 a 15 secondes), moins de 20 Mo.
                Elle sera lue automatiquement, en boucle et sans son.
            </p>
        </div>
    );
}