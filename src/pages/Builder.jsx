import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResume } from "../contexts/ResumeContext";
import PersonalInfoForm from "../components/resume/PersonalInfoForm";
import EducationForm from "../components/resume/EducationForm";
import ExperienceForm from "../components/resume/ExperienceForm";
import SkillsForm from "../components/resume/SkillsForm";
import ProjectsForm from "../components/resume/ProjectsForm";
import ResumePreview from "../components/resume/ResumePreview";
import {
  Save,
  Download,
  Eye,
  EyeOff,
  User,
  GraduationCap,
  Briefcase,
  Code,
  FolderKanban,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Builder = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const {
    currentResume,
    loadResume,
    saveResume,
    createResume,
    currentResumeId,
    loading,
    saving,
  } = useResume();

  const [activeSection, setActiveSection] = useState("personal");
  const [showPreview, setShowPreview] = useState(true);
  const [exporting, setExporting] = useState(false);

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: FolderKanban },
  ];

  useEffect(() => {
    const initializeResume = async () => {
      try {
        if (resumeId) {
          console.log("Loading resume with ID:", resumeId);
          await loadResume(resumeId);
        } else if (!currentResumeId) {
          console.log("Creating new resume");
          const newResumeId = await createResume("Untitled Resume");
          navigate(`/builder/${newResumeId}`, { replace: true });
        }
      } catch (error) {
        console.error("Error initializing resume:", error);
        // If there's an error, redirect to dashboard
        navigate("/dashboard");
      }
    };
    initializeResume();
  }, [resumeId]);

  const handleSave = async () => {
    try {
      await saveResume();
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const previewElement = document.getElementById("resume-preview");
      if (!previewElement) {
        console.error("Resume preview element not found!");
        alert("Resume preview not found. Please try again.");
        return;
      }

      console.log("Starting PDF export...");
      console.log("Resume preview element found:", previewElement);
      console.log(
        "Resume preview dimensions:",
        previewElement.offsetWidth,
        "x",
        previewElement.offsetHeight
      );

      let canvas;
      try {
        canvas = await html2canvas(previewElement, {
          scale: 1.5,
          useCORS: true,
          logging: false,
          allowTaint: false,
          backgroundColor: "#ffffff",
          width: previewElement.offsetWidth,
          height: previewElement.offsetHeight,
        });
        console.log("Canvas created successfully");
      } catch (canvasError) {
        console.error("html2canvas error:", canvasError);
        // Fallback: try with minimal options
        canvas = await html2canvas(previewElement, {
          scale: 1,
          useCORS: false,
          logging: false,
          allowTaint: false,
        });
        console.log("Canvas created with fallback options");
      }

      console.log("Canvas created, creating PDF...");
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      const fileName = `${currentResume.title || "resume"}.pdf`;
      pdf.save(fileName);
      console.log("PDF saved:", fileName);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Error exporting PDF. Please try again. Error: " + error.message);
    } finally {
      setExporting(false);
    }
  };

  const renderActiveForm = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfoForm />;
      case "education":
        return <EducationForm />;
      case "experience":
        return <ExperienceForm />;
      case "skills":
        return <SkillsForm />;
      case "projects":
        return <ProjectsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  const currentSectionIndex = sections.findIndex((s) => s.id === activeSection);
  const canGoPrevious = currentSectionIndex > 0;
  const canGoNext = currentSectionIndex < sections.length - 1;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="ml-4 text-gray-600">Loading resume...</p>
      </div>
    );
  }

  // Check if currentResume has data
  if (!currentResume || !currentResume.personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing resume...</p>
          <p className="text-sm text-gray-500 mt-2">
            Resume ID: {resumeId || "New"}
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={currentResume.title}
                onChange={(e) => {
                  /* Update title */
                }}
                className="text-lg font-medium border-none focus:ring-0 bg-transparent"
                placeholder="Resume Title"
              />
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="inline-flex items-center px-3 py-1.5 text-gray-600 hover:text-gray-900 text-sm lg:hidden"
              >
                {showPreview ? (
                  <EyeOff className="h-4 w-4 mr-1" />
                ) : (
                  <Eye className="h-4 w-4 mr-1" />
                )}
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-1" />
                )}
                Save
              </button>
              <button
                onClick={handleExportPDF}
                disabled={exporting}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm disabled:opacity-50"
              >
                {exporting ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-1" />
                )}
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Form Panel */}
          <div
            className={`${
              showPreview ? "w-1/2" : "w-full"
            } transition-all lg:w-1/2`}
          >
            {/* Section Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
              <div className="flex overflow-x-auto">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex-1 min-w-max flex items-center justify-center px-4 py-3 text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? "bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {section.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {renderActiveForm()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6 pt-6 border-t">
                <button
                  onClick={() =>
                    setActiveSection(sections[currentSectionIndex - 1].id)
                  }
                  disabled={!canGoPrevious}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>
                <button
                  onClick={() =>
                    setActiveSection(sections[currentSectionIndex + 1].id)
                  }
                  disabled={!canGoNext}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div
            className={`${showPreview ? "w-1/2" : "hidden"} lg:block lg:w-1/2`}
          >
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-36">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Live Preview
              </h3>
              <div className="overflow-auto max-h-[calc(100vh-200px)]">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
