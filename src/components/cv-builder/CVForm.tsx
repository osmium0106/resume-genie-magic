
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wand2 } from "lucide-react";
import { AIEnhancer } from "./AIEnhancer";
import { AIGenerator } from "./AIGenerator";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ExperienceForm } from "./ExperienceForm";
import { EducationForm } from "./EducationForm";
import { SkillsForm } from "./SkillsForm";

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

interface CVFormProps {
  onPreview: () => void;
  onBack: () => void;
  formData: {
    fullName: string;
    email: string;
    phone: string;
    summary: string;
    profileImage: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    fullName: string;
    email: string;
    phone: string;
    summary: string;
    profileImage: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
  }>>;
}

export const CVForm = ({ onPreview, onBack, formData, setFormData }: CVFormProps) => {
  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { title: "", company: "", period: "", description: "" }],
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", school: "", year: "" }],
    }));
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const handleEnhanceFieldSuccess = (field: 'summary' | 'experience' | 'skills', enhancedContent: string) => {
    setFormData(prev => {
      if (field === 'skills') {
        return {
          ...prev,
          skills: enhancedContent.split(',').map((skill: string) => skill.trim())
        };
      } else if (field === 'experience') {
        return {
          ...prev,
          experience: prev.experience.map((exp, index) => 
            index === 0 ? { ...exp, description: enhancedContent } : exp
          )
        };
      } else {
        return {
          ...prev,
          [field]: enhancedContent
        };
      }
    });
  };

  const handleAIGenerationSuccess = (data: {
    summary: string;
    skills: string[];
    experience: {
      description: string;
    };
  }) => {
    setFormData(prev => ({
      ...prev,
      summary: data.summary,
      skills: data.skills,
      experience: [
        {
          ...prev.experience[0],
          description: data.experience.description
        },
        ...prev.experience.slice(1)
      ],
    }));
  };

  return (
    <form className="space-y-8 bg-white rounded-lg shadow-md p-8">
      {/* Personal Information */}
      <PersonalInfoForm 
        formData={formData}
        handleInputChange={handleInputChange}
        handleImageUpload={handleImageUpload}
        onEnhanceField={(content) => 
          handleEnhanceFieldSuccess('summary', content)
        }
      >
        <AIGenerator 
          formData={formData} 
          onSuccess={handleAIGenerationSuccess} 
        />
      </PersonalInfoForm>

      {/* Experience */}
      <ExperienceForm 
        experiences={formData.experience}
        onChange={handleExperienceChange}
        onAdd={addExperience}
        onEnhanceField={(content) => 
          handleEnhanceFieldSuccess('experience', content)
        }
      />

      {/* Education */}
      <EducationForm 
        education={formData.education}
        onChange={handleEducationChange}
        onAdd={addEducation}
      />

      {/* Skills */}
      <SkillsForm 
        skills={formData.skills}
        onChange={handleSkillChange}
        onAdd={addSkill}
        onEnhanceField={(content) => 
          handleEnhanceFieldSuccess('skills', content)
        }
      />

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          Back to Templates
        </Button>
        <Button
          type="button"
          onClick={onPreview}
          className="bg-accent hover:bg-accent/90 text-white"
        >
          Preview CV
        </Button>
      </div>
    </form>
  );
};
