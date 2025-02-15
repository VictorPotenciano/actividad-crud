"use client";

import { useEffect, useState } from "react";
import { Product } from "../../../typing";
import { deleteProduct, getAllProducts } from "@/lib/api";
import TablaProductos from "@/components/TablaProductos";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchProducts = async () => {
    try {
      const productos = await getAllProducts();
      setProducts(productos);
      console.log("Productos:", productos);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      await deleteProduct(productId);
    }
    fetchProducts();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link href="producto/nuevoProducto">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <TablaProductos
          productos={products}
          onDeleteProducts={handleDeleteProduct}
        />
      )}
    </div>
  );
};

const TableSkeleton = () => {
  return (
    <div className="w-full border border-gray-200 rounded-lg shadow-md p-6">
      <div className="h-12 w-1/3 mb-6">
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex space-x-6">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-8 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
