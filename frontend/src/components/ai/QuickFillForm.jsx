import { Wand2, X } from "lucide-react";
import { useState } from "react";

// Quick Fill Form
const QuickFillForm = ({ onGenerate, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    professional_title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  });

  const handleGenerate = () => {
    const generatedResume = {
      user_profile: {
        full_name: formData.full_name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        location: formData.location || "",
        professional_title: formData.professional_title || "",
        linkedin_url: "",
        github_url: "",
        portfolio_url: "",
        behance_url: "",
      },
      summary: formData.summary || "",
      skills: {
        languages: [],
        frameworks: [],
        tools: [],
        softwares: [],
        databases: [],
        cloud: [],
        others: [],
      },
      experience: [],
      projects: [],
      education: [],
      certifications: [],
      achievements: [],
      languages: [],
      volunteering: [],
      hobbies: [],
      custom_sections: [],
    };
    onGenerate(generatedResume);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Quick Resume Builder
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Professional Title"
            value={formData.professional_title}
            onChange={(e) =>
              setFormData({ ...formData, professional_title: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Professional Summary"
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleGenerate}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <Wand2 size={20} /> Generate Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickFillForm;
