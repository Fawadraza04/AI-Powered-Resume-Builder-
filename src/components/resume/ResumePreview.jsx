import { useResume } from "../../contexts/ResumeContext";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";

const ResumePreview = () => {
  const { currentResume } = useResume();
  const template = currentResume.template || "modern";

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate resume={currentResume} />;
      case "minimalist":
        return <MinimalistTemplate resume={currentResume} />;
      case "creative":
        return <CreativeTemplate resume={currentResume} />;
      case "professional":
        return <ProfessionalTemplate resume={currentResume} />;
      case "executive":
        return <ExecutiveTemplate resume={currentResume} />;
      case "elegant":
        return <ElegantTemplate resume={currentResume} />;
      default:
        return <ModernTemplate resume={currentResume} />;
    }
  };

  return (
    <div id="resume-preview" className="bg-white shadow-lg">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
