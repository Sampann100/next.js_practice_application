"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { Zap, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/login", formData, {
        withCredentials: true,
      });

      toast.success(res.data.message || "Welcome back!");
      router.push("/dashboard");
    } catch (err: any) {
      const message = err.response?.data?.message || "Invalid credentials";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#FDFDFF] font-sans selection:bg-indigo-100">
      {/* Left Side: Visual/Branding Section */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 relative overflow-hidden">
        {/* Abstract background decorations */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl rotate-3 shadow-lg shadow-indigo-500/20">
            <Zap className="text-white w-6 h-6 fill-white" />
          </div>
          <span className="font-black text-2xl tracking-tighter italic text-white">NEXUS.</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-5xl font-black text-white leading-tight mb-6">
            Manage your <br /> 
            <span className="text-indigo-400">digital empire</span> with ease.
          </h2>
          <p className="text-slate-400 text-lg max-w-md">
            The world's most intuitive catalog management system. Log in to access your inventory and real-time analytics.
          </p>
        </div>

        <div className="relative z-10 text-slate-500 text-sm font-medium">
          © 2026 Nexus UI Inc. All rights reserved.
        </div>
      </div>

      {/* Right Side: Form Section */}
      <div className="flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden flex items-center gap-2">
             <Zap className="text-indigo-600 w-6 h-6 fill-indigo-600" />
             <span className="font-black text-xl tracking-tighter italic">NEXUS.</span>
          </div>

          <header className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h1>
            <p className="text-slate-500 font-medium">Please enter your details to sign in.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-12 py-4 outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-12 py-4 outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group bg-slate-900 hover:bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Sign Into Account
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-500 font-medium">
              New to the platform?{" "}
              <Link href="/signup" className="text-indigo-600 font-black border-b-2 border-indigo-100 hover:border-indigo-600 transition-all pb-0.5">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}