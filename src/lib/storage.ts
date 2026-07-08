import { supabase } from "@/lib/supabase";

export async function uploadFile(
    file: File,
    folder: string,
    bucket: string
): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const randomPart = Date.now() + "-" + Math.random().toString(36).slice(2);
    const fileName = folder + "/" + randomPart + "." + fileExt;

    const { error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
        });

    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);

    return data.publicUrl;
}

export async function uploadImage(file: File, folder: string): Promise<string> {
    return uploadFile(file, folder, "images");
}

export async function uploadVideo(file: File, folder: string): Promise<string> {
    return uploadFile(file, folder, "videos");
}