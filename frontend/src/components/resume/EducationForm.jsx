import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const EducationForm = ({ edu, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    edu || {
      institution_name: "",
      degree_name: "",
      start_year: "",
      end_year: "",
      grade: "",
      highlights: [],
    },
  );
  const [newHighlight, setNewHighlight] = useState("");
  const addHighlight = () => {
    if (newHighlight.trim()) {
      setFormData({
        ...formData,
        highlights: [...(formData.highlights || []), newHighlight.trim()],
      });
      setNewHighlight("");
    }
  };
  const removeHighlight = (index) =>
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index),
    });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Institution Name"
          value={formData.institution_name}
          onChange={(e) =>
            setFormData({ ...formData, institution_name: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Degree Name"
          value={formData.degree_name}
          onChange={(e) =>
            setFormData({ ...formData, degree_name: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Start Year"
          value={formData.start_year}
          onChange={(e) =>
            setFormData({ ...formData, start_year: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="End Year"
          value={formData.end_year}
          onChange={(e) =>
            setFormData({ ...formData, end_year: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Grade / GPA"
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Highlights / Achievements
        </label>
        {formData.highlights?.map((highlight, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={highlight}
              onChange={(e) => {
                const newHighlights = [...formData.highlights];
                newHighlights[index] = e.target.value;
                setFormData({ ...formData, highlights: newHighlights });
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => removeHighlight(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={newHighlight}
            onChange={(e) => setNewHighlight(e.target.value)}
            placeholder="Add an achievement"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && addHighlight()}
          />
          <button
            onClick={addHighlight}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(formData)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EducationForm;
