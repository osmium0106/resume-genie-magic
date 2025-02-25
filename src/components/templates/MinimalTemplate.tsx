
import React from 'react';

interface CVData {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  profileImage?: string;
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

const MinimalTemplate: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="max-w-[21cm] mx-auto bg-white p-8 shadow-lg">
      <div className="border-b-2 border-gray-300 pb-4 mb-6">
        <div className="flex items-center gap-6">
          {data.profileImage && (
            <img 
              src={data.profileImage} 
              alt={data.fullName}
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{data.fullName}</h1>
            <div className="flex gap-4 mt-2 text-gray-600">
              <span>{data.email}</span>
              <span>{data.phone}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Professional Summary</h2>
        <p className="text-gray-600">{data.summary}</p>
      </div>

      {data.experience && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                <span className="text-gray-600">{exp.period}</span>
              </div>
              <div className="text-gray-700">{exp.company}</div>
              <p className="text-gray-600 mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.education && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                <span className="text-gray-600">{edu.year}</span>
              </div>
              <div className="text-gray-700">{edu.school}</div>
            </div>
          ))}
        </div>
      )}

      {data.skills && (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
