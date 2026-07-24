import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "@/components/CartDrawer";
import MobileNavBar from "./MobileNavBar";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1 pb-28 md:pb-0">{children}</main>
            <Footer />
            <CartDrawer />
            <MobileNavBar />
        </div>
    );
}