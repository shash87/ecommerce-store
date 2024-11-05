import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    id: "living-room",
    name: "Living Room",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&auto=format&fit=crop&q=60",
    description: "Stylish and comfortable living room furniture",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=60",
    description: "Peaceful and elegant bedroom collections",
  },
  {
    id: "dining",
    name: "Dining Room",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&auto=format&fit=crop&q=60",
    description: "Beautiful dining sets and storage solutions",
  },
  {
    id: "office",
    name: "Office",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=60",
    description: "Professional and ergonomic office furniture",
  },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse by Category</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="group"
          >
            <div className="relative overflow-hidden rounded-lg">
              <div className="aspect-square relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm">{category.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}