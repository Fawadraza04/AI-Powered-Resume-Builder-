import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useResume } from "../contexts/ResumeContext";
import {
  Plus,
  FileText,
  Edit,
  Trash2,
  Copy,
  Download,
  Calendar,
  MoreVertical,
  Search,
  Filter,
  Award,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const templateData = {
  modern: {
    preview: "/src/assets/templates/modern.webp",
    fallback: "bg-linear-to-br from-indigo-500 to-purple-600",
  },
  minimalist: {
    preview: "/src/assets/templates/minimalist.webp",
    fallback: "bg-linear-to-br from-gray-700 to-gray-900",
  },
  creative: {
    preview: "/src/assets/templates/creative.webp",
    fallback: "bg-linear-to-br from-pink-500 to-orange-500",
  },
  professional: {
    preview: "/src/assets/templates/professional.webp",
    fallback: "bg-linear-to-br from-blue-600 to-blue-800",
  },
  executive: {
    preview: "/src/assets/templates/executive.png",
    fallback: "bg-gradient-to-br from-slate-700 to-slate-900",
  },
  elegant: {
    preview: "/src/assets/templates/elegant.webp",
    fallback: "bg-linear-to-br from-emerald-500 to-teal-600",
  },
};

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { resumes, createResume, deleteResume, duplicateResume, loading } =
    useResume();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [failedImages, setFailedImages] = useState(new Set());

  const [showCertificate, setShowCertificate] = useState(false);

  const filteredResumes = resumes.filter((resume) =>
    resume.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateResume = async () => {
    try {
      const resumeId = await createResume("Untitled Resume");
      navigate(`/builder/${resumeId}`);
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  const handleEditResume = (resumeId) => {
    navigate(`/builder/${resumeId}`);
  };

  const handleDeleteResume = async (resumeId) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await deleteResume(resumeId);
      } catch (error) {
        console.error("Error deleting resume:", error);
      }
    }
  };

  const handleDuplicateResume = async (resumeId) => {
    try {
      await duplicateResume(resumeId);
    } catch (error) {
      console.error("Error duplicating resume:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const downloadCertificate = async () => {
    try {
      const certificate = document.getElementById("certificate");
      if (!certificate) {
        console.error("Certificate element not found!");
        alert("Certificate not found. Please try again.");
        return;
      }

      console.log("Certificate element found:", certificate);
      console.log(
        "Certificate dimensions:",
        certificate.offsetWidth,
        "x",
        certificate.offsetHeight
      );
      let canvas;
      try {
        canvas = await html2canvas(certificate, {
          scale: 1.5,
          useCORS: true,
          logging: false,
          allowTaint: false,
          backgroundColor: "#ffffff",
          width: certificate.offsetWidth,
          height: certificate.offsetHeight,
        });
        console.log("Canvas created successfully");
      } catch (canvasError) {
        console.error("html2canvas error:", canvasError);
        // Fallback: try with minimal options
        canvas = await html2canvas(certificate, {
          scale: 1,
          useCORS: false,
          logging: false,
          allowTaint: false,
        });
        console.log("Canvas created with fallback options");
      }

      console.log("Certificate canvas created, creating PDF...");
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("completion-certificate.pdf");
      console.log("Certificate PDF saved");
    } catch (error) {
      console.error("Error downloading certificate:", error);
      alert(
        "Error downloading certificate. Please try again. Error: " +
          error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {currentUser?.displayName || "User"}!
            </h1>
            <p className="mt-1 text-gray-600">
              Manage your resumes and create new ones
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={() => setShowCertificate(true)}
              className="inline-flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <Award className="h-5 w-5 mr-2" />
              Get Certificate
            </button>
            <Link
              to="/cover-letter"
              className="inline-flex items-center px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              <FileText className="h-5 w-5 mr-2" />
              Cover Letter
            </Link>
            <button
              onClick={handleCreateResume}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Resume
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Resumes Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredResumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
              >
                <div className="aspect-3/4 bg-gray-100 flex items-center justify-center relative group overflow-hidden">
                  {(() => {
                    const templateId = resume.template || "modern";
                    const template = templateData[templateId];
                    const hasFailed = failedImages.has(
                      `${resume.id}-${templateId}`
                    );

                    return (
                      <>
                        {!hasFailed && template ? (
                          <img
                            src={template.preview}
                            alt={`${templateId} template`}
                            className="w-full h-full object-cover"
                            onError={() => {
                              setFailedImages(
                                (prev) =>
                                  new Set([
                                    ...prev,
                                    `${resume.id}-${templateId}`,
                                  ])
                              );
                            }}
                          />
                        ) : (
                          <div
                            className={`w-full h-full ${
                              template?.fallback ||
                              "bg-linear-to-br from-gray-400 to-gray-600"
                            } flex items-center justify-center`}
                          >
                            <FileText className="h-16 w-16 text-white/80" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleEditResume(resume.id)}
                            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5 text-gray-700" />
                          </button>
                          <button
                            onClick={() => handleDuplicateResume(resume.id)}
                            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                            title="Duplicate"
                          >
                            <Copy className="h-5 w-5 text-gray-700" />
                          </button>
                          <button
                            onClick={() => handleDeleteResume(resume.id)}
                            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5 text-red-600" />
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {resume.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Updated {formatDate(resume.updatedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full capitalize">
                      {resume.template || "modern"}
                    </span>
                    <button
                      onClick={() => handleEditResume(resume.id)}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      Edit →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No resumes yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first resume to get started
            </p>
            <button
              onClick={handleCreateResume}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Resume
            </button>
          </div>
        )}

        {/* Certificate Modal */}
        {showCertificate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Completion Certificate</h2>
                  <button
                    onClick={() => setShowCertificate(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                {/* Certificate */}
                <div
                  id="certificate"
                  style={{
                    background:
                      "linear-gradient(135deg, #eef2ff 0%, #faf5ff 100%)",
                    padding: "3rem",
                    borderRadius: "0.5rem",
                    border: "4px solid #c7d2fe",
                  }}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <Award
                        className="h-16 w-16"
                        style={{ color: "#4f46e5" }}
                      />
                    </div>
                    <h1
                      className="text-4xl font-serif font-bold mb-2"
                      style={{ color: "#312e81" }}
                    >
                      Certificate of Completion
                    </h1>
                    <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
                      This is to certify that
                    </p>
                    <p
                      style={{
                        fontSize: "1.875rem",
                        fontWeight: "bold",
                        color: "#111827",
                        marginBottom: "2rem",
                        fontFamily: "serif",
                      }}
                    >
                      {currentUser?.displayName || "User"}
                    </p>
                    <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
                      has successfully created {resumes.length} resume
                      {resumes.length !== 1 ? "s" : ""} using
                    </p>
                    <p
                      className="text-2xl font-bold mb-8"
                      style={{ color: "#4f46e5" }}
                    >
                      ResumeAI - AI-Powered Resume Builder
                    </p>
                    <p style={{ color: "#6b7280" }}>
                      Date:{" "}
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-6 space-x-3">
                  <button
                    onClick={() => setShowCertificate(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={downloadCertificate}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
