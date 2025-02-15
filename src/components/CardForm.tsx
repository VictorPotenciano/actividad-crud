import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  price: string;
  description: string;
  material: string;
}

interface CardFormProps {
  isEditing?: boolean; // Prop para indicar si está en modo edición
  formData: FormData; // Datos del formulario
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void; // Función para manejar cambios
  handleSubmit: (e: React.FormEvent, formData: FormData) => void; // Función para manejar el envío
}

const CardForm = ({
  isEditing = false,
  formData,
  handleChange,
  handleSubmit,
}: CardFormProps) => {
  const router = useRouter();

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Editar Producto" : "Agregar Nuevo Producto"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmit(e, formData)} className="space-y-4">
          {/* Campo: Nombre */}
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre del producto"
              required
            />
          </div>

          {/* Campo: Precio */}
          <div>
            <Label htmlFor="price">Precio</Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Precio del producto"
              required
            />
          </div>

          {/* Campo: Descripción */}
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción del producto"
              required
            />
          </div>

          {/* Campo: Material */}
          <div>
            <Label htmlFor="material">Material</Label>
            <Input
              type="text"
              id="material"
              name="material"
              value={formData.material}
              onChange={handleChange}
              placeholder="Material del producto"
              required
            />
          </div>

          <div className="flex justify-between">
            <Button type="submit">
              {isEditing ? "Actualizar Producto" : "Crear Producto"}
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CardForm;
