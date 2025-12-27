import { useState } from "react";
import { useResume } from "../../contexts/ResumeContext";
import { Plus, Trash2, GraduationCap } from "lucide-react";

const EducationForm = () => {
  const { currentResume, addItem, updateItem, deleteItem } = useResume();
  const { education } = currentResume;

  const [newEducation, setNewEducation] = useState({
    school: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    gpa: "",
    description: "",
  });

  const handleAdd = () => {
    if (newEducation.school && newEducation.degree) {
      addItem("education", newEducation);
      setNewEducation({
        school: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: "",
        description: "",
      });
    }
  };

  const handleUpdate = (id, field, value) => {
    updateItem("education", id, { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Education</h2>
        <p className="text-sm text-gray-600">Add your educational background</p>
      </div>

      {/* Existing Education Items */}
      {education.length > 0 && (
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                  <span className="font-medium text-gray-900">
                    {edu.school}
                  </span>
                </div>
                <button
                  onClick={() => deleteItem("education", edu.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) =>
                    handleUpdate(edu.id, "school", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="School Name"
                />
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    handleUpdate(edu.id, "degree", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Degree"
                />
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) =>
                    handleUpdate(edu.id, "field", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Field of Study"
                />
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => handleUpdate(edu.id, "gpa", e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="GPA (optional)"
                />
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) =>
                    handleUpdate(edu.id, "startDate", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Start Date (e.g., Sep 2018)"
                />
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) =>
                    handleUpdate(edu.id, "endDate", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="End Date (e.g., May 2022)"
                />
              </div>
              <textarea
                value={edu.description}
                onChange={(e) =>
                  handleUpdate(edu.id, "description", e.target.value)
                }
                className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                rows={2}
                placeholder="Additional details, honors, activities..."
              />
            </div>
          ))}
        </div>
      )}

      {/* Add New Education */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Add New Education
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            value={newEducation.school}
            onChange={(e) =>
              setNewEducation({ ...newEducation, school: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="School Name *"
          />
          <input
            type="text"
            value={newEducation.degree}
            onChange={(e) =>
              setNewEducation({ ...newEducation, degree: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Degree *"
          />
          <input
            type="text"
            value={newEducation.field}
            onChange={(e) =>
              setNewEducation({ ...newEducation, field: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Field of Study"
          />
          <input
            type="text"
            value={newEducation.gpa}
            onChange={(e) =>
              setNewEducation({ ...newEducation, gpa: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="GPA (optional)"
          />
          <input
            type="text"
            value={newEducation.startDate}
            onChange={(e) =>
              setNewEducation({ ...newEducation, startDate: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Start Date"
          />
          <input
            type="text"
            value={newEducation.endDate}
            onChange={(e) =>
              setNewEducation({ ...newEducation, endDate: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="End Date"
          />
        </div>
        <textarea
          value={newEducation.description}
          onChange={(e) =>
            setNewEducation({ ...newEducation, description: e.target.value })
          }
          className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
          rows={2}
          placeholder="Additional details (optional)"
        />
        <button
          onClick={handleAdd}
          disabled={!newEducation.school || !newEducation.degree}
          className="mt-3 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Education
        </button>
      </div>
    </div>
  );
};

export default EducationForm;
