import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { CategoryDB, ProductDB, BlogPostDB } from "@/lib/supabase";

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