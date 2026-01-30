"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  LogOut,
  Bell,
  LayoutDashboard,
  Plus,
  Trash2,
  Package,
  Settings,
  Zap,
  Pencil,
  Search,
  PackageSearch,
} from "lucide-react";
import Link from "next/link";
import { useProducts } from "@/context/ProductDataContext";
import Pagination from "./Pagination";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function Dashboard() {
  const router = useRouter();
  const { products, loading, refetch, currentPage, totalPages } = useProducts();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      refetch(searchQuery, 1);
    }, 400);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully");
      router.push("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const confirmDelete = async () => {
    if (!selectedProductId) return;
    try {
      setIsDeleting(true);
      await axios.delete(`/api/deleteProduct/${selectedProductId}`, {
        withCredentials: true,
      });
      toast.success("Product deleted successfully");
      refetch(searchQuery, currentPage);
    } catch {
      toast.error("Item delete error");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setSelectedProductId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col md:flex-row font-sans text-slate-900">
      <aside className="hidden md:flex w-80 bg-white border-r border-slate-100 flex-col sticky top-0 h-screen">
        <div className="p-10 flex items-center gap-4">
          <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-xl shadow-indigo-100 rotate-3">
            <Zap className="text-white w-6 h-6 fill-white" />
          </div>
          <span className="font-black text-2xl tracking-tighter italic">
            NEXUS.
          </span>
        </div>

        <nav className="flex-1 px-6 space-y-1.5">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: Package, label: "Inventory" },
            { icon: Bell, label: "Notifications" },
            { icon: Settings, label: "Settings" },
          ].map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all group ${
                item.active
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              <item.icon
                size={22}
                className={
                  item.active
                    ? "text-indigo-400"
                    : "group-hover:scale-110 transition-transform"
                }
              />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-rose-500 hover:bg-rose-50 transition-colors"
          >
            <LogOut size={22} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-16 max-w-400 mx-auto w-full">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest">
              <div className="h-1 w-8 bg-indigo-600 rounded-full" />
              Store Overview
            </div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900">
              Product Catalog
            </h1>
            <p className="text-slate-500 text-lg">
              Manage, track and grow your digital inventory.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden xl:block">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl w-64 focus:ring-2 ring-indigo-100 outline-none transition-all"
              />
            </div>
            <Link href="/createProduct">
              <button className="bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-indigo-100 transition-all">
                <Plus size={22} strokeWidth={3} />
                <span>Add New Item</span>
              </button>
            </Link>
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-96 bg-slate-100 rounded-[2.5rem] animate-pulse"
              />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-[2.5rem] p-5 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden rounded-3xl h-64 bg-slate-50">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-6 px-2">
                    <h3 className="font-black text-xl text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center mt-6">
                      <div>
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">
                          Price
                        </span>
                        <span className="text-3xl font-black text-slate-900">
                          ${product.price}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/editProduct/${product._id}`}>
                          <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer">
                            <Pencil size={20} strokeWidth={2.5} />
                          </button>
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedProductId(product._id);
                            setShowDeleteModal(true);
                          }}
                          className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-rose-600 hover:bg-rose-50 transition-all"
                        >
                          <Trash2 size={20} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Pagination
              current={currentPage}
              total={totalPages}
              onPageChange={(page) => refetch(searchQuery, page)}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-slate-50 p-8 rounded-[3rem] mb-6">
              <PackageSearch size={64} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              No products found
            </h3>
            <p className="text-slate-500 mt-2 max-w-xs">
              We couldn't find anything matching "{searchQuery}".
            </p>
          </div>
        )}
      </main>

      <DeleteConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
