import React from "react";

const ExecutiveTemplate = ({ resume }) => {
  const {
    personalInfo = {},
    education = [],
    experience = [],
    skills = [],
    projects = [],
  } = resume;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg">
      {/* Header Section */}
      <div className="bg-slate-800 text-white px-8 py-6">
        <h1 className="text-3xl font-bold mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap gap-4 text-slate-300">
          {personalInfo.email && (
            <span className="flex items-center">
              <span className="mr-1">✉</span> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center">
              <span className="mr-1">📞</span> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center">
              <span className="mr-1">📍</span> {personalInfo.location}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-4 mt-2 text-slate-300">
          {personalInfo.linkedin && (
            <span className="flex items-center">
              <span className="mr-1">💼</span> {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center">
              <span className="mr-1">🌐</span> {personalInfo.website}
            </span>
          )}
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-1 mb-3">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-slate-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-1 mb-3">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-slate-600 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {exp.position}
                    </h3>
                    <span className="text-slate-600 text-sm">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-slate-700 font-medium mb-2">
                    {exp.company}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-1 mb-3">
              EDUCATION
            </h2>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-slate-700">{edu.school}</p>
                    </div>
                    <span className="text-slate-600 text-sm">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.gpa && (
                    <p className="text-slate-600 text-sm mt-1">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-1 mb-3">
              SKILLS
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-1 mb-3">
              PROJECTS
            </h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {project.name}
                    </h3>
                    <span className="text-slate-600 text-sm">
                      {project.startDate} - {project.endDate || "Present"}
                    </span>
                  </div>
                  {project.technologies && (
                    <p className="text-slate-700 text-sm mb-2">
                      <strong>Technologies:</strong> {project.technologies}
                    </p>
                  )}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 text-sm underline mt-1 inline-block"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
