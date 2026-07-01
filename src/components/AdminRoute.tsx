import { Navigate } from "react-router-dom";
import { useAdmin } from "@/stores/useAdmin";
import type { ReactNode } from "react";

export default function AdminRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAdmin();

    if (!isAuthenticated) {
        return <Navigate to="/admin" replace />;
    }

    return <>{children}</>;
}