import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, PackageX, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useSupabase";

interface SearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const { products, loading } = useProducts(undefined, query.trim() || undefined);

    function handleSelect(id: number) {
        onOpenChange(false);
        setQuery("");
        navigate("/produit/" + id);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                onOpenChange(value);
                if (!value) setQuery("");
            }}
        >
            <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden">
                <DialogTitle className="sr-only">Rechercher un produit</DialogTitle>

                <div className="flex items-center gap-3 border-b border-border/50 px-5 py-4">
                    <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                    <Input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Rechercher un produit..."
                        className="border-none shadow-none h-auto p-0 text-base focus-visible:ring-0"
                    />
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-2">
                    {query.trim() === "" ? (
                        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                            <Search className="h-8 w-8 text-muted-foreground/40" />
                            <p className="text-sm text-muted-foreground">
                                Commencez a taper pour rechercher un produit
                            </p>
                        </div>
                    ) : loading ? (
                        <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Recherche en cours...
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                            <PackageX className="h-8 w-8 text-muted-foreground/40" />
                            <p className="text-sm text-muted-foreground">
                                Aucun produit trouve pour "{query}"
                            </p>
                        </div>
                    ) : (
                        <ul className="flex flex-col gap-1">
                            {products.map((product) => (
                                <li key={product.id}>
                                    <button
                                        onClick={() => handleSelect(product.id)}
                                        className="flex w-full items-center gap-4 rounded-xl p-3 text-left transition-colors hover:bg-muted/60"
                                    >
                                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted border border-border/40">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-foreground">
                                                {product.name}
                                            </span>
                                            <span className="text-sm text-primary font-medium">
                                                {product.price.toLocaleString()} FCFA
                                            </span>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}