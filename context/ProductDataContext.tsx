"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export interface ProductData {
  _id: string;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
  category?: string;
}

interface ProductContextType {
  products: ProductData[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  refetch: (search?: string, page?: number) => void;
}

const ProductDataContext = createContext<ProductContextType | null>(null);

export function ProductDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (search: string = "", page: number = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/fetchProducts?search=${search}&page=${page}&limit=8`,
        {
          withCredentials: true,
        },
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.currentPage || 1);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts("", 1);
  }, []);

  return (
    <ProductDataContext.Provider
      value={{
        products,
        loading,
        currentPage,
        totalPages,
        refetch: fetchProducts,
      }}
    >
      {children}
    </ProductDataContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductDataContext);
  if (!context) {
    throw new Error("useProducts must be used inside ProductDataProvider");
  }
  return context;
};
