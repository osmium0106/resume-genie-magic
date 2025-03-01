
import { useState } from "react";
import { TemplateCard } from "@/components/TemplateCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and professional design with perfect ATS optimization",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&h=500",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary layout with a creative touch",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=500",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional template trusted by professionals",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&h=500",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated template for senior professionals, ATS optimized",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&h=500",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Highly structured format ideal for corporate roles, ATS friendly",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&h=500",
  },
  {
    id: "technical",
    name: "Technical",
    description: "Perfect for tech professionals with skill highlights, ATS compliant",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&h=500",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Balanced template for all industries with excellent ATS readability",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&h=500",
  },
  {
    id: "simple",
    name: "Simple",
    description: "Minimalist design that ensures perfect ATS parsing",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&h=500",
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
