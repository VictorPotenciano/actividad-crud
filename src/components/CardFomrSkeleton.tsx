
import { Skeleton } from "@/components/ui/skeleton"; 

const CardFormSkeleton = () => {
  return (
    <div className="max-w-xl mx-auto space-y-4">
      {/* Título */}
      <Skeleton className="h-8 w-48 mb-6" />

      {/* Campos del formulario */}
      <div className="space-y-4">
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Botón */}
      <Skeleton className="h-10 w-24 mt-6" />
    </div>
  );
};

export default CardFormSkeleton;