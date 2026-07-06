import { Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <>
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
    </>
  );
}