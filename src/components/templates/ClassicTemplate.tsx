
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

const ClassicTemplate: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="max-w-[21cm] mx-auto bg-white p-8 shadow-lg">
      <div className="text-center mb-8 border-b-2 border-gray-800 pb-4">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3">{data.fullName}</h1>
        <div className="flex justify-center gap-6 text-gray-700">
          <span>{data.email}</span>
          <span>{data.phone}</span>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3 border-b border-gray-400">
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </div>

      {data.experience && (
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 border-b border-gray-400">
            Professional Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
                  <div className="text-gray-700 font-semibold">{exp.company}</div>
                </div>
                <span className="text-gray-600 italic">{exp.period}</span>
              </div>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.education && (
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 border-b border-gray-400">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                  <div className="text-gray-700">{edu.school}</div>
                </div>
                <span className="text-gray-600 italic">{edu.year}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.skills && (
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3 border-b border-gray-400">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded text-gray-800">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;
