import { Product } from "@/lib/database/schemas";
import { create } from "zustand";

interface ProductStore {
  products: Product[];
  searchQuery: string;
  filteredProducts: Product[];
  setProducts: (products: Product[]) => void;
  setSearchQuery: (query: string) => void;
  filterProducts: () => void;
  product: any;
  fetchProduct: (productId: string) => Promise<void>;
}

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  searchQuery: "",
  filteredProducts: [],

  setProducts: (products) => {
    set({ products, filteredProducts: products });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().filterProducts();
  },

  filterProducts: () => {
    const { products, searchQuery } = get();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    set({ filteredProducts: filtered });
  },
  product: null,
  fetchProduct: async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      set({ product: data });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
}));

export default useProductStore;
