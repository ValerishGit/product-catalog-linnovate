import { Product } from "./schemas";

export const fetchProductsData = async (): Promise<Product[]> => {
  const res = await fetch("/api/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return await res.json();
};

export const fetchProduct = async (productId: string) => {
  try {
    const res = await fetch(`/api/products/${productId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};
