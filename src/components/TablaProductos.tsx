"use client";

import { useRouter } from "next/navigation";
import type { Product } from "../../typing";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash } from "lucide-react";
import { deleteProduct } from "@/lib/api";

interface TablaProps {
  productos: Product[];
  onDeleteProducts?: (productId: string) => void;
}

const TablaProductos = ({ productos, onDeleteProducts }: TablaProps) => {
  const router = useRouter();

  const handleSelectProduct = (product: Product) => {
    router.push(`/producto/${product.id}`);
  };

  const handleUpdateProduct = (productId: string) => {
    router.push(`/producto/${productId}/editarProducto`);
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
      <Table className="w-full bg-white">
        <TableHeader className="bg-primary">
          <TableRow className="bg-blue-500">
            <TableHead className="px-4 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
              Nombre
            </TableHead>
            <TableHead className="px-4 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
              Precio
            </TableHead>
            <TableHead className="px-4 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider hidden lg:table-cell">
              Descripción
            </TableHead>
            <TableHead className="px-4 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider hidden lg:table-cell">
              Material
            </TableHead>
            <TableHead className="px-4 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider w-24">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {productos?.length ? (
            productos.map((product, index) => (
              <TableRow
                onClick={() => handleSelectProduct(product)}
                key={product.id}
                className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                  index % 2 === 0 ? "bg-background" : "bg-muted/20"
                }`}
              >
                <TableCell className="px-4 py-4 text-sm text-foreground">
                  {product.name}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-foreground font-medium">
                  {product.price}€
                </TableCell>
                <TableCell
                  className="px-4 py-4 text-sm text-foreground max-w-[150px] md:max-w-[200px] lg:max-w-[250px] truncate hidden lg:table-cell"
                  title={product.description}
                >
                  {product.description}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-foreground hidden lg:table-cell">
                  {product.material}
                </TableCell>
                <TableCell
                  className="px-4 py-4 text-sm text-foreground w-24"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleUpdateProduct(product.id)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Actualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          onDeleteProducts && onDeleteProducts(product.id)
                        }
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                <span className="text-gray-500">
                  No se encontraron Productos
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablaProductos;
