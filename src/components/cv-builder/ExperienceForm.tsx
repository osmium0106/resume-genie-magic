
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AIEnhancer } from "./AIEnhancer";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (index: number, field: keyof Experience, value: string) => void;
  onAdd: () => void;
  onEnhanceField: (enhancedContent: string) => void;
}

export const ExperienceForm = ({ 
  experiences, 
  onChange, 
  onAdd,
  onEnhanceField
}: ExperienceFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
        <Button
          type="button"
          variant="outline"
          onClick={onAdd}
        >
          Add Experience
        </Button>
      </div>
      {experiences.map((exp, index) => (
        <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <Input
                value={exp.title}
                onChange={(e) => onChange(index, 'title', e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <Input
                value={exp.company}
                onChange={(e) => onChange(index, 'company', e.target.value)}
                placeholder="Company Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Period
              </label>
              <Input
                value={exp.period}
                onChange={(e) => onChange(index, 'period', e.target.value)}
                placeholder="2020 - Present"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <div className="flex items-center">
              <Input
                value={exp.description}
                onChange={(e) => onChange(index, 'description', e.target.value)}
                placeholder="Describe your responsibilities and achievements"
                className="w-full"
              />
              {index === 0 && (
                <AIEnhancer
                  field="experience"
                  content={exp.description}
                  context={{
                    currentPosition: exp.title,
                    industry: exp.company
                  }}
                  onSuccess={onEnhanceField}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
