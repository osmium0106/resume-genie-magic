
import React from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useToast } from "@/components/ui/use-toast";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ClassicTemplate from "@/components/templates/ClassicTemplate";

interface CVData {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  profileImage: string;
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
  skills: string[];
}

interface CVPreviewProps {
  templateId: string;
  formData: CVData;
  onBack: () => void;
}

export const CVPreview = ({ templateId, formData, onBack }: CVPreviewProps) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    const template = document.getElementById('cv-template');
    if (!template) return;

    try {
      const canvas = await html2canvas(template);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${formData.fullName.replace(/\s+/g, '_')}_CV.pdf`);

      toast({
        title: "Success!",
        description: "Your CV has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download CV. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderTemplate = () => {
    const props = { data: formData };
    switch (templateId) {
      case 'minimal':
        return <MinimalTemplate {...props} />;
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'classic':
        return <ClassicTemplate {...props} />;
      default:
        return <MinimalTemplate {...props} />;
    }
  };

  return (
    <div>
      <div id="cv-template" className="mb-8">
        {renderTemplate()}
      </div>
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
        >
          Back to Edit
        </Button>
        <Button
          onClick={handleDownload}
          className="bg-accent hover:bg-accent/90 text-white"
        >
          Download PDF
        </Button>
      </div>
    </div>
  );
};
