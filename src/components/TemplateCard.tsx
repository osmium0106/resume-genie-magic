
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  name: string;
  description: string;
  image: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function TemplateCard({ name, description, image, isSelected, onSelect }: TemplateCardProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg",
        "cursor-pointer transform hover:-translate-y-1",
        isSelected && "ring-2 ring-accent ring-offset-2"
      )}
    >
      <div className="aspect-[3/4] overflow-hidden rounded-md bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3 className="font-playfair text-xl font-semibold text-gray-900">{name}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <span className="font-semibold text-white">
          {isSelected ? "Selected Template" : "Click to Select"}
        </span>
      </div>
    </div>
  );
}
