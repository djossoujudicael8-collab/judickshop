import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Catalogue from "@/pages/Catalogue";
import ProductDetail from "@/pages/ProductDetail";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminRoute from "@/components/AdminRoute";
import ToastContainer from "@/components/ui/toast-container";
import ScrollToTop from "@/components/ScrollToTop";
import SplashScreen from "@/components/SplashScreen";
import { useSiteSettings } from "@/hooks/useSupabase";

export default function App() {
  const [splashPhase, setSplashPhase] = useState<"visible" | "exiting" | "done">("visible");
  const { settings } = useSiteSettings();

  // Petit ecran de bienvenue au premier chargement de la page (pas lors
  // de la simple navigation interne, App ne remonte qu'a un vrai reload).
  useEffect(() => {
    const exitTimer = setTimeout(() => setSplashPhase("exiting"), 1300);
    const doneTimer = setTimeout(() => setSplashPhase("done"), 2000);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // Le favicon (icone d'onglet du navigateur) suit automatiquement le logo
  // defini dans les parametres de la boutique, s'il existe.
  useEffect(() => {
    if (!settings?.logo_url) return;
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = settings.logo_url;
  }, [settings?.logo_url]);

  return (
    <>
      {splashPhase !== "done" && (
        <SplashScreen exiting={splashPhase === "exiting"} />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={
          splashPhase === "done"
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.97 }
        }
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/catalogue"
            element={
              <Layout>
                <Catalogue />
              </Layout>
            }
          />
          <Route
            path="/produit/:id"
            element={
              <Layout>
                <ProductDetail />
              </Layout>
            }
          />
          <Route
            path="/blog"
            element={
              <Layout>
                <Blog />
              </Layout>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <Layout>
                <BlogDetail />
              </Layout>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
        <ToastContainer />
      </motion.div>
    </>
  );
}