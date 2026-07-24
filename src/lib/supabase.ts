import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type CategoryDB = {
    id: number;
    name: string;
    slug: string;
    image: string;
    created_at: string;
};

export type ProductDB = {
    id: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
    image: string;
    featured: boolean;
    created_at: string;
    categories?: { name: string; slug: string };
};

export type BlogPostDB = {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    cover_image: string;
    category: string;
    published_at: string;
    created_at: string;
};

export type SiteSettingsDB = {
    id: number;
    logo_url: string | null;
    hero_video_url: string | null;
};