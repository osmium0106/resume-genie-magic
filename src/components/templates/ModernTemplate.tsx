
import React from 'react';

interface CVData {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  experience?: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  education?: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
  skills?: string[];
}

const ModernTemplate: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="max-w-[21cm] mx-auto bg-white shadow-lg">
      <div className="bg-purple-600 text-white p-8">
        <h1 className="text-4xl font-bold">{data.fullName}</h1>
        <div className="flex gap-4 mt-3">
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {data.email}
          </span>
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {data.phone}
          </span>
        </div>
      </div>
      
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-600 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>

        {data.experience && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                  <span className="text-purple-600 font-medium">{exp.period}</span>
                </div>
                <div className="text-gray-700 font-medium mb-2">{exp.company}</div>
                <p className="text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {data.education && (
            <div>
              <h2 className="text-2xl font-bold text-purple-600 mb-4">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                    <span className="text-purple-600">{edu.year}</span>
                  </div>
                  <div className="text-gray-700">{edu.school}</div>
                </div>
              ))}
            </div>
          )}

          {data.skills && (
            <div>
              <h2 className="text-2xl font-bold text-purple-600 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
