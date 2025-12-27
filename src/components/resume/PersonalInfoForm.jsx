import { useState } from "react";
import { useResume } from "../../contexts/ResumeContext";
import { generateSuggestion } from "../../config/openai";
import { Sparkles, Loader2 } from "lucide-react";

const PersonalInfoForm = () => {
  const { currentResume, updatePersonalInfo } = useResume();
  const { personalInfo } = currentResume;
  const [aiLoading, setAiLoading] = useState(false);

  const handleChange = (field, value) => {
    updatePersonalInfo(field, value);
  };

  const generateSummary = async () => {
    setAiLoading(true);
    try {
      const prompt = `Generate a professional summary for someone named ${
        personalInfo.fullName || "a professional"
      }. 
        They can be reached at ${personalInfo.email || "email not provided"}.
        Location: ${personalInfo.location || "not specified"}.
        Create a compelling 2-3 sentence professional summary that highlights their potential value to employers.`;

      const suggestion = await generateSuggestion(prompt, "summary");
      handleChange("summary", suggestion);
    } catch (error) {
      console.error("Error generating summary:", error);
      alert(
        "Failed to generate AI suggestion. Please check your OpenAI API key."
      );
    }
    setAiLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Personal Information
        </h2>
        <p className="text-sm text-gray-600">
          Add your contact details and professional summary
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={personalInfo.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="New York, NY"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn URL
          </label>
          <input
            type="url"
            value={personalInfo.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website/Portfolio
          </label>
          <input
            type="url"
            value={personalInfo.website}
            onChange={(e) => handleChange("website", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="johndoe.com"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Professional Summary
          </label>
          <button
            onClick={generateSummary}
            disabled={aiLoading}
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
          >
            {aiLoading ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 mr-1" />
            )}
            AI Suggest
          </button>
        </div>
        <textarea
          value={personalInfo.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Write a brief professional summary highlighting your experience and career goals..."
        />
        <p className="mt-1 text-xs text-gray-500">
          Tip: Use AI Suggest to generate a professional summary based on your
          information
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
