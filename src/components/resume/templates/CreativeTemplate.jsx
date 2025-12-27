import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

const CreativeTemplate = ({ resume }) => {
  const { personalInfo, education, experience, skills, projects } = resume;

  return (
    <div
      className="w-full min-h-[297mm] bg-white text-gray-800"
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-8">
        <img
          src="/src/assets/templates/creative/profile-placeholder.png"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-4xl font-black mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {personalInfo.website}
            </span>
          )}
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <p className="mt-4 text-white/90 text-sm leading-relaxed max-w-2xl">
            {personalInfo.summary}
          </p>
        )}
      </div>

      <div className="p-8">
        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
              EXPERIENCE
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-purple-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {exp.position}
                      </h3>
                      <p className="text-purple-600 font-semibold">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <p className="text-gray-500 text-sm">{exp.location}</p>
                  )}
                  {exp.description && (
                    <p className="text-gray-600 text-sm mt-2 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-pink-500 pl-4">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-pink-600 font-medium">{edu.school}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
                PROJECTS
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="border-l-4 border-indigo-500 pl-4"
                  >
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    {project.technologies && (
                      <p className="text-indigo-600 text-sm font-medium">
                        {project.technologies}
                      </p>
                    )}
                    {project.description && (
                      <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">
                        {project.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
