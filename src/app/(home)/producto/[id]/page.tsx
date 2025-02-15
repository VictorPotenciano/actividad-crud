"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "../../../../../typing";
import { getProduct } from "@/lib/api";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CardProducto from "@/components/CardProducto";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (typeof id === "string") {
        try {
          const producto = await getProduct(id);
          setProduct(producto);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        product && <CardProducto product={product} />
      )}
    </div>
  );
};

const LoadingSkeleton = () => (
  <Card className="w-full max-w-lg shadow-lg transition-all duration-300 hover:shadow-xl">
    <CardHeader>
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full mt-2" />
    </CardHeader>
    <CardContent className="flex flex-col items-center space-y-6">
      <Skeleton className="h-64 w-full rounded-lg" />
      <div className="flex justify-between items-center w-full">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-6 w-32" />
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-32" />
    </CardFooter>
  </Card>
);

export default Page;
