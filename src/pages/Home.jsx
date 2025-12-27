import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FileText,
  Sparkles,
  Download,
  Palette,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Home = () => {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Suggestions",
      description:
        "Get smart suggestions for your professional summary, job descriptions, and skills.",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Beautiful Templates",
      description:
        "Choose from multiple professionally designed templates to make your resume stand out.",
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Easy Export",
      description:
        "Download your resume as a PDF with one click, ready to share with employers.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Real-time Preview",
      description:
        "See changes instantly as you edit your resume with our live preview feature.",
    },
  ];

  const benefits = [
    "Create unlimited resumes",
    "AI-powered content suggestions",
    "Multiple template designs",
    "Export to PDF format",
    "Cloud storage for your resumes",
    "Mobile-friendly editor",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Build Your Perfect Resume
              <span className="block text-indigo-200">with AI Assistance</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Create professional resumes in minutes with our AI-powered
              builder. Stand out from the competition and land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build a Great Resume
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered tools help you create professional resumes that get
              noticed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose ResumeAI?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our platform combines cutting-edge AI technology with beautiful
                design to help you create resumes that stand out.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-24 w-24 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Resume?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of job seekers who have created winning resumes with
            ResumeAI.
          </p>
          {!currentUser && (
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-all shadow-lg"
            >
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
