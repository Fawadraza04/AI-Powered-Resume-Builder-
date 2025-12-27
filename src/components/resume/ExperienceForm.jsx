import { useState } from "react";
import { useResume } from "../../contexts/ResumeContext";
import { generateSuggestion } from "../../config/openai";
import { Plus, Trash2, Briefcase, Sparkles, Loader2 } from "lucide-react";

const ExperienceForm = () => {
  const { currentResume, addItem, updateItem, deleteItem } = useResume();
  const { experience } = currentResume;
  const [aiLoading, setAiLoading] = useState(null);

  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  const handleAdd = () => {
    if (newExperience.company && newExperience.position) {
      addItem("experience", newExperience);
      setNewExperience({
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      });
    }
  };

  const handleUpdate = (id, field, value) => {
    updateItem("experience", id, { [field]: value });
  };

  const generateDescription = async (exp) => {
    setAiLoading(exp.id);
    try {
      const prompt = `Improve this job description for a ${exp.position} at ${
        exp.company
      }:
        "${exp.description || "No description provided"}"
        
        Generate 3-4 impactful bullet points using action verbs and quantifiable achievements.
        If no description is provided, create relevant bullet points for this role.`;

      const suggestion = await generateSuggestion(prompt, "experience");
      handleUpdate(exp.id, "description", suggestion);
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
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Work Experience
        </h2>
        <p className="text-sm text-gray-600">
          Add your professional experience
        </p>
      </div>

      {/* Existing Experience Items */}
      {experience.length > 0 && (
        <div className="space-y-4">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-indigo-600" />
                  <span className="font-medium text-gray-900">
                    {exp.position} at {exp.company}
                  </span>
                </div>
                <button
                  onClick={() => deleteItem("experience", exp.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    handleUpdate(exp.id, "company", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Company Name"
                />
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) =>
                    handleUpdate(exp.id, "position", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Job Title"
                />
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) =>
                    handleUpdate(exp.id, "location", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Location"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) =>
                      handleUpdate(exp.id, "current", e.target.checked)
                    }
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-600">
                    I currently work here
                  </span>
                </div>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleUpdate(exp.id, "startDate", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Start Date (e.g., Jan 2020)"
                />
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleUpdate(exp.id, "endDate", e.target.value)
                  }
                  disabled={exp.current}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                  placeholder={exp.current ? "Present" : "End Date"}
                />
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <button
                    onClick={() => generateDescription(exp)}
                    disabled={aiLoading === exp.id}
                    className="inline-flex items-center text-xs text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                  >
                    {aiLoading === exp.id ? (
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    ) : (
                      <Sparkles className="h-3 w-3 mr-1" />
                    )}
                    AI Improve
                  </button>
                </div>
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    handleUpdate(exp.id, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                  placeholder="• Describe your responsibilities and achievements&#10;• Use action verbs and quantify results&#10;• Highlight key accomplishments"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Experience */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Add New Experience
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            value={newExperience.company}
            onChange={(e) =>
              setNewExperience({ ...newExperience, company: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Company Name *"
          />
          <input
            type="text"
            value={newExperience.position}
            onChange={(e) =>
              setNewExperience({ ...newExperience, position: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Job Title *"
          />
          <input
            type="text"
            value={newExperience.location}
            onChange={(e) =>
              setNewExperience({ ...newExperience, location: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Location"
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newExperience.current}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  current: e.target.checked,
                })
              }
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-600">I currently work here</span>
          </div>
          <input
            type="text"
            value={newExperience.startDate}
            onChange={(e) =>
              setNewExperience({ ...newExperience, startDate: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Start Date"
          />
          <input
            type="text"
            value={newExperience.endDate}
            onChange={(e) =>
              setNewExperience({ ...newExperience, endDate: e.target.value })
            }
            disabled={newExperience.current}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
            placeholder={newExperience.current ? "Present" : "End Date"}
          />
        </div>
        <textarea
          value={newExperience.description}
          onChange={(e) =>
            setNewExperience({ ...newExperience, description: e.target.value })
          }
          className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
          rows={3}
          placeholder="Job description..."
        />
        <button
          onClick={handleAdd}
          disabled={!newExperience.company || !newExperience.position}
          className="mt-3 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Experience
        </button>
      </div>
    </div>
  );
};

export default ExperienceForm;
