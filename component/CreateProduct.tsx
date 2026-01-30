"use client";

import { useEffect, useState } from "react";
import {
  Package,
  DollarSign,
  Tag,
  Star,
  ImageIcon,
  PlusCircle,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/ProductDataContext";
import Link from "next/link";

export default function CreateProduct({
  isEdit,
  productId,
}: {
  isEdit?: boolean;
  productId?: string;
}) {
  const router = useRouter();
  const { products, refetch } = useProducts();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    rating: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (isEdit && productId && products.length > 0) {
      const product = products.find((p: any) => p._id === productId);
      if (product) {
        setFormData({
          name: product.name || "",
          price: String(product.price ?? ""),
          category: product.category || "",
          rating: String(product.rating ?? ""),
          imageUrl: product.imageUrl || "",
        });
      }
    }
  }, [isEdit, productId, products]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAction = async (e: any) => {
    e.preventDefault();
    const endpoint = isEdit
      ? `/api/updateProduct/${productId}`
      : "/api/createProduct";
    const method = isEdit ? "put" : "post";

    try {
      const res = await axios[method](endpoint, formData, {
        withCredentials: true,
      });
      toast.success(res.data.message || (isEdit ? "Updated!" : "Published!"));
      router.push("/dashboard");
      refetch();
    } catch (err) {
      toast.error("Operation failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col items-center justify-center p-6 md:p-12 font-sans">
      <div className="max-w-7xl w-full flex justify-between items-center mb-10">
        <Link
          href="/dashboard"
          className="group flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-500 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:-translate-x-1 transition-all" />
          <span className="font-bold text-slate-600 group-hover:text-slate-900">
            Dashboard
          </span>
        </Link>
        <div className="flex items-center gap-3 text-slate-400 font-bold text-sm uppercase tracking-tighter">
          <Zap className="w-4 h-4 fill-yellow-400 text-yellow-400" /> Nexus
          Studio v2.0
        </div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative group order-2 lg:order-1">
          <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity" />

          <div className="relative h-full bg-slate-900 rounded-[3rem] p-10 flex flex-col border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between mb-12">
              <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-white text-[10px] font-black uppercase tracking-widest">
                  Real-time Render
                </span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm bg-white rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform rotate-1 group-hover:rotate-0 transition-transform duration-700">
                <div className="h-72 relative group/img">
                  {formData.imageUrl ? (
                    <img
                      src={formData.imageUrl}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                      <ImageIcon size={60} strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-[10px] font-black text-indigo-600 shadow-xl border border-white">
                    {formData.category || "UNCATEGORIZED"}
                  </div>
                </div>

                <div className="p-10">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl font-black text-slate-900 leading-tight">
                      {formData.name || "Product Name"}
                    </h3>
                    <div className="flex items-center gap-1 bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm font-black">
                      <Star size={14} fill="white" /> {formData.rating || "0.0"}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-8">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        MSRP Value
                      </p>
                      <p className="text-4xl font-black text-slate-900 tracking-tighter">
                        ${formData.price || "0.00"}
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                      <CheckCircle2 size={28} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-slate-500 text-sm font-medium mt-10">
              Nexus automatically optimizes your assets for high-speed delivery.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-14 border border-slate-100 shadow-xl order-1 lg:order-2">
          <header className="mb-12">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">
              {isEdit ? "Edit Item" : "New Item"}
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              Describe your product to the world.
            </p>
          </header>

          <form onSubmit={handleAction} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Package size={20} />
                </div>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product Title"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl py-5 pl-16 pr-6 outline-none font-bold text-slate-800 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                    <DollarSign size={20} />
                  </div>
                  <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl py-5 pl-16 pr-6 outline-none font-bold text-slate-800 transition-all"
                    required
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                    <Star size={20} />
                  </div>
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    max="5"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="Rating"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl py-5 pl-16 pr-6 outline-none font-bold text-slate-800 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Tag size={20} />
                </div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl py-5 pl-16 pr-6 outline-none font-bold text-slate-800 transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Choose Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                  <ImageIcon size={20} />
                </div>
                <input
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Image URL Link"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl py-5 pl-16 pr-6 outline-none font-bold text-slate-800 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white rounded-4xl py-6 font-black text-xl flex items-center justify-center gap-4 hover:bg-indigo-600 hover:-translate-y-1 active:scale-[0.98] transition-all shadow-2xl shadow-indigo-100 mt-6"
            >
              <PlusCircle size={24} />
              {isEdit ? "Update Product" : "Publish to Nexus"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
