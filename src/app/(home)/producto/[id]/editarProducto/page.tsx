"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProduct, updateProduct } from "@/lib/api"; // Asegúrate de tener estas funciones en tu API
import { toast } from "sonner";
import CardForm from "@/components/CardForm";
import CardFormSkeleton from "@/components/CardFomrSkeleton";

const Page = () => {
  const router = useRouter();
  const params = useParams(); // Obtener los parámetros de la URL
  const id = params.id as string; // Obtener el id del producto desde la URL

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    material: "",
  });
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

  // Cargar los datos del producto cuando el componente se monta
  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        try {
          const product = await getProduct(id); // Obtener el producto por id
          if (product) {
            setFormData({
              name: product.name,
              price: product.price,
              description: product.description,
              material: product.material,
            });
          }
        } catch (error) {
          console.error("Error cargando el producto:", error);
          toast.error("Error cargando el producto.");
        } finally {
          setIsLoading(false); // Detener la carga
        }
      }
    };

    loadProduct();
  }, [id]);

  // Manejar cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar el envío del formulario (actualización del producto)
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
      // Crear el objeto con los datos actualizados del producto
      const updatedProduct = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        material: formData.material,
      };

      // Llamar a la función para actualizar el producto
      const result = await updateProduct(id, updatedProduct);

      if (result) {
        toast.success("Producto actualizado exitosamente.");
        router.push("/"); // Redirigir a la página principal o a la lista de productos
      } else {
        toast.error("Error al actualizar el producto.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error al actualizar el producto.");
    }
  };

  // Mostrar un skeleton loader mientras se cargan los datos
  if (isLoading) {
    return <CardFormSkeleton />;
  }

  return (
    <div className="container mx-auto p-4">
      <CardForm
        isEditing={true} // Indicar que está en modo edición
        formData={formData} // Pasar los datos del producto
        handleChange={handleChange} // Pasar la función para manejar cambios
        handleSubmit={(e) => handleSubmit(e)} // Pasar la función para manejar el envío
      />
    </div>
  );
};

export default Page;
