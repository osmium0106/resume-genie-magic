
import React, { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { AIEnhancer } from "./AIEnhancer";

interface PersonalInfoFormProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    summary: string;
    profileImage?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnhanceField: (enhancedContent: string) => void;
  children?: ReactNode;
}

export const PersonalInfoForm = ({ 
  formData, 
  handleInputChange, 
  handleImageUpload, 
  onEnhanceField,
  children 
}: PersonalInfoFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
        {children}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+1 234 567 8900"
          />
        </div>
        <div>
          <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
            Profile Image
          </label>
          <Input
            id="profileImage"
            name="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/90"
          />
        </div>
      </div>
      <div className="relative">
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
          Professional Summary
        </label>
        <div className="flex items-center">
          <Input
            id="summary"
            name="summary"
            type="text"
            required
            value={formData.summary}
            onChange={handleInputChange}
            placeholder="Brief professional summary"
            className="w-full"
          />
          <AIEnhancer
            field="summary"
            content={formData.summary}
            context={{
              fullName: formData.fullName
            }}
            onSuccess={onEnhanceField}
          />
        </div>
      </div>
    </div>
  );
};
