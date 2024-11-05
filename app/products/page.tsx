"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { Filter, SlidersHorizontal } from "lucide-react";

const products = [
  {
    id: "1",
    name: "Modern Sofa",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=60",
    category: "living-room",
    description: "Elegant and comfortable modern sofa",
  },
  {
    id: "2",
    name: "Queen Bed Frame",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&auto=format&fit=crop&q=60",
    category: "bedroom",
    description: "Sturdy queen-size bed frame with headboard",
  },
  {
    id: "3",
    name: "Dining Table Set",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&auto=format&fit=crop&q=60",
    category: "dining",
    description: "6-seater dining table set with chairs",
  },
  {
    id: "4",
    name: "Office Desk",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=60",
    category: "office",
    description: "Modern office desk with storage",
  },
];

const categories = [
  { id: "living-room", label: "Living Room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "dining", label: "Dining Room" },
  { id: "office", label: "Office" },
];

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const { dispatch } = useCart();

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  const addToCart = (product: typeof products[0]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Products</SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) => {
                          setSelectedCategories(
                            checked
                              ? [...selectedCategories, category.id]
                              : selectedCategories.filter((id) => id !== category.id)
                          );
                        }}
                      />
                      <span>{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Price Range</h3>
                <Slider
                  min={0}
                  max={2000}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader className="p-0">
              <Link href={`/products/${product.id}`}>
                <div className="aspect-square relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </Link>
            </CardHeader>
            <CardContent className="p-4">
              <Link href={`/products/${product.id}`}>
                <CardTitle className="hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
              </Link>
              <CardDescription className="mt-2">
                {product.description}
              </CardDescription>
              <p className="text-lg font-semibold mt-2">${product.price}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}