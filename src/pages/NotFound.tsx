import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-32 text-center">
            <p className="font-display text-7xl font-semibold text-primary">404</p>
            <h1 className="font-display mt-4 text-2xl text-foreground">
                Page introuvable
            </h1>
            <p className="mt-2 text-muted-foreground">
                La page que vous cherchez n'existe pas ou plus.
            </p>
            <Button asChild className="mt-8">
                <Link to="/">Retour à l'accueil</Link>
            </Button>
        </div>
    );
}