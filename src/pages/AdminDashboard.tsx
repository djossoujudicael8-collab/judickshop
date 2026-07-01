import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Package, Tag, FileText, Palette, Plus, Pencil, Trash2, LayoutDashboard } from "lucide-react";
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
import { mockProducts, mockCategories, mockBlogPosts } from "@/data/mock";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { logout } = useAdmin();

    function handleLogout() {
        logout();
        navigate("/admin");
    }

    return (
        <div className="min-h-screen bg-muted/20">
            {/* Header Admin Glassmorphism */}
            <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md px-6 py-4 shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                            <LayoutDashboard className="h-5 w-5" />
                        </div>
                        <span className="font-display text-xl font-bold">
                            JUDICK<span className="text-primary">SHOP</span>
                        </span>
                        <span className="ml-2 hidden rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground md:inline-block">
                            Espace Administrateur
                        </span>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 rounded-full font-semibold border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors">
                        <LogOut className="h-4 w-4" />
                        Déconnexion
                    </Button>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
                <StatsRow />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-12"
                >
                    <Tabs defaultValue="products" className="w-full">
                        <TabsList className="mb-8 p-1 bg-muted/50 rounded-2xl inline-flex shadow-sm border border-border/30">
                            <TabsTrigger value="products" className="gap-2 rounded-xl px-6 py-2.5 data-[state=active]:shadow-sm">
                                <Package className="h-4 w-4" />
                                Produits
                            </TabsTrigger>
                            <TabsTrigger value="categories" className="gap-2 rounded-xl px-6 py-2.5 data-[state=active]:shadow-sm">
                                <Tag className="h-4 w-4" />
                                Catégories
                            </TabsTrigger>
                            <TabsTrigger value="blog" className="gap-2 rounded-xl px-6 py-2.5 data-[state=active]:shadow-sm">
                                <FileText className="h-4 w-4" />
                                Blog
                            </TabsTrigger>
                            <TabsTrigger value="theme" className="gap-2 rounded-xl px-6 py-2.5 data-[state=active]:shadow-sm">
                                <Palette className="h-4 w-4" />
                                Thème
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="products"><ProductsTab /></TabsContent>
                        <TabsContent value="categories"><CategoriesTab /></TabsContent>
                        <TabsContent value="blog"><BlogTab /></TabsContent>
                        <TabsContent value="theme"><ThemeTab /></TabsContent>
                    </Tabs>
                </motion.div>
            </main>
        </div>
    );
}

function StatsRow() {
    const stats = [
        { icon: Package, label: "Produits Actifs", value: mockProducts.length, color: "text-blue-500", bg: "bg-blue-500/10" },
        { icon: Tag, label: "Catégories", value: mockCategories.length, color: "text-purple-500", bg: "bg-purple-500/10" },
        { icon: FileText, label: "Articles Publiés", value: mockBlogPosts.length, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { icon: Package, label: "Commandes", value: 0, color: "text-orange-500", bg: "bg-orange-500/10" },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-5 rounded-3xl bg-card p-6 shadow-sm border border-border/40"
                >
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${stat.bg}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-muted-foreground">{stat.label}</p>
                        <p className="font-display text-3xl font-bold text-foreground mt-1">
                            {stat.value}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

function ProductsTab() {
    return (
        <div className="overflow-hidden rounded-3xl bg-card border border-border/40 shadow-sm">
            <div className="flex items-center justify-between border-b border-border/40 bg-muted/10 px-8 py-5">
                <h3 className="font-display text-xl font-bold">Gestion des Produits</h3>
                <Button size="sm" className="gap-2 rounded-full font-semibold shadow-md">
                    <Plus className="h-4 w-4" />
                    Nouveau
                </Button>
            </div>
            <div className="p-0">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow className="hover:bg-transparent border-border/40">
                            <TableHead className="px-8 py-4 font-semibold text-foreground">Produit</TableHead>
                            <TableHead className="font-semibold text-foreground">Catégorie</TableHead>
                            <TableHead className="font-semibold text-foreground">Prix</TableHead>
                            <TableHead className="text-right px-8 font-semibold text-foreground">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockProducts.map((product) => (
                            <TableRow key={product.id} className="border-border/20 hover:bg-muted/30 transition-colors">
                                <TableCell className="px-8 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted border border-border/40 shadow-sm">
                                            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-foreground">{product.name}</span>
                                            <span className="text-xs text-muted-foreground font-medium">Réf: {product.sku}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">
                                        {product.categoryName}
                                    </span>
                                </TableCell>
                                <TableCell className="font-bold text-primary">
                                    {product.price.toLocaleString()} FCFA
                                </TableCell>
                                <TableCell className="text-right px-8">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-foreground/5">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function CategoriesTab() {
    return (
        <div className="overflow-hidden rounded-3xl bg-card border border-border/40 shadow-sm">
            <div className="flex items-center justify-between border-b border-border/40 bg-muted/10 px-8 py-5">
                <h3 className="font-display text-xl font-bold">Gestion des Catégories</h3>
                <Button size="sm" className="gap-2 rounded-full font-semibold shadow-md">
                    <Plus className="h-4 w-4" />
                    Nouvelle
                </Button>
            </div>
            <div className="p-0">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow className="hover:bg-transparent border-border/40">
                            <TableHead className="px-8 py-4 font-semibold text-foreground">Nom</TableHead>
                            <TableHead className="font-semibold text-foreground">Slug (URL)</TableHead>
                            <TableHead className="text-right px-8 font-semibold text-foreground">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockCategories.map((cat) => (
                            <TableRow key={cat.id} className="border-border/20 hover:bg-muted/30 transition-colors">
                                <TableCell className="px-8 py-4 font-bold text-foreground">{cat.name}</TableCell>
                                <TableCell className="text-muted-foreground font-mono text-sm">{cat.slug}</TableCell>
                                <TableCell className="text-right px-8">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-foreground/5">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function BlogTab() {
    return (
        <div className="overflow-hidden rounded-3xl bg-card border border-border/40 shadow-sm">
            <div className="flex items-center justify-between border-b border-border/40 bg-muted/10 px-8 py-5">
                <h3 className="font-display text-xl font-bold">Articles de Blog</h3>
                <Button size="sm" className="gap-2 rounded-full font-semibold shadow-md">
                    <Plus className="h-4 w-4" />
                    Nouveau
                </Button>
            </div>
            <div className="p-0">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow className="hover:bg-transparent border-border/40">
                            <TableHead className="px-8 py-4 font-semibold text-foreground">Titre</TableHead>
                            <TableHead className="font-semibold text-foreground">Catégorie</TableHead>
                            <TableHead className="font-semibold text-foreground">Date</TableHead>
                            <TableHead className="text-right px-8 font-semibold text-foreground">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockBlogPosts.map((post) => (
                            <TableRow key={post.id} className="border-border/20 hover:bg-muted/30 transition-colors">
                                <TableCell className="px-8 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-16 shrink-0 overflow-hidden rounded-lg bg-muted border border-border/40">
                                            <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
                                        </div>
                                        <span className="font-bold text-foreground max-w-xs truncate">{post.title}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                                        {post.category}
                                    </span>
                                </TableCell>
                                <TableCell className="text-muted-foreground font-medium text-sm">
                                    {post.publishedAt}
                                </TableCell>
                                <TableCell className="text-right px-8">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-foreground/5">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function ThemeTab() {
    const { colors, setColors } = useTheme();
    const [primary, setPrimary] = useState(colors.primary);
    const [secondary, setSecondary] = useState(colors.secondary);
    const [saved, setSaved] = useState(false);

    const presets = [
        { label: "Orange + Vert (défaut)", primary: "24 95% 53%", secondary: "142 71% 35%" },
        { label: "Bleu + Violet", primary: "217 91% 60%", secondary: "263 70% 50%" },
        { label: "Rose + Orange", primary: "330 81% 60%", secondary: "24 95% 53%" },
        { label: "Violet + Rose", primary: "263 70% 50%", secondary: "330 81% 60%" },
        { label: "Teal + Émeraude", primary: "172 66% 50%", secondary: "142 71% 35%" },
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
            <div className="rounded-3xl bg-card p-8 border border-border/40 shadow-sm">
                <h3 className="font-display text-2xl font-bold mb-6">Couleurs Sur-Mesure</h3>

                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <Label className="text-base font-semibold">Couleur principale (Primary)</Label>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                            Format HSL (ex: 24 95% 53%)
                        </p>
                        <div className="flex gap-4 items-center">
                            <div
                                className="h-14 w-14 shrink-0 rounded-2xl border border-border/50 shadow-inner"
                                style={{ backgroundColor: "hsl(" + primary + ")" }}
                            />
                            <Input
                                value={primary}
                                onChange={(e) => setPrimary(e.target.value)}
                                placeholder="24 95% 53%"
                                className="h-12 rounded-xl text-base bg-muted/30"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label className="text-base font-semibold">Couleur secondaire (Secondary)</Label>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                            Format HSL (ex: 142 71% 35%)
                        </p>
                        <div className="flex gap-4 items-center">
                            <div
                                className="h-14 w-14 shrink-0 rounded-2xl border border-border/50 shadow-inner"
                                style={{ backgroundColor: "hsl(" + secondary + ")" }}
                            />
                            <Input
                                value={secondary}
                                onChange={(e) => setSecondary(e.target.value)}
                                placeholder="142 71% 35%"
                                className="h-12 rounded-xl text-base bg-muted/30"
                            />
                        </div>
                    </div>

                    <Button onClick={handleSave} className="mt-4 rounded-xl h-12 text-base font-bold shadow-md transition-all hover:-translate-y-0.5">
                        {saved ? "Sauvegardé avec succès !" : "Appliquer les couleurs"}
                    </Button>
                </div>
            </div>

            <div className="rounded-3xl bg-card p-8 border border-border/40 shadow-sm">
                <h3 className="font-display text-2xl font-bold mb-6">Thèmes Prédéfinis</h3>
                <div className="flex flex-col gap-3">
                    {presets.map((preset) => (
                        <button
                            key={preset.label}
                            onClick={() => applyPreset(preset)}
                            className="group flex items-center justify-between rounded-2xl border border-border/40 p-4 text-left transition-all hover:bg-muted/50 hover:shadow-sm"
                        >
                            <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                                {preset.label}
                            </span>
                            <div className="flex gap-2">
                                <div
                                    className="h-8 w-8 rounded-full border border-border/50 shadow-sm"
                                    style={{ backgroundColor: "hsl(" + preset.primary + ")" }}
                                />
                                <div
                                    className="h-8 w-8 rounded-full border border-border/50 shadow-sm"
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