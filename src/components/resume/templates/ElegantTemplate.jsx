import React from "react";

const ElegantTemplate = ({ resume }) => {
  const {
    personalInfo = {},
    education = [],
    experience = [],
    skills = [],
    projects = [],
  } = resume;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg font-serif">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-2 tracking-wide">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="w-24 h-0.5 bg-white mx-auto mb-4"></div>
          <div className="flex flex-wrap justify-center gap-6 text-emerald-100 text-sm">
            {personalInfo.email && (
              <span className="flex items-center">
                <span className="mr-2">✉</span> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center">
                <span className="mr-2">📞</span> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center">
                <span className="mr-2">📍</span> {personalInfo.location}
              </span>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-2 text-emerald-100 text-sm">
            {personalInfo.linkedin && (
              <span className="flex items-center">
                <span className="mr-2">💼</span> {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center">
                <span className="mr-2">🌐</span> {personalInfo.website}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-8 py-8">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-light text-emerald-800 mb-4 italic">
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed max-w-3xl mx-auto">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-light text-emerald-800 mb-6 border-b border-emerald-200 pb-2">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-medium text-slate-800">
                      {exp.position}
                    </h3>
                    <span className="text-emerald-600 text-sm font-medium">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-emerald-700 font-medium mb-3 text-lg">
                    {exp.company}
                  </p>
                  <p className="text-slate-600 leading-relaxed pl-4 border-l-2 border-emerald-200">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-light text-emerald-800 mb-6 border-b border-emerald-200 pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="bg-emerald-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-slate-800">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-emerald-700 font-medium">
                        {edu.school}
                      </p>
                    </div>
                    <span className="text-emerald-600 text-sm font-medium">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.gpa && (
                    <p className="text-slate-600 text-sm mt-2">
                      <span className="font-medium">GPA:</span> {edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-light text-emerald-800 mb-6 border-b border-emerald-200 pb-2">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-center text-sm font-medium"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-light text-emerald-800 mb-6 border-b border-emerald-200 pb-2">
              Notable Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium text-slate-800">
                      {project.name}
                    </h3>
                    <span className="text-emerald-600 text-sm font-medium">
                      {project.startDate} - {project.endDate || "Present"}
                    </span>
                  </div>
                  {project.technologies && (
                    <p className="text-emerald-700 mb-3">
                      <span className="font-medium">Technologies:</span>{" "}
                      {project.technologies}
                    </p>
                  )}
                  <p className="text-slate-600 leading-relaxed mb-3">
                    {project.description}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-800 font-medium underline"
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

export default ElegantTemplate;
