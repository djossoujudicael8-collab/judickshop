import { Component } from "react";
import type { ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage: string;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, errorMessage: "" };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, errorMessage: error.message || "Erreur inconnue" };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("ErrorBoundary a intercepte une erreur:", error, info);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
                    <div className="rounded-full bg-destructive/10 p-4 text-destructive">
                        <AlertTriangle className="h-8 w-8" />
                    </div>
                    <h1 className="font-display text-2xl font-bold text-foreground">
                        Une erreur est survenue
                    </h1>
                    <p className="max-w-md text-sm text-muted-foreground">
                        {this.state.errorMessage}
                    </p>
                    <Button onClick={this.handleReload} className="gap-2 mt-2">
                        <RefreshCw className="h-4 w-4" />
                        Recharger la page
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}