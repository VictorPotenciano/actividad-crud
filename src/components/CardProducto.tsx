"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "../../typing";

interface ProductCardProps {
  product: Product;
}

const CardProducto = ({ product }: ProductCardProps) => {
  const router = useRouter();

  return (
    <Card className="w-full max-w-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="relative w-full h-64 overflow-hidden rounded-lg">
          <Image
            src={product.image || "/placeholder.svg?height=256&width=384"}
            alt={product.name || "Product Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-2xl font-bold text-primary">{product.price}€</p>
          <p className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            Material: {product.material}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardProducto;