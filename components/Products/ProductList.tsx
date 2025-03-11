"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { fetchProductsData } from "@/lib/database/database_operations";
import useProductStore from "@/stores/useProductStore";
import NoResults from "../NoResults";
import { Loader2Icon } from "lucide-react";
import CustomLoader from "../CustomLoader";

const ProductList = () => {
  const { filteredProducts, setProducts, setSearchQuery, searchQuery } =
    useProductStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchProductsData();
        setProducts(data);
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  if (loading) return <CustomLoader />;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 md:px-24 md:py-12 md:w-[80%] m-auto">
      <input
        type="text"
        placeholder="Search for a product..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 w-full mb-4 rounded-md"
      />
      <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length == 0 && <NoResults />}
        {filteredProducts.map((product, index) => (
          <ProductCard key={`${product.title}_${index}`} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
