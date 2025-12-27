import { useState } from "react";
import { useResume } from "../../contexts/ResumeContext";
import { generateSuggestion } from "../../config/openai";
import {
  Plus,
  Trash2,
  FolderKanban,
  Sparkles,
  Loader2,
  ExternalLink,
} from "lucide-react";

const ProjectsForm = () => {
  const { currentResume, addItem, updateItem, deleteItem } = useResume();
  const { projects } = currentResume;
  const [aiLoading, setAiLoading] = useState(null);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    technologies: "",
    link: "",
    startDate: "",
    endDate: "",
  });

  const handleAdd = () => {
    if (newProject.name) {
      addItem("projects", newProject);
      setNewProject({
        name: "",
        description: "",
        technologies: "",
        link: "",
        startDate: "",
        endDate: "",
      });
    }
  };

  const handleUpdate = (id, field, value) => {
    updateItem("projects", id, { [field]: value });
  };

  const generateDescription = async (project) => {
    setAiLoading(project.id);
    try {
      const prompt = `Improve this project description for "${project.name}":
        "${project.description || "No description provided"}"
        Technologies used: ${project.technologies || "Not specified"}
        
        Generate 2-3 impactful bullet points highlighting:
        - What the project does
        - Your role and contributions
        - Technologies used and impact`;

      const suggestion = await generateSuggestion(prompt, "projects");
      handleUpdate(project.id, "description", suggestion);
    } catch (error) {
      console.error("Error generating description:", error);
      alert(
        "Failed to generate AI suggestion. Please check your OpenAI API key."
      );
    }
    setAiLoading(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Projects</h2>
        <p className="text-sm text-gray-600">
          Showcase your personal or professional projects
        </p>
      </div>

      {/* Existing Projects */}
      {projects.length > 0 && (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <FolderKanban className="h-5 w-5 text-indigo-600" />
                  <span className="font-medium text-gray-900">
                    {project.name}
                  </span>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <button
                  onClick={() => deleteItem("projects", project.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) =>
                    handleUpdate(project.id, "name", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Project Name"
                />
                <input
                  type="url"
                  value={project.link}
                  onChange={(e) =>
                    handleUpdate(project.id, "link", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Project URL (optional)"
                />
                <input
                  type="text"
                  value={project.technologies}
                  onChange={(e) =>
                    handleUpdate(project.id, "technologies", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 md:col-span-2"
                  placeholder="Technologies (e.g., React, Node.js, MongoDB)"
                />
                <input
                  type="text"
                  value={project.startDate}
                  onChange={(e) =>
                    handleUpdate(project.id, "startDate", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Start Date"
                />
                <input
                  type="text"
                  value={project.endDate}
                  onChange={(e) =>
                    handleUpdate(project.id, "endDate", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="End Date"
                />
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <button
                    onClick={() => generateDescription(project)}
                    disabled={aiLoading === project.id}
                    className="inline-flex items-center text-xs text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                  >
                    {aiLoading === project.id ? (
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    ) : (
                      <Sparkles className="h-3 w-3 mr-1" />
                    )}
                    AI Improve
                  </button>
                </div>
                <textarea
                  value={project.description}
                  onChange={(e) =>
                    handleUpdate(project.id, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  placeholder="• Describe what the project does&#10;• Highlight your role and contributions&#10;• Mention the impact or results"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Project */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Add New Project
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Project Name *"
          />
          <input
            type="url"
            value={newProject.link}
            onChange={(e) =>
              setNewProject({ ...newProject, link: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Project URL (optional)"
          />
          <input
            type="text"
            value={newProject.technologies}
            onChange={(e) =>
              setNewProject({ ...newProject, technologies: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 md:col-span-2"
            placeholder="Technologies used"
          />
          <input
            type="text"
            value={newProject.startDate}
            onChange={(e) =>
              setNewProject({ ...newProject, startDate: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Start Date"
          />
          <input
            type="text"
            value={newProject.endDate}
            onChange={(e) =>
              setNewProject({ ...newProject, endDate: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="End Date"
          />
        </div>
        <textarea
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
          className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
          rows={3}
          placeholder="Project description..."
        />
        <button
          onClick={handleAdd}
          disabled={!newProject.name}
          className="mt-3 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsForm;
