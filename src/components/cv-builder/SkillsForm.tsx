
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { AIEnhancer } from "./AIEnhancer";

interface SkillsFormProps {
  skills: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
  onEnhanceField: (enhancedContent: string) => void;
}

export const SkillsForm = ({ skills, onChange, onAdd, onDelete, onEnhanceField }: SkillsFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
        <div className="flex space-x-2">
          <AIEnhancer
            field="skills"
            content={skills.join(", ")}
            onSuccess={onEnhanceField}
            title="Enhance skills with AI"
          />
          <Button
            type="button"
            variant="outline"
            onClick={onAdd}
          >
            Add Skill
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="relative">
            <Input
              value={skill}
              onChange={(e) => onChange(index, e.target.value)}
              placeholder="Enter a skill"
              className="pr-10"
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full"
              onClick={() => onDelete(index)}
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
