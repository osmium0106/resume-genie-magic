
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Education {
  degree: string;
  school: string;
  year: string;
}

interface EducationFormProps {
  education: Education[];
  onChange: (index: number, field: keyof Education, value: string) => void;
  onAdd: () => void;
}

export const EducationForm = ({ education, onChange, onAdd }: EducationFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Education</h2>
        <Button
          type="button"
          variant="outline"
          onClick={onAdd}
        >
          Add Education
        </Button>
      </div>
      {education.map((edu, index) => (
        <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <Input
                value={edu.degree}
                onChange={(e) => onChange(index, 'degree', e.target.value)}
                placeholder="Bachelor's in Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School
              </label>
              <Input
                value={edu.school}
                onChange={(e) => onChange(index, 'school', e.target.value)}
                placeholder="University Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <Input
                value={edu.year}
                onChange={(e) => onChange(index, 'year', e.target.value)}
                placeholder="2020"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
