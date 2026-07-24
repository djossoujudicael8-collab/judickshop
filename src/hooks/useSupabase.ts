import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { CategoryDB, ProductDB, BlogPostDB, SiteSettingsDB } from "@/lib/supabase";

/* ------------------------------------------------------------------ */
/* Hooks de lecture publics (catalogue, blog, fiches produit)         */
/* ------------------------------------------------------------------ */

export function useCategories() {
    const [categories, setCategories] = useState<CategoryDB[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase
            .from("categories")
            .select("*")
            .order("name")
            .then(({ data }) => {
                if (data) setCategories(data);
                setLoading(false);
            });
    }, []);

    return { categories, loading };
}

export function useProducts(categorySlug?: string, search?: string) {
    const [products, setProducts] = useState<ProductDB[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);

            let categoryId: number | undefined;

            if (categorySlug) {
                const { data: cat } = await supabase
                    .from("categories")
                    .select("id")
                    .eq("slug", categorySlug)
                    .single();
                if (cat) categoryId = cat.id;
            }

            let query = supabase
                .from("products")
                .select("*, categories(name, slug)")
                .order("created_at", { ascending: false });

            if (categoryId) {
                query = query.eq("category_id", categoryId);
            }

            if (search) {
                query = query.ilike("name", "%" + search + "%");
            }

            const { data } = await query;
            if (data) setProducts(data);
            setLoading(false);
        }

        fetchProducts();
    }, [categorySlug, search]);

    return { products, loading };
}

export function useFeaturedProducts() {
    const [products, setProducts] = useState<ProductDB[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase
            .from("products")
            .select("*, categories(name, slug)")
            .eq("featured", true)
            .order("created_at", { ascending: false })
            .then(({ data }) => {
                if (data) setProducts(data);
                setLoading(false);
            });
    }, []);

    return { products, loading };
}

export function useProduct(id: number) {
    const [product, setProduct] = useState<ProductDB | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase
            .from("products")
            .select("*, categories(name, slug)")
            .eq("id", id)
            .single()
            .then(({ data }) => {
                if (data) setProduct(data);
                setLoading(false);
            });
    }, [id]);

    return { product, loading };
}

export function useRelatedProducts(categoryId: number, excludeId: number) {
    const [products, setProducts] = useState<ProductDB[]>([]);

    useEffect(() => {
        supabase
            .from("products")
            .select("*, categories(name, slug)")
            .eq("category_id", categoryId)
            .neq("id", excludeId)
            .limit(4)
            .then(({ data }) => {
                if (data) setProducts(data);
            });
    }, [categoryId, excludeId]);

    return { products };
}

export function useBlogPosts() {
    const [posts, setPosts] = useState<BlogPostDB[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase
            .from("blog_posts")
            .select("*")
            .order("published_at", { ascending: false })
            .then(({ data }) => {
                if (data) setPosts(data);
                setLoading(false);
            });
    }, []);

    return { posts, loading };
}

export function useBlogPost(id: number) {
    const [post, setPost] = useState<BlogPostDB | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase
            .from("blog_posts")
            .select("*")
            .eq("id", id)
            .single()
            .then(({ data }) => {
                if (data) setPost(data);
                setLoading(false);
            });
    }, [id]);

    return { post, loading };
}

export function useRelatedPosts(excludeId: number) {
    const [posts, setPosts] = useState<BlogPostDB[]>([]);

    useEffect(() => {
        supabase
            .from("blog_posts")
            .select("*")
            .neq("id", excludeId)
            .limit(2)
            .then(({ data }) => {
                if (data) setPosts(data);
            });
    }, [excludeId]);

    return { posts };
}

export function useSiteSettings() {
    const [settings, setSettings] = useState<SiteSettingsDB | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase
            .from("site_settings")
            .select("*")
            .eq("id", 1)
            .single()
            .then(({ data }) => {
                if (data) setSettings(data);
                setLoading(false);
            });
    }, []);

    return { settings, loading };
}

/* ------------------------------------------------------------------ */
/* Hooks de lecture pour l'admin (listes completes + refetch manuel)  */
/* ------------------------------------------------------------------ */

export function useAdminCategories() {
    const [categories, setCategories] = useState<CategoryDB[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchCategories() {
        setLoading(true);
        const { data } = await supabase
            .from("categories")
            .select("*")
            .order("name");
        if (data) setCategories(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, loading, refetch: fetchCategories };
}

export function useAdminProducts() {
    const [products, setProducts] = useState<ProductDB[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchProducts() {
        setLoading(true);
        const { data } = await supabase
            .from("products")
            .select("*, categories(name, slug)")
            .order("created_at", { ascending: false });
        if (data) setProducts(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, loading, refetch: fetchProducts };
}

export function useAdminBlogPosts() {
    const [posts, setPosts] = useState<BlogPostDB[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchPosts() {
        setLoading(true);
        const { data } = await supabase
            .from("blog_posts")
            .select("*")
            .order("published_at", { ascending: false });
        if (data) setPosts(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return { posts, loading, refetch: fetchPosts };
}

export function useAdminSiteSettings() {
    const [settings, setSettings] = useState<SiteSettingsDB | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchSettings() {
        setLoading(true);
        const { data } = await supabase
            .from("site_settings")
            .select("*")
            .eq("id", 1)
            .single();
        if (data) setSettings(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchSettings();
    }, []);

    return { settings, loading, refetch: fetchSettings };
}

/* ------------------------------------------------------------------ */
/* Fonctions CRUD - Categories                                        */
/* ------------------------------------------------------------------ */

export type CategoryInput = {
    name: string;
    slug: string;
    image: string;
};

export async function createCategory(input: CategoryInput) {
    const { data, error } = await supabase
        .from("categories")
        .insert(input)
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function updateCategory(id: number, input: CategoryInput) {
    const { data, error } = await supabase
        .from("categories")
        .update(input)
        .eq("id", id)
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function deleteCategory(id: number) {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw error;
}

/* ------------------------------------------------------------------ */
/* Fonctions CRUD - Produits                                          */
/* ------------------------------------------------------------------ */

export type ProductInput = {
    name: string;
    description: string;
    price: number;
    category_id: number;
    image: string;
    featured?: boolean;
};

export async function createProduct(input: ProductInput) {
    const { data, error } = await supabase
        .from("products")
        .insert(input)
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function updateProduct(id: number, input: ProductInput) {
    const { data, error } = await supabase
        .from("products")
        .update(input)
        .eq("id", id)
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function deleteProduct(id: number) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
}

export async function toggleFeatured(product: ProductDB) {
    const { data, error } = await supabase
        .from("products")
        .update({ featured: !product.featured })
        .eq("id", product.id)
        .select()
        .single();
    if (error) throw error;
    return data;
}

/* ------------------------------------------------------------------ */
/* Fonctions CRUD - Articles de blog                                  */
/* ------------------------------------------------------------------ */

export type BlogPostInput = {
    title: string;
    excerpt: string;
    content: string;
    cover_image: string;
    category: string;
    published_at: string;
};

export async function createBlogPost(input: BlogPostInput) {
    const { data, error } = await supabase
        .from("blog_posts")
        .insert(input)
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function updateBlogPost(id: number, input: BlogPostInput) {
    const { data, error } = await supabase
        .from("blog_posts")
        .update(input)
        .eq("id", id)
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function deleteBlogPost(id: number) {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
}

/* ------------------------------------------------------------------ */
/* Fonctions - Parametres du site (logo, video de fond)               */
/* ------------------------------------------------------------------ */

export type SiteSettingsInput = {
    logo_url?: string | null;
    hero_video_url?: string | null;
};

export async function updateSiteSettings(input: SiteSettingsInput) {
    const { data, error } = await supabase
        .from("site_settings")
        .update(input)
        .eq("id", 1)
        .select()
        .single();
    if (error) throw error;
    return data;
}