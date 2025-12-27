import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

const ProfessionalTemplate = ({ resume }) => {
  const { personalInfo, education, experience, skills, projects } = resume;

  return (
    <div
      className="w-full min-h-[297mm] bg-white text-gray-800 p-8"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <img
          src="/src/assets/templates/professional/profile-placeholder.png"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">
          {personalInfo.fullName || "Your Name"}
        </h1>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-3">
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
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-300 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 italic">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ""}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                {exp.description && (
                  <p className="text-gray-600 text-sm mt-2 whitespace-pre-line pl-4">
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
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </h3>
                    <p className="text-gray-700 italic">{edu.school}</p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {edu.startDate} – {edu.endDate}
                  </p>
                </div>
                {edu.gpa && (
                  <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>
                )}
                {edu.description && (
                  <p className="text-gray-600 text-sm mt-1">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-300 pb-1">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  {project.startDate && (
                    <p className="text-gray-600 text-sm">
                      {project.startDate} – {project.endDate || "Present"}
                    </p>
                  )}
                </div>
                {project.technologies && (
                  <p className="text-gray-600 text-sm italic">
                    Technologies: {project.technologies}
                  </p>
                )}
                {project.description && (
                  <p className="text-gray-600 text-sm mt-1 whitespace-pre-line pl-4">
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
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">
            Skills
          </h2>
          <p className="text-gray-700 text-sm">{skills.join(" | ")}</p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
