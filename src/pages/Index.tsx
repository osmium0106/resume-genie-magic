
import { useState } from "react";
import { TemplateCard } from "@/components/TemplateCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and professional design with perfect ATS optimization",
    image: "/placeholder.svg",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary layout with a creative touch",
    image: "/placeholder.svg",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional template trusted by professionals",
    image: "/placeholder.svg",
  },
];

const Index = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate(`/create/${selectedTemplate}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-12 animate-fadeIn">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
            Create Your Professional CV
          </h1>
          <p className="text-lg text-gray-600">
            Select a template to get started with your new CV
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              name={template.name}
              description={template.description}
              image={template.image}
              isSelected={selectedTemplate === template.id}
              onSelect={() => setSelectedTemplate(template.id)}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className="bg-accent hover:bg-accent/90 text-white px-8"
          >
            Continue with Selected Template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
