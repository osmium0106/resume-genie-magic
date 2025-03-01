
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AIEnhancerProps {
  field: 'summary' | 'experience' | 'skills';
  content: string;
  context?: {
    fullName?: string;
    currentPosition?: string;
    industry?: string;
  };
  onSuccess: (enhancedContent: string) => void;
  buttonText?: string;
  title?: string; // Add the title prop to the interface
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export const AIEnhancer = ({ 
  field, 
  content, 
  context = {}, 
  onSuccess, 
  buttonText, 
  title,
  size = "icon", 
  variant = "ghost" 
}: AIEnhancerProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleEnhanceField = async () => {
    if (!content) {
      toast({
        title: "Missing Content",
        description: "Please provide some initial content to enhance.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const requestContext = {
        fullName: context.fullName || '',
        currentPosition: context.currentPosition || '',
        industry: context.industry || '',
      };

      // Add specific instructions based on field type
      let additionalInstructions = '';
      if (field === 'summary') {
        additionalInstructions = 'Keep it concise, about 50 words in 4 lines maximum.';
      } else if (field === 'experience') {
        additionalInstructions = 'Keep it concise, about 50 words in 4 lines maximum.';
      } else if (field === 'skills') {
        additionalInstructions = 'Generate 5 similar skills as one-word terms. For example, if given "coding", return "HTML, CSS, JavaScript, Python, C++".';
      }

      const { data, error } = await supabase.functions.invoke('generate-cv-content', {
        body: { 
          field, 
          content, 
          context: requestContext,
          additionalInstructions 
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      
      if (data.text) {
        onSuccess(data.text);

        toast({
          title: "Success!",
          description: `${field.charAt(0).toUpperCase() + field.slice(1)} has been enhanced with AI.`,
        });
      } else {
        throw new Error('No content received from AI service');
      }
    } catch (error) {
      console.error('Error enhancing content:', error);
      toast({
        title: "Error",
        description: "Failed to enhance content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleEnhanceField}
      disabled={isGenerating || !content}
      title={title || "Enhance with AI"}
    >
      {buttonText ? (
        isGenerating ? "Enhancing..." : buttonText
      ) : (
        <Wand2 className="h-4 w-4" />
      )}
    </Button>
  );
};
