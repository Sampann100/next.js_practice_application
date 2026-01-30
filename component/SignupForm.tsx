"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import {
  Zap,
  User,
  MapPin,
  Mail,
  Lock,
  UserPlus,
  Loader2,
  ArrowRight,
} from "lucide-react";

interface SignupFormData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.warning("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/auth/signup", formData, {
        withCredentials: true,
      });

      if (res.status === 201) {
        toast.success(res.data.message || "Account created!");
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#FDFDFF] font-sans selection:bg-indigo-100">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 relative overflow-hidden order-last">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />

        <div className="relative z-10 flex items-center justify-end gap-3">
          <span className="font-black text-2xl tracking-tighter italic text-white">
            NEXUS.
          </span>
          <div className="bg-indigo-600 p-2 rounded-xl -rotate-3 shadow-lg shadow-indigo-500/20">
            <Zap className="text-white w-6 h-6 fill-white" />
          </div>
        </div>

        <div className="relative z-10 text-right">
          <h2 className="text-5xl font-black text-white leading-tight mb-6">
            Join the <br />
            <span className="text-indigo-400">Inventory Revolution.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-md ml-auto">
            Create your merchant account in seconds and start organizing your
            catalog with world-class tools.
          </p>
        </div>

        <div className="relative z-10 text-right text-slate-500 text-sm font-medium">
          © 2026 Nexus UI Inc. Smart Solutions.
        </div>
      </div>

      <div className="flex items-center justify-center p-8 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-xl">
          <header className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              Create Account
            </h1>
            <p className="text-slate-500 font-medium">
              Start your 14-day free trial today.
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            autoComplete="off"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">
                  First Name
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-12 py-3.5 outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium text-slate-900"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">
                Business Address
              </label>
              <div className="relative group">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Commerce St, New York"
                  required
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-12 py-3.5 outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  required
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-12 py-3.5 outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium text-slate-900"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                    size={18}
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-12 py-3.5 outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium text-slate-900"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">
                  Confirm
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group bg-indigo-600 hover:bg-slate-900 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:shadow-slate-200 transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Create Merchant Account
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 font-medium">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-indigo-600 font-black border-b-2 border-indigo-50 hover:border-indigo-600 transition-all pb-0.5"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
