import ProductList from "@/components/Products/ProductList";
import colors from "@/lib/colors";

export default function Home() {
  return (
    <div className={`bg-[${colors.backgroundColor}]`}>
      <main className="w-full m-auto flex">
        <ProductList></ProductList>
      </main>
    </div>
  );
}
