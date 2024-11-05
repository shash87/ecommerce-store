"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, Truck, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

// This would typically come from an API/database
const getProduct = (id: string) => {
  const products = {
    "1": {
      id: "1",
      name: "Modern Sofa",
      price: 999.99,
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
        "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800&q=80",
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
      ],
      category: "living-room",
      description: "Experience ultimate comfort with our modern sofa. Crafted with premium materials and designed for both style and durability, this sofa becomes the centerpiece of any living space.",
      features: [
        "Premium leather upholstery",
        "High-density foam cushions",
        "Solid wood frame",
        "Stain-resistant fabric",
      ],
      dimensions: {
        length: 220,
        width: 95,
        height: 85,
      },
      stock: 15,
      material: "Premium Italian Leather",
      color: "Charcoal Gray",
    },
    "2": {
      id: "2",
      name: "Queen Bed Frame",
      price: 799.99,
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
        "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
      ],
      category: "bedroom",
      description: "Transform your bedroom with our elegant queen bed frame. The perfect blend of style and functionality.",
      features: [
        "Solid hardwood construction",
        "Upholstered headboard",
        "Under-bed storage",
        "Easy assembly",
      ],
      dimensions: {
        length: 210,
        width: 150,
        height: 120,
      },
      stock: 8,
      material: "Hardwood and Premium Fabric",
      color: "Light Gray",
    },
  };
  return products[id as keyof typeof products];
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { dispatch } = useCart();
  const { toast } = useToast();
  
  const product = getProduct(params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const addToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images[0],
      },
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/products" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square w-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold">${product.price}</p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <h3 className="font-semibold">Features</h3>
            <ul className="list-disc list-inside space-y-2">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Dimensions</p>
                <p>{`${product.dimensions.length}L x ${product.dimensions.width}W x ${product.dimensions.height}H cm`}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Material</p>
                <p>{product.material}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Color</p>
                <p>{product.color}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stock</p>
                <p>{product.stock} available</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="rounded-none"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                className="rounded-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={addToCart} className="flex-1">
              Add to Cart
            </Button>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <Truck className="h-5 w-5" />
              <div>
                <p className="font-semibold">Free Delivery</p>
                <p className="text-sm text-muted-foreground">For orders above ₹50,000</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Shield className="h-5 w-5" />
              <div>
                <p className="font-semibold">10 Year Warranty</p>
                <p className="text-sm text-muted-foreground">On all premium furniture</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}