import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

const MinimalistTemplate = ({ resume }) => {
  const { personalInfo, education, experience, skills, projects } = resume;

  return (
    <div
      className="w-full min-h-[297mm] bg-white text-gray-800 p-8"
      style={{ fontFamily: "Georgia, serif" }}
    >
      {/* Header */}
      <div className="text-center mb-8 border-b border-gray-200 pb-6">
        <img
          src="https://via.placeholder.com/100x100/374151/ffffff?text=Photo"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {personalInfo.location}
            </span>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-2">
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-3 w-3" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <p className="text-gray-700 text-sm leading-relaxed text-center italic">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-300 pb-1">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 font-medium">{exp.company}</p>
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

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p className="text-gray-700">{edu.school}</p>
                {edu.field && (
                  <p className="text-gray-600 text-sm">{edu.field}</p>
                )}
                {edu.gpa && (
                  <p className="text-gray-500 text-sm">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-300 pb-1">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  {project.startDate && (
                    <span className="text-sm text-gray-500">
                      {project.startDate} — {project.endDate || "Present"}
                    </span>
                  )}
                </div>
                {project.technologies && (
                  <p className="text-gray-600 text-sm italic">
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

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-300 pb-1">
            Skills
          </h2>
          <p className="text-gray-700 text-sm">{skills.join(" • ")}</p>
        </div>
      )}
    </div>
  );
};

export default MinimalistTemplate;
