import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Package, Tag, FileText, Palette, Plus, Pencil, Trash2, Image as ImageIcon, Loader2, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAdmin } from "@/stores/useAdmin";
import { useTheme } from "@/stores/useTheme";
import { useToast } from "@/stores/useToast";
import {
    useAdminProducts,
    useAdminCategories,
    useAdminBlogPosts,
    useAdminSiteSettings,
    deleteProduct,
    deleteCategory,
    deleteBlogPost,
    updateSiteSettings,
    toggleFeatured,
} from "@/hooks/useSupabase";
import type { ProductDB, CategoryDB, BlogPostDB } from "@/lib/supabase";
import ProductFormDialog from "@/components/admin/ProductFormDialog";
import CategoryFormDialog from "@/components/admin/CategoryFormDialog";
import BlogFormDialog from "@/components/admin/BlogFormDialog";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUploadField from "@/components/admin/ImageUploadField";
import VideoUploadField from "@/components/admin/VideoUploadField";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { logout } = useAdmin();

    function handleLogout() {
        logout();
        navigate("/admin");
    }

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-muted/20">
            <div className="blob -right-40 -top-40 hidden h-96 w-96 bg-primary/30 md:block" />
            <div className="blob -left-40 top-96 hidden h-80 w-80 bg-secondary/25 md:block" style={{ animationDelay: "4s" }} />

            <header className="sticky top-0 z-50 glass px-4 py-4 shadow-sm md:px-6">
                <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-md">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="font-display text-lg font-semibold text-foreground">
                                JA Jí Yoū
                            </span>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                                Espace administrateur
                            </span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="gap-2 rounded-full border-border/50 font-semibold hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="hidden sm:inline">Deconnexion</span>
                    </Button>
                </div>
            </header>

            <main className="relative z-10 mx-auto max-w-7xl px-4 py-10 md:px-6">
                <StatsRow />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mt-12"
                >
                    <Tabs defaultValue="products" className="w-full">
                        <div className="-mx-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
                            <TabsList className="glass inline-flex w-max min-w-full gap-1 rounded-2xl p-1.5 md:w-fit md:min-w-0">
                                <TabsTrigger value="products" className="shrink-0 gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-md">
                                    <Package className="h-4 w-4" />
                                    Produits
                                </TabsTrigger>
                                <TabsTrigger value="featured" className="shrink-0 gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-md">
                                    <Star className="h-4 w-4" />
                                    Selection
                                </TabsTrigger>
                                <TabsTrigger value="categories" className="shrink-0 gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-md">
                                    <Tag className="h-4 w-4" />
                                    Categories
                                </TabsTrigger>
                                <TabsTrigger value="blog" className="shrink-0 gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-md">
                                    <FileText className="h-4 w-4" />
                                    Blog
                                </TabsTrigger>
                                <TabsTrigger value="appearance" className="shrink-0 gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-md">
                                    <ImageIcon className="h-4 w-4" />
                                    Apparence
                                </TabsTrigger>
                                <TabsTrigger value="theme" className="shrink-0 gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-md">
                                    <Palette className="h-4 w-4" />
                                    Theme
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="mt-8">
                            <TabsContent value="products"><ProductsTab /></TabsContent>
                            <TabsContent value="featured"><FeaturedTab /></TabsContent>
                            <TabsContent value="categories"><CategoriesTab /></TabsContent>
                            <TabsContent value="blog"><BlogTab /></TabsContent>
                            <TabsContent value="appearance"><AppearanceTab /></TabsContent>
                            <TabsContent value="theme"><ThemeTab /></TabsContent>
                        </div>
                    </Tabs>
                </motion.div>
            </main>
        </div>
    );
}

function StatsRow() {
    const { products } = useAdminProducts();
    const { categories } = useAdminCategories();
    const { posts } = useAdminBlogPosts();

    const stats = [
        { icon: Package, label: "Produits actifs", value: products.length },
        { icon: Tag, label: "Categories", value: categories.length },
        { icon: FileText, label: "Articles publies", value: posts.length },
        { icon: Sparkles, label: "Commandes", value: 0 },
    ];

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="flex items-center gap-5 rounded-3xl glass p-6 shadow-sm"
                >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-md">
                        <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-muted-foreground">{stat.label}</p>
                        <p className="font-display text-3xl font-bold text-foreground mt-1">
                            {stat.value}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

function SectionCard({
    title,
    action,
    children,
}: {
    title: string;
    action?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="overflow-hidden rounded-3xl glass shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/30 px-6 py-5 md:px-8">
                <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
                {action}
            </div>
            <div className="bg-background/40">{children}</div>
        </div>
    );
}

function ProductsTab() {
    const { products, loading, refetch } = useAdminProducts();
    const { categories } = useAdminCategories();
    const { showToast } = useToast();

    const [formOpen, setFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<ProductDB | null>(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState<ProductDB | null>(null);
    const [deleting, setDeleting] = useState(false);

    function openCreate() {
        setEditingProduct(null);
        setFormOpen(true);
    }

    function openEdit(product: ProductDB) {
        setEditingProduct(product);
        setFormOpen(true);
    }

    function askDelete(product: ProductDB) {
        setDeletingProduct(product);
        setConfirmOpen(true);
    }

    async function confirmDelete() {
        if (!deletingProduct) return;
        setDeleting(true);
        try {
            await deleteProduct(deletingProduct.id);
            showToast("success", "Produit supprime avec succes.");
            refetch();
            setConfirmOpen(false);
        } catch {
            showToast("error", "Impossible de supprimer ce produit.");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <SectionCard
            title="Gestion des produits"
            action={
                <Button
                    size="sm"
                    className="gap-2 rounded-full bg-gradient-to-r from-primary to-secondary font-semibold text-white shadow-md hover:opacity-90"
                    onClick={openCreate}
                >
                    <Plus className="h-4 w-4" />
                    Nouveau
                </Button>
            }
        >
            {loading ? (
                <div className="p-10 text-center text-sm text-muted-foreground">
                    Chargement des produits...
                </div>
            ) : products.length === 0 ? (
                <div className="p-10 text-center text-sm text-muted-foreground">
                    Aucun produit pour le moment.
                </div>
            ) : (
                <>
                    {/* Vue mobile : liste de cartes */}
                    <ul className="divide-y divide-white/20 sm:hidden">
                        {products.map((product) => (
                            <li key={product.id} className="flex items-center gap-3 px-4 py-4">
                                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted border border-white/30 shadow-sm">
                                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5">
                                        <p className="truncate font-bold text-foreground">{product.name}</p>
                                        {product.featured && <Star className="h-3.5 w-3.5 shrink-0 fill-secondary text-secondary" />}
                                    </div>
                                    <div className="mt-1 flex items-center gap-2">
                                        <span className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-0.5 text-[11px] font-semibold text-secondary">
                                            {product.categories?.name || "-"}
                                        </span>
                                        <span className="text-sm font-bold text-gradient">
                                            {product.price.toLocaleString()} FCFA
                                        </span>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-1">
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" onClick={() => openEdit(product)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-full text-destructive hover:bg-destructive/10" onClick={() => askDelete(product)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Vue desktop : tableau */}
                    <div className="hidden sm:block">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-white/30">
                                    <TableHead className="px-6 py-4 font-semibold text-foreground md:px-8">Produit</TableHead>
                                    <TableHead className="font-semibold text-foreground">Categorie</TableHead>
                                    <TableHead className="font-semibold text-foreground">Prix</TableHead>
                                    <TableHead className="text-right px-6 font-semibold text-foreground md:px-8">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id} className="border-white/20 hover:bg-primary/5 transition-colors">
                                        <TableCell className="px-6 py-4 md:px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted border border-white/30 shadow-sm">
                                                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-foreground">{product.name}</span>
                                                    {product.featured && (
                                                        <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">
                                                {product.categories?.name || "-"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-bold text-gradient">
                                            {product.price.toLocaleString()} FCFA
                                        </TableCell>
                                        <TableCell className="text-right px-6 md:px-8">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10" onClick={() => openEdit(product)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10" onClick={() => askDelete(product)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}

            <ProductFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                product={editingProduct}
                categories={categories}
                onSuccess={refetch}
            />

            <ConfirmDialog
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                title="Supprimer ce produit ?"
                description={
                    "Cette action est irreversible. " +
                    (deletingProduct ? "Le produit \"" + deletingProduct.name + "\" sera definitivement supprime." : "")
                }
                onConfirm={confirmDelete}
                loading={deleting}
            />
        </SectionCard>
    );
}

function CategoriesTab() {
    const { categories, loading, refetch } = useAdminCategories();
    const { showToast } = useToast();

    const [formOpen, setFormOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<CategoryDB | null>(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deletingCategory, setDeletingCategory] = useState<CategoryDB | null>(null);
    const [deleting, setDeleting] = useState(false);

    function openCreate() {
        setEditingCategory(null);
        setFormOpen(true);
    }

    function openEdit(category: CategoryDB) {
        setEditingCategory(category);
        setFormOpen(true);
    }

    function askDelete(category: CategoryDB) {
        setDeletingCategory(category);
        setConfirmOpen(true);
    }

    async function confirmDelete() {
        if (!deletingCategory) return;
        setDeleting(true);
        try {
            await deleteCategory(deletingCategory.id);
            showToast("success", "Categorie supprimee avec succes.");
            refetch();
            setConfirmOpen(false);
        } catch {
            showToast("error", "Impossible de supprimer cette categorie. Verifiez qu'aucun produit n'y est lie.");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <SectionCard
            title="Gestion des categories"
            action={
                <Button
                    size="sm"
                    className="gap-2 rounded-full bg-gradient-to-r from-primary to-secondary font-semibold text-white shadow-md hover:opacity-90"
                    onClick={openCreate}
                >
                    <Plus className="h-4 w-4" />
                    Nouvelle
                </Button>
            }
        >
            {loading ? (
                <div className="p-10 text-center text-sm text-muted-foreground">
                    Chargement des categories...
                </div>
            ) : categories.length === 0 ? (
                <div className="p-10 text-center text-sm text-muted-foreground">
                    Aucune categorie pour le moment.
                </div>
            ) : (
                <>
                    {/* Vue mobile : liste de cartes */}
                    <ul className="divide-y divide-white/20 sm:hidden">
                        {categories.map((cat) => (
                            <li key={cat.id} className="flex items-center gap-3 px-4 py-4">
                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted border border-white/30 shadow-sm">
                                    <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-bold text-foreground">{cat.name}</p>
                                    <p className="truncate font-mono text-xs text-muted-foreground">{cat.slug}</p>
                                </div>
                                <div className="flex shrink-0 items-center gap-1">
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" onClick={() => openEdit(cat)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-full text-destructive hover:bg-destructive/10" onClick={() => askDelete(cat)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Vue desktop : tableau */}
                    <div className="hidden sm:block">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-white/30">
                                    <TableHead className="px-6 py-4 font-semibold text-foreground md:px-8">Nom</TableHead>
                                    <TableHead className="font-semibold text-foreground">Slug (URL)</TableHead>
                                    <TableHead className="text-right px-6 font-semibold text-foreground md:px-8">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((cat) => (
                                    <TableRow key={cat.id} className="border-white/20 hover:bg-primary/5 transition-colors">
                                        <TableCell className="px-6 py-4 font-bold text-foreground md:px-8">{cat.name}</TableCell>
                                        <TableCell className="text-muted-foreground font-mono text-sm">{cat.slug}</TableCell>
                                        <TableCell className="text-right px-6 md:px-8">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10" onClick={() => openEdit(cat)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10" onClick={() => askDelete(cat)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}

            <CategoryFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                category={editingCategory}
                onSuccess={refetch}
            />

            <ConfirmDialog
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                title="Supprimer cette categorie ?"
                description={
                    "Cette action est irreversible. " +
                    (deletingCategory ? "La categorie \"" + deletingCategory.name + "\" sera definitivement supprimee." : "")
                }
                onConfirm={confirmDelete}
                loading={deleting}
            />
        </SectionCard>
    );
}

function BlogTab() {
    const { posts, loading, refetch } = useAdminBlogPosts();
    const { showToast } = useToast();

    const [formOpen, setFormOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPostDB | null>(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deletingPost, setDeletingPost] = useState<BlogPostDB | null>(null);
    const [deleting, setDeleting] = useState(false);

    function openCreate() {
        setEditingPost(null);
        setFormOpen(true);
    }

    function openEdit(post: BlogPostDB) {
        setEditingPost(post);
        setFormOpen(true);
    }

    function askDelete(post: BlogPostDB) {
        setDeletingPost(post);
        setConfirmOpen(true);
    }

    async function confirmDelete() {
        if (!deletingPost) return;
        setDeleting(true);
        try {
            await deleteBlogPost(deletingPost.id);
            showToast("success", "Article supprime avec succes.");
            refetch();
            setConfirmOpen(false);
        } catch {
            showToast("error", "Impossible de supprimer cet article.");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <SectionCard
            title="Articles de blog"
            action={
                <Button
                    size="sm"
                    className="gap-2 rounded-full bg-gradient-to-r from-primary to-secondary font-semibold text-white shadow-md hover:opacity-90"
                    onClick={openCreate}
                >
                    <Plus className="h-4 w-4" />
                    Nouveau
                </Button>
            }
        >
            {loading ? (
                <div className="p-10 text-center text-sm text-muted-foreground">
                    Chargement des articles...
                </div>
            ) : posts.length === 0 ? (
                <div className="p-10 text-center text-sm text-muted-foreground">
                    Aucun article pour le moment.
                </div>
            ) : (
                <>
                    {/* Vue mobile : liste de cartes */}
                    <ul className="divide-y divide-white/20 sm:hidden">
                        {posts.map((post) => (
                            <li key={post.id} className="flex items-center gap-3 px-4 py-4">
                                <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-muted border border-white/30">
                                    <img src={post.cover_image} alt={post.title} className="h-full w-full object-cover" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-bold text-foreground">{post.title}</p>
                                    <div className="mt-1 flex items-center gap-2">
                                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{post.published_at}</span>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-1">
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" onClick={() => openEdit(post)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-full text-destructive hover:bg-destructive/10" onClick={() => askDelete(post)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Vue desktop : tableau */}
                    <div className="hidden sm:block">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-white/30">
                                    <TableHead className="px-6 py-4 font-semibold text-foreground md:px-8">Titre</TableHead>
                                    <TableHead className="font-semibold text-foreground">Categorie</TableHead>
                                    <TableHead className="font-semibold text-foreground">Date</TableHead>
                                    <TableHead className="text-right px-6 font-semibold text-foreground md:px-8">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.map((post) => (
                                    <TableRow key={post.id} className="border-white/20 hover:bg-primary/5 transition-colors">
                                        <TableCell className="px-6 py-4 md:px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-16 shrink-0 overflow-hidden rounded-lg bg-muted border border-white/30">
                                                    <img src={post.cover_image} alt={post.title} className="h-full w-full object-cover" />
                                                </div>
                                                <span className="font-bold text-foreground max-w-[10rem] truncate md:max-w-xs">{post.title}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                                                {post.category}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground font-medium text-sm">
                                            {post.published_at}
                                        </TableCell>
                                        <TableCell className="text-right px-6 md:px-8">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10" onClick={() => openEdit(post)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10" onClick={() => askDelete(post)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}

            <BlogFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                post={editingPost}
                onSuccess={refetch}
            />

            <ConfirmDialog
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                title="Supprimer cet article ?"
                description={
                    "Cette action est irreversible. " +
                    (deletingPost ? "L'article \"" + deletingPost.title + "\" sera definitivement supprime." : "")
                }
                onConfirm={confirmDelete}
                loading={deleting}
            />
        </SectionCard>
    );
}

function FeaturedTab() {
    const { products, loading, refetch } = useAdminProducts();
    const { showToast } = useToast();
    const [savingId, setSavingId] = useState<number | null>(null);

    const featuredCount = products.filter((p) => p.featured).length;

    async function handleToggle(product: ProductDB) {
        setSavingId(product.id);
        try {
            await toggleFeatured(product);
            refetch();
        } catch {
            showToast("error", "Impossible de mettre a jour la selection.");
        } finally {
            setSavingId(null);
        }
    }

    return (
        <SectionCard title="La Selection (page d'accueil)">
            <div className="border-b border-white/30 px-6 py-4 text-sm text-muted-foreground md:px-8">
                {featuredCount} produit{featuredCount > 1 ? "s" : ""} actuellement mis en avant sur la page d'accueil.
                Idealement entre 4 et 8 pieces pour un rendu equilibre. Tant qu'aucun produit n'est selectionne, les plus recents s'affichent par defaut.
            </div>

            {loading ? (
                <div className="p-10 text-center text-sm text-muted-foreground">
                    Chargement des produits...
                </div>
            ) : products.length === 0 ? (
                <div className="p-10 text-center text-sm text-muted-foreground">
                    Aucun produit pour le moment. Ajoute d'abord des produits dans l'onglet "Produits".
                </div>
            ) : (
                <ul className="divide-y divide-white/20">
                    {products.map((product) => (
                        <li key={product.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 md:px-8">
                            <div className="flex min-w-0 flex-1 items-center gap-4">
                                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted border border-white/30 shadow-sm">
                                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-bold text-foreground">{product.name}</p>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {product.categories?.name || "-"} · {product.price.toLocaleString()} FCFA
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleToggle(product)}
                                disabled={savingId === product.id}
                                className={
                                    "flex shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all disabled:opacity-50 " +
                                    (product.featured
                                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                                        : "border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary")
                                }
                            >
                                {savingId === product.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Star className={"h-4 w-4 " + (product.featured ? "fill-current" : "")} />
                                )}
                                {product.featured ? "En vedette" : "Mettre en avant"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </SectionCard>
    );
}

function AppearanceTab() {
    const { settings, loading, refetch } = useAdminSiteSettings();
    const [logoUrl, setLogoUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [saving, setSaving] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        if (settings) {
            setLogoUrl(settings.logo_url || "");
            setVideoUrl(settings.hero_video_url || "");
        }
    }, [settings]);

    async function handleSave() {
        setSaving(true);
        try {
            await updateSiteSettings({
                logo_url: logoUrl || null,
                hero_video_url: videoUrl || null,
            });
            showToast("success", "Apparence mise a jour avec succes.");
            refetch();
        } catch {
            showToast("error", "Erreur lors de la mise a jour.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="rounded-3xl glass p-8 shadow-sm max-w-xl">
                <p className="text-sm text-muted-foreground">Chargement...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 max-w-xl">
            <div className="rounded-3xl glass p-8 shadow-sm">
                <h3 className="font-display text-2xl font-bold mb-2">Logo de la boutique</h3>
                <p className="text-sm text-muted-foreground mb-6">
                    Ce logo remplacera le texte "JA Jí Yoū" dans l'en-tete et le pied de page du site.
                    Sans logo, le texte s'affiche automatiquement.
                </p>

                <ImageUploadField
                    id="logo-upload"
                    label="Logo"
                    value={logoUrl}
                    onChange={setLogoUrl}
                    folder="branding"
                />
            </div>

            <div className="rounded-3xl glass p-8 shadow-sm">
                <h3 className="font-display text-2xl font-bold mb-2">Video de fond (page d'accueil)</h3>
                <p className="text-sm text-muted-foreground mb-6">
                    Cette video s'affichera en arriere-plan de la section principale de la page d'accueil,
                    en boucle et sans son. Sans video, le fond degrade actuel s'affiche.
                </p>

                <VideoUploadField
                    id="hero-video-upload"
                    label="Video de fond"
                    value={videoUrl}
                    onChange={setVideoUrl}
                    folder="hero"
                />
            </div>

            <Button
                onClick={handleSave}
                disabled={saving}
                className="gap-2 rounded-full h-12 text-base font-bold self-start px-8 bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:opacity-90"
            >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
        </div>
    );
}

function ThemeTab() {
    const { colors, setColors } = useTheme();
    const [primary, setPrimary] = useState(colors.primary);
    const [secondary, setSecondary] = useState(colors.secondary);
    const [saved, setSaved] = useState(false);

    const presets = [
        { label: "Violet + Orange (defaut)", primary: "258 90% 66%", secondary: "24 95% 53%" },
        { label: "Rose + Violet", primary: "330 81% 60%", secondary: "263 70% 50%" },
        { label: "Bleu + Turquoise", primary: "217 91% 60%", secondary: "172 66% 50%" },
        { label: "Or + Noir profond", primary: "38 92% 50%", secondary: "258 25% 20%" },
        { label: "Emeraude + Orange", primary: "142 71% 35%", secondary: "24 95% 53%" },
    ];

    function handleSave() {
        setColors({ primary, secondary });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    function applyPreset(preset: { primary: string; secondary: string }) {
        setPrimary(preset.primary);
        setSecondary(preset.secondary);
        setColors({ primary: preset.primary, secondary: preset.secondary });
    }

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-3xl glass p-8 shadow-sm">
                <h3 className="font-display text-2xl font-bold mb-6">Couleurs sur-mesure</h3>

                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <Label className="text-base font-semibold">Couleur principale (Primary)</Label>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                            Format HSL (ex: 258 90% 66%)
                        </p>
                        <div className="flex gap-4 items-center">
                            <div
                                className="h-14 w-14 shrink-0 rounded-2xl border border-white/40 shadow-inner"
                                style={{ backgroundColor: "hsl(" + primary + ")" }}
                            />
                            <Input
                                value={primary}
                                onChange={(e) => setPrimary(e.target.value)}
                                placeholder="258 90% 66%"
                                className="h-12 rounded-xl text-base bg-background/60"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label className="text-base font-semibold">Couleur secondaire (Secondary)</Label>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                            Format HSL (ex: 24 95% 53%)
                        </p>
                        <div className="flex gap-4 items-center">
                            <div
                                className="h-14 w-14 shrink-0 rounded-2xl border border-white/40 shadow-inner"
                                style={{ backgroundColor: "hsl(" + secondary + ")" }}
                            />
                            <Input
                                value={secondary}
                                onChange={(e) => setSecondary(e.target.value)}
                                placeholder="24 95% 53%"
                                className="h-12 rounded-xl text-base bg-background/60"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={handleSave}
                        className="mt-4 rounded-full h-12 text-base font-bold shadow-md transition-all hover:-translate-y-0.5 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
                    >
                        {saved ? "Sauvegarde avec succes !" : "Appliquer les couleurs"}
                    </Button>
                </div>
            </div>

            <div className="rounded-3xl glass p-8 shadow-sm">
                <h3 className="font-display text-2xl font-bold mb-6">Themes predefinis</h3>
                <div className="flex flex-col gap-3">
                    {presets.map((preset) => (
                        <button
                            key={preset.label}
                            onClick={() => applyPreset(preset)}
                            className="group flex items-center justify-between rounded-2xl border border-white/30 bg-background/40 p-4 text-left transition-all hover:bg-primary/5 hover:shadow-sm"
                        >
                            <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                                {preset.label}
                            </span>
                            <div className="flex gap-2">
                                <div
                                    className="h-8 w-8 rounded-full border border-white/40 shadow-sm"
                                    style={{ backgroundColor: "hsl(" + preset.primary + ")" }}
                                />
                                <div
                                    className="h-8 w-8 rounded-full border border-white/40 shadow-sm"
                                    style={{ backgroundColor: "hsl(" + preset.secondary + ")" }}
                                />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}