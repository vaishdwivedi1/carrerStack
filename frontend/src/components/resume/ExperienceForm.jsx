import { Plus, Trash2, Edit2 } from "lucide-react";
import { useState, useEffect } from "react";
import RichTextEditor from "../ai/RichTextEditor";

// Form Components
const ExperienceForm = ({
  exp,
  onSave,
  onCancel,
  isEditing = false,
  onDelete = null,
}) => {
  const [formData, setFormData] = useState(
    exp || {
      company_name: "",
      role: "",
      location: "",
      start_date: "",
      end_date: "",
      isPresentCompany: false,
      highlights: "",
    },
  );

  // Convert array of highlights to string if needed (for backwards compatibility)
  useEffect(() => {
    if (exp && Array.isArray(exp.highlights) && exp.highlights.length > 0) {
      // Convert array to formatted string with line breaks
      const highlightsString = exp.highlights.join("\n\n");
      setFormData((prev) => ({ ...prev, highlights: highlightsString }));
    }
  }, [exp]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Company Name"
          value={formData.company_name}
          onChange={(e) =>
            setFormData({ ...formData, company_name: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Role / Title"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          <input
            type="month"
            placeholder="Start Date"
            value={formData.start_date}
            onChange={(e) =>
              setFormData({ ...formData, start_date: e.target.value })
            }
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!formData.isPresentCompany ? (
            <input
              type="month"
              placeholder="End Date"
              value={formData.end_date}
              onChange={(e) =>
                setFormData({ ...formData, end_date: e.target.value })
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type="text"
              placeholder="Present"
              value="Present"
              disabled
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isPresentCompany}
            onChange={(e) =>
              setFormData({
                ...formData,
                isPresentCompany: e.target.checked,
                end_date: e.target.checked ? "" : formData.end_date,
              })
            }
            className="w-4 h-4"
          />
          <label className="text-sm text-gray-600">I currently work here</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Key Responsibilities & Achievements
        </label>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
          <p className="text-sm text-blue-800 flex items-center gap-2">
            <span className="text-lg">💡</span>
            <span>
              Pro Tip: Use the toolbar to format your achievements with bullet
              points, numbered lists, or dash lists for better readability!
            </span>
          </p>
        </div>
        <RichTextEditor
          value={formData.highlights}
          onChange={(value) => setFormData({ ...formData, highlights: value })}
          placeholder="• Led a team of 10 developers to successfully deliver project ahead of schedule
• Increased efficiency by 25% through process optimization
• Received 'Employee of the Month' award for outstanding performance"
          className="w-full"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            // Convert string highlights to array for saving (if needed)
            const saveData = {
              ...formData,
              highlights: formData.highlights ? [formData.highlights] : [],
            };
            onSave(saveData);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

// Card View Component for displaying experience with hover actions
export const ExperienceCard = ({ experience, onEdit, onDelete }) => {
  return (
    <div className="group relative border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      {/* Action Buttons - Positioned at top right corner */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(experience)}
          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Edit"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => onDelete(experience.id)}
          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="pr-16">
        {/* Title and Company */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {experience.role || "Untitled Role"}
          </h3>
          <p className="text-gray-600 font-medium">
            {experience.company_name || "Company Name"}
          </p>
        </div>

        {/* Location and Date */}
        <div className="flex flex-wrap justify-between items-start gap-2 mb-3 text-sm">
          {experience.location && (
            <span className="text-gray-500 flex items-center gap-1">
              📍 {experience.location}
            </span>
          )}
          <span className="text-gray-500">
            {experience.start_date || "Start Date"} -{" "}
            {experience.isPresentCompany
              ? "Present"
              : experience.end_date || "End Date"}
          </span>
        </div>

        {/* Highlights Preview */}
        {experience.highlights && experience.highlights.length > 0 && (
          <div className="mt-3">
            <div
              className="text-gray-600 text-sm prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: Array.isArray(experience.highlights)
                  ? experience.highlights[0]?.substring(0, 200) +
                    (experience.highlights[0]?.length > 200 ? "..." : "")
                  : experience.highlights?.substring(0, 200) +
                    (experience.highlights?.length > 200 ? "..." : ""),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
