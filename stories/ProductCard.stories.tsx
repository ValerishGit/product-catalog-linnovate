import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from "../components/Products/ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: {
      name: "Sample Product",
      price: 49.99,
      imageUrl: "https://via.placeholder.com/150",
    },
  },
};
