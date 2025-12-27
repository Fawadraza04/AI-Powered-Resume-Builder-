import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../contexts/ResumeContext";
import { useAuth } from "../contexts/AuthContext";
import { generateSuggestion } from "../config/openai";
import { FileText, Sparkles, Loader2, Download, ArrowLeft } from "lucide-react";

const CoverLetter = () => {
  const { currentResume } = useResume();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCoverLetter = async () => {
    if (!jobTitle.trim() || !companyName.trim()) {
      alert("Please enter at least a job title and company name");
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = `Write a professional cover letter for the position of "${jobTitle}" at ${companyName}.

Applicant Information:
- Name: ${currentResume.personalInfo?.firstName} ${
        currentResume.personalInfo?.lastName
      }
- Current/Most Recent Position: ${
        currentResume.experience?.[0]?.position || "Professional"
      }
- Key Skills: ${
        currentResume.skills?.join(", ") || "Various professional skills"
      }
- Years of Experience: Based on resume data
- Education: ${currentResume.education?.[0]?.degree || "Relevant education"}

Job Details:
- Position: ${jobTitle}
- Company: ${companyName}
- Job Description: ${jobDescription || "Not provided"}

Additional Context: ${additionalInfo || "None provided"}

Please write a compelling cover letter that:
1. Introduces the applicant and the position they're applying for
2. Highlights relevant experience and skills that match the job requirements
3. Shows enthusiasm for the company and role
4. Includes specific examples from their background
5. Ends with a strong call to action

Keep it professional, concise (250-400 words), and tailored to the specific role and company.`;

      const letter = await generateSuggestion(prompt, "cover-letter");
      setGeneratedLetter(letter);
    } catch (error) {
      console.error("Error generating cover letter:", error);
      alert("Error generating cover letter. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAsText = () => {
    if (!generatedLetter) return;

    const element = document.createElement("a");
    const file = new Blob([generatedLetter], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Cover_Letter_${jobTitle}_${companyName}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please Login First
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to generate cover letters.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          <div className="flex items-center mb-4">
            <FileText className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              AI Cover Letter Generator
            </h1>
          </div>
          <p className="text-gray-600">
            Generate personalized cover letters tailored to specific job
            applications using your resume data and AI assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Job Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Software Engineer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Google Inc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description (Optional)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here to make the cover letter more targeted..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Any specific points you want to highlight or additional context..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={generateCoverLetter}
                disabled={
                  isGenerating || !jobTitle.trim() || !companyName.trim()
                }
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Cover Letter
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Letter */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Generated Cover Letter
              </h2>
              {generatedLetter && (
                <button
                  onClick={downloadAsText}
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
              )}
            </div>

            {generatedLetter ? (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                  {generatedLetter}
                </pre>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Your generated cover letter will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetter;
