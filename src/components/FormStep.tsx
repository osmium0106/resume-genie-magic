
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormStepProps {
  children: ReactNode;
  title: string;
  description: string;
  isActive: boolean;
}

export function FormStep({ children, title, description, isActive }: FormStepProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white/50 p-6 backdrop-blur-sm transition-all duration-300",
        isActive ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4 pointer-events-none absolute"
      )}
    >
      <div className="mb-6">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
