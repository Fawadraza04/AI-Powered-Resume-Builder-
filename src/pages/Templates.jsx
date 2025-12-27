import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../contexts/ResumeContext";
import { useAuth } from "../contexts/AuthContext";
import { Check, Eye } from "lucide-react";

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with a sidebar",
    preview: "/src/assets/templates/modern.webp",
    fallback: "bg-gradient-to-br from-indigo-500 to-purple-600",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Simple and elegant with focus on content",
    preview: "/src/assets/templates/minimalist.webp",
    fallback: "bg-gradient-to-br from-gray-700 to-gray-900",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and unique design for creative roles",
    preview: "/src/assets/templates/creative.webp",
    fallback: "bg-gradient-to-br from-pink-500 to-orange-500",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional layout preferred by corporations",
    preview: "/src/assets/templates/professional.webp",
    fallback: "bg-gradient-to-br from-blue-600 to-blue-800",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for senior positions",
    preview: "/src/assets/templates/executive.png",
    fallback: "bg-gradient-to-br from-slate-700 to-slate-900",
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Refined style with subtle accents",
    preview: "/src/assets/templates/elegant.webp",
    fallback: "bg-gradient-to-br from-emerald-500 to-teal-600",
  },
];

const Templates = () => {
  const { currentResume, setTemplate, createResume, currentResumeId } =
    useResume();
  const { currentUser } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState(
    currentResume?.template || "modern"
  );
  const [failedImages, setFailedImages] = useState(new Set());
  const navigate = useNavigate();

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
    setTemplate(templateId);
  };

  const handleUseTemplate = async () => {
    console.log("handleUseTemplate called");
    console.log("currentUser:", currentUser);
    console.log("currentResumeId:", currentResumeId);
    console.log("selectedTemplate:", selectedTemplate);

    if (!currentUser) {
      console.log("No currentUser, redirecting to login");
      alert("Please login first to create a resume.");
      navigate("/login");
      return;
    }

    try {
      if (!currentResumeId) {
        console.log("Creating new resume...");
        const newResumeId = await createResume("Untitled Resume");
        console.log("New resume created with ID:", newResumeId);
        setTemplate(selectedTemplate);
        navigate(`/builder/${newResumeId}`);
      } else {
        console.log("Using existing resume:", currentResumeId);
        setTemplate(selectedTemplate);
        navigate(`/builder/${currentResumeId}`);
      }
    } catch (error) {
      console.error("Error using template:", error);
      alert("Error creating resume. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Resume Template
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a template that best represents your professional style. You
            can change templates anytime without losing your data.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleSelectTemplate(template.id)}
              className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                selectedTemplate === template.id
                  ? "border-indigo-600 shadow-lg ring-2 ring-indigo-200"
                  : "border-gray-200 hover:border-indigo-300 hover:shadow-md"
              }`}
            >
              {/* Template Preview */}
              <div
                className={`aspect-3/4 relative overflow-hidden ${
                  failedImages.has(template.id) ? template.fallback : ""
                }`}
              >
                <img
                  src={template.preview}
                  alt={`${template.name} template preview`}
                  className="w-full h-full object-cover"
                  onError={() => {
                    setFailedImages((prev) => new Set([...prev, template.id]));
                  }}
                />
                {selectedTemplate === template.id && (
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                    <Check className="h-5 w-5 text-indigo-600" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                  <Eye className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Use Template Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleUseTemplate}
            className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Use This Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default Templates;
