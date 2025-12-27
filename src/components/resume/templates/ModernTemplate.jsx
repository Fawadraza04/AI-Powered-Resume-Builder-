import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

const ModernTemplate = ({ resume }) => {
  const { personalInfo, education, experience, skills, projects } = resume;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "297mm",
        backgroundColor: "white",
        color: "#1f2937",
        fontSize: "0.875rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div className="flex">
        {/* Sidebar */}
        <div
          style={{
            width: "33.333%",
            backgroundColor: "#4338ca",
            color: "white",
            padding: "1.5rem",
            minHeight: "297mm",
          }}
        >
          {/* Name & Image */}
          <div className="mb-8">
            <img
              src="https://via.placeholder.com/100x100/4338ca/ffffff?text=Photo"
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold mb-1">
              {personalInfo.fullName || "Your Name"}
            </h1>
            {personalInfo.summary && (
              <p
                style={{
                  color: "#c7d2fe",
                  fontSize: "0.75rem",
                  lineHeight: "1.625",
                  marginTop: "0.75rem",
                }}
              >
                {personalInfo.summary}
              </p>
            )}
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2
              style={{
                fontSize: "0.875rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.75rem",
                borderBottom: "1px solid #6366f1",
                paddingBottom: "0.25rem",
              }}
            >
              Contact
            </h2>
            <div className="space-y-2 text-xs">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-3 w-3" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3" />
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-indigo-500 pb-1">
                Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "0.25rem 0.5rem",
                      backgroundColor: "#4f46e5",
                      borderRadius: "0.25rem",
                      fontSize: "0.75rem",
                      color: "white",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-indigo-500 pb-1">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-xs">{edu.degree}</h3>
                    <p style={{ color: "#c7d2fe", fontSize: "0.75rem" }}>
                      {edu.school}
                    </p>
                    <p style={{ color: "#a5b4fc", fontSize: "0.75rem" }}>
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.gpa && (
                      <p style={{ color: "#c7d2fe", fontSize: "0.75rem" }}>
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-6">
          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                  color: "#4338ca",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "1rem",
                  borderBottom: "2px solid #4338ca",
                  paddingBottom: "0.25rem",
                }}
              >
                Work Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {exp.position}
                        </h3>
                        <p style={{ color: "#4f46e5", fontWeight: "500" }}>
                          {exp.company}
                        </p>
                      </div>
                      <p className="text-gray-500 text-xs">
                        {exp.startDate} -{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    {exp.location && (
                      <p className="text-gray-500 text-xs">{exp.location}</p>
                    )}
                    {exp.description && (
                      <p className="text-gray-600 text-xs mt-2 whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                  color: "#4338ca",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "1rem",
                  borderBottom: "2px solid #4338ca",
                  paddingBottom: "0.25rem",
                }}
              >
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900">
                        {project.name}
                      </h3>
                      {project.startDate && (
                        <p className="text-gray-500 text-xs">
                          {project.startDate} - {project.endDate || "Present"}
                        </p>
                      )}
                    </div>
                    {project.technologies && (
                      <p
                        style={{
                          color: "#4f46e5",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                        }}
                      >
                        {project.technologies}
                      </p>
                    )}
                    {project.description && (
                      <p className="text-gray-600 text-xs mt-1 whitespace-pre-line">
                        {project.description}
                      </p>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        style={{ color: "#4f46e5", fontSize: "0.75rem" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.link}
                      </a>
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

export default ModernTemplate;
