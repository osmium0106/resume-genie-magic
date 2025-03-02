
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CVForm } from "@/components/cv-builder/CVForm";
import { CVPreview } from "@/components/cv-builder/CVPreview";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

const CreateCV = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    profileImage: "",
    experience: [{ title: "", company: "", period: "", description: "" }],
    education: [{ degree: "", school: "", year: "" }],
    skills: [""],
  });
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleSaveCV = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to save your CV",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('saved_cvs')
        .insert({
          user_id: user.id,
          name: formData.fullName ? `${formData.fullName}'s CV` : 'Unnamed CV',
          cv_data: formData,
          template_id: templateId || 'minimal'
        });

      if (error) throw error;

      toast({
        title: "CV saved successfully!",
        description: "Your CV has been saved to your profile."
      });
    } catch (error: any) {
      toast({
        title: "Error saving CV",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
            Create Your CV
          </h1>
          <p className="text-lg text-gray-600">
            Fill in your details below for the {templateId} template
          </p>
        </div>

        {showPreview ? (
          <CVPreview
            templateId={templateId || 'minimal'}
            formData={formData}
            onBack={() => setShowPreview(false)}
            onSave={handleSaveCV}
          />
        ) : (
          <CVForm 
            formData={formData}
            setFormData={setFormData}
            onPreview={handlePreview}
            onBack={() => navigate("/")}
            onSave={handleSaveCV}
          />
        )}
      </div>
    </div>
  );
};

export default CreateCV;
