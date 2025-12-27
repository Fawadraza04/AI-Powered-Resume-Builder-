import { useState } from "react";
import { useResume } from "../../contexts/ResumeContext";
import { generateSuggestion } from "../../config/openai";
import { Plus, X, Sparkles, Loader2 } from "lucide-react";

const SkillsForm = () => {
  const { currentResume, updateSection } = useResume();
  const { skills } = currentResume;
  const [newSkill, setNewSkill] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      updateSection("skills", [...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    updateSection(
      "skills",
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const generateSkills = async () => {
    if (!jobTitle.trim()) {
      alert("Please enter a job title or field to get skill suggestions");
      return;
    }

    setAiLoading(true);
    try {
      const prompt = `Suggest 10 relevant technical and soft skills for a ${jobTitle} position. 
        Return them as a comma-separated list without numbers or bullet points.`;

      const suggestion = await generateSuggestion(prompt, "skills");
      const suggestedSkills = suggestion
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);

      // Add only skills that don't already exist
      const newSkills = suggestedSkills.filter(
        (skill) =>
          !skills.some(
            (existingSkill) =>
              existingSkill.toLowerCase() === skill.toLowerCase()
          )
      );

      if (newSkills.length > 0) {
        updateSection("skills", [...skills, ...newSkills]);
      }
    } catch (error) {
      console.error("Error generating skills:", error);
      alert(
        "Failed to generate AI suggestion. Please check your OpenAI API key."
      );
    }
    setAiLoading(false);
  };

  const skillCategories = [
    {
      name: "Programming",
      suggestions: [
        "JavaScript",
        "Python",
        "Java",
        "TypeScript",
        "C++",
        "React",
        "Node.js",
      ],
    },
    {
      name: "Design",
      suggestions: [
        "Figma",
        "Adobe XD",
        "Photoshop",
        "Illustrator",
        "UI/UX Design",
      ],
    },
    {
      name: "Soft Skills",
      suggestions: [
        "Leadership",
        "Communication",
        "Problem Solving",
        "Team Collaboration",
        "Time Management",
      ],
    },
    {
      name: "Tools",
      suggestions: ["Git", "Docker", "AWS", "Jira", "VS Code", "Slack"],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Skills</h2>
        <p className="text-sm text-gray-600">
          Add your technical and soft skills
        </p>
      </div>

      {/* AI Skill Suggestion */}
      <div className="bg-indigo-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-indigo-900 mb-2 flex items-center">
          <Sparkles className="h-4 w-4 mr-1" />
          AI Skill Suggestions
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="flex-1 px-3 py-2 border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your job title or field (e.g., Software Engineer)"
          />
          <button
            onClick={generateSkills}
            disabled={aiLoading}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
          >
            {aiLoading ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 mr-1" />
            )}
            Suggest Skills
          </button>
        </div>
      </div>

      {/* Current Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Skills ({skills.length})
        </label>
        <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border border-gray-300 rounded-lg bg-white">
          {skills.length === 0 ? (
            <span className="text-gray-400 text-sm">
              No skills added yet. Add skills below or use AI suggestions.
            </span>
          ) : (
            skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-1 text-indigo-600 hover:text-indigo-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Add New Skill */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add a Skill
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Type a skill and press Enter or click Add"
          />
          <button
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </button>
        </div>
      </div>

      {/* Quick Add Suggestions */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Quick Add</h3>
        {skillCategories.map((category) => (
          <div key={category.name}>
            <p className="text-xs text-gray-500 mb-2">{category.name}</p>
            <div className="flex flex-wrap gap-2">
              {category.suggestions.map((skill) => (
                <button
                  key={skill}
                  onClick={() => {
                    if (!skills.includes(skill)) {
                      updateSection("skills", [...skills, skill]);
                    }
                  }}
                  disabled={skills.includes(skill)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    skills.includes(skill)
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                  }`}
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;
