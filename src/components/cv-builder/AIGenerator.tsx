
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface GenerateAIContentRequest {
  fullName: string;
  currentPosition: string;
  yearsOfExperience: string;
  industry: string;
  skills: string;
}

interface AIGeneratorProps {
  formData: {
    fullName: string;
    experience: Array<{
      title: string;
      company: string;
      period: string;
      description: string;
    }>;
    skills: string[];
  };
  onSuccess: (data: {
    summary: string;
    skills: string[];
    experience: {
      description: string;
    };
  }) => void;
  className?: string;
}

export const AIGenerator = ({ formData, onSuccess, className }: AIGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateAIContent = async () => {
    if (!formData.fullName || !formData.experience[0]?.title) {
      toast({
        title: "Missing Information",
        description: "Please provide at least your name and current position.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const requestData: GenerateAIContentRequest = {
        fullName: formData.fullName,
        currentPosition: formData.experience[0].title,
        yearsOfExperience: formData.experience[0].period,
        industry: formData.experience[0].company,
        skills: formData.skills.join(", "),
      };

      const { data, error } = await supabase.functions.invoke('generate-cv-content', {
        body: requestData
      });

      if (error) throw error;
      
      onSuccess({
        summary: data.summary,
        skills: data.skills.split(", "),
        experience: {
          description: data.description
        }
      });

      toast({
        title: "Success!",
        description: "AI-generated content has been added to your CV.",
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={generateAIContent}
      disabled={isGenerating}
      className={className || "bg-blue-600 hover:bg-blue-700 text-white"}
    >
      {isGenerating ? "Generating..." : "Generate with AI"}
    </Button>
  );
};
