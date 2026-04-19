import { useState, useEffect } from "react";
import RichTextEditor from "../ai/RichTextEditor";
import { Plus, Trash2 } from "lucide-react";

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    project || {
      project_name: "",
      duration: "",
      description: "",
      tech_stack: [],
      highlights: "",
      project_link: "",
      github_link: "",
      live_link: "",
    },
  );
  const [techInput, setTechInput] = useState("");

  // Convert array highlights to string if editing existing project
  useEffect(() => {
    if (
      project &&
      Array.isArray(project.highlights) &&
      project.highlights.length > 0
    ) {
      const highlightsString = project.highlights.join("\n\n");
      setFormData((prev) => ({ ...prev, highlights: highlightsString }));
    }
  }, [project]);

  const addTech = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        tech_stack: [...(formData.tech_stack || []), techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTech = (index) =>
    setFormData({
      ...formData,
      tech_stack: formData.tech_stack.filter((_, i) => i !== index),
    });

  const handleSave = () => {
    // Convert highlights string to array for saving (if needed by backend)
    const saveData = {
      ...formData,
      highlights: formData.highlights ? [formData.highlights] : [],
    };
    onSave(saveData);
  };

  return (
    <div className="space-y-4">
      {/* Project Name and Duration */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Project Name *"
          value={formData.project_name}
          onChange={(e) =>
            setFormData({ ...formData, project_name: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Duration (e.g., Jan 2024 - Mar 2024)"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Project Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Description
        </label>
        <RichTextEditor
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          placeholder="Describe the project: what problem it solves, your approach, and the technologies used..."
          className="w-full"
        />
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tech Stack
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="e.g., React, Node.js, MongoDB"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && addTech()}
          />
          <button
            onClick={addTech}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Plus size={16} className="inline mr-1" /> Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tech_stack?.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
            >
              {tech}
              <button
                onClick={() => removeTech(index)}
                className="hover:text-blue-900 font-bold text-lg"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Project Highlights - Using RichTextEditor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Key Highlights & Achievements
        </label>
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-3 mb-3">
          <p className="text-sm text-purple-800 flex items-center gap-2">
            <span className="text-lg">✨</span>
            <span>
              Pro Tip: Use the toolbar to add bullet points, numbered lists, or
              bold text to highlight your key achievements!
            </span>
          </p>
        </div>
        <RichTextEditor
          value={formData.highlights}
          onChange={(value) => setFormData({ ...formData, highlights: value })}
          placeholder="• Developed responsive UI components using React and Tailwind CSS\n• Improved application performance by 40% through code optimization\n• Implemented RESTful APIs for seamless data integration\n• Collaborated with cross-functional teams to deliver features on time"
          className="w-full"
        />
      </div>

      {/* Project Links */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Project Links (Optional)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="url"
            placeholder="Project URL"
            value={formData.project_link}
            onChange={(e) =>
              setFormData({ ...formData, project_link: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            placeholder="GitHub Repository"
            value={formData.github_link}
            onChange={(e) =>
              setFormData({ ...formData, github_link: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            placeholder="Live Demo"
            value={formData.live_link}
            onChange={(e) =>
              setFormData({ ...formData, live_link: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Project
        </button>
      </div>
    </div>
  );
};

export default ProjectForm;
