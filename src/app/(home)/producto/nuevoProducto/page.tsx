"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/api";

import { toast } from "sonner";
import CardForm from "@/components/CardForm";
import CardFormSkeleton from "@/components/CardFomrSkeleton";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    material: "",
  });

  // Maneja cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (
      !formData.name ||
      !formData.price ||
      !formData.description ||
      !formData.material
    ) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    try {
      // Crear el objeto con los datos del producto
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        material: formData.material,
      };

      // Llamar a la función para crear el producto
      const newProduct = await createProduct(productData);

      if (newProduct) {
        toast.success("Producto creado exitosamente.");
        router.push("/");
      } else {
        toast.error("Error al crear el producto.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error al crear el producto.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Page;
