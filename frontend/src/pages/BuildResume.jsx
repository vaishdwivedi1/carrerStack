import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Briefcase,
  Code2,
  Edit2,
  Eye,
  FileText,
  FolderGit2,
  GraduationCap,
  Highlighter,
  Italic,
  Loader2,
  Plus,
  PlusCircle,
  RotateCcw,
  Trash2,
  Type,
  Underline,
  User as UserIcon,
  Wand2,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

// Empty default resume data
const defaultResumeData = {
  personal: {
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    linkedin: "",
    behance: "",
    title: "",
  },
  summary: "",
  experience: [],
  projects: [],
  skills: [],
  education: [],
  customSections: [],
};

// Rich Text Editor Component
const RichTextEditor = ({ value, onChange, placeholder, className = "" }) => {
  const editorRef = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div
      className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}
    >
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => execCommand("bold")}
          className="p-1.5 rounded hover:bg-gray-200"
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => execCommand("italic")}
          className="p-1.5 rounded hover:bg-gray-200"
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => execCommand("underline")}
          className="p-1.5 rounded hover:bg-gray-200"
          title="Underline"
        >
          <Underline size={16} />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => execCommand("justifyLeft")}
          className="p-1.5 rounded hover:bg-gray-200"
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => execCommand("justifyCenter")}
          className="p-1.5 rounded hover:bg-gray-200"
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => execCommand("justifyRight")}
          className="p-1.5 rounded hover:bg-gray-200"
        >
          <AlignRight size={16} />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-1.5 rounded hover:bg-gray-200"
          >
            <Type size={16} />
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-10">
              <div className="grid grid-cols-5 gap-1">
                {[
                  "#000000",
                  "#FF0000",
                  "#00FF00",
                  "#0000FF",
                  "#FFFF00",
                  "#FF00FF",
                  "#00FFFF",
                  "#FFA500",
                  "#800080",
                  "#008000",
                ].map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      execCommand("foreColor", color);
                      setShowColorPicker(false);
                    }}
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => execCommand("backColor", "#FFFF00")}
          className="p-1.5 rounded hover:bg-gray-200"
        >
          <Highlighter size={16} />
        </button>
        <button
          type="button"
          onClick={() => {
            if (editorRef.current) {
              editorRef.current.innerHTML = "";
              onChange("");
            }
          }}
          className="p-1.5 rounded hover:bg-gray-200"
        >
          <RotateCcw size={16} />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={() =>
          editorRef.current && onChange(editorRef.current.innerHTML)
        }
        dangerouslySetInnerHTML={{ __html: value }}
        className="p-3 min-h-[150px] focus:outline-none prose prose-sm max-w-none"
        style={{ fontFamily: "inherit" }}
      />
    </div>
  );
};

// AI Assistant Component - Enhanced for all sections
const AIAssistant = ({
  currentContent,
  onUpdate,
  onClose,
  sectionType,
  fieldName,
}) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");

  const getAIPrompt = () => {
    const prompts = {
      personal:
        "Generate a professional bio for a resume. Include name, title, and contact info style.",
      summary:
        "Write a compelling professional summary for a resume. Focus on key strengths and career goals.",
      experience:
        "Write a professional work experience description with action verbs and quantifiable achievements.",
      project:
        "Write a project description highlighting technical skills and impact.",
      skill: "Suggest relevant professional skills categorized appropriately.",
      education:
        "Format education details professionally including degree, institution, and achievements.",
      custom: "Write professional content for this section.",
    };
    return prompts[sectionType] || prompts.custom;
  };

  const handleEnhance = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let enhanced = "";
    const userPrompt = prompt || getAIPrompt();

    if (sectionType === "summary") {
      enhanced = `✨ ${currentContent || "Results-driven professional with 5+ years of experience in [Industry]. Proven track record of delivering exceptional results through strategic thinking and innovative solutions. Skilled in [Key Skill 1], [Key Skill 2], and [Key Skill 3]. Committed to continuous improvement and excellence in all endeavors."}`;
    } else if (sectionType === "experience") {
      enhanced = `✨ ${currentContent || "• Led cross-functional teams to successfully deliver 15+ projects ahead of schedule\n• Increased operational efficiency by 30% through process optimization\n• Recognized as 'Top Performer' for 3 consecutive quarters"}`;
    } else if (sectionType === "project") {
      enhanced = `✨ ${currentContent || "Developed and launched a full-stack web application that served 10,000+ users. Implemented responsive design and optimized performance resulting in 40% faster load times. Technologies used: React, Node.js, MongoDB."}`;
    } else if (sectionType === "skill") {
      enhanced = `✨ ${currentContent || "• Technical: JavaScript, Python, React, Node.js, SQL\n• Soft Skills: Leadership, Communication, Problem-solving\n• Tools: Git, Docker, AWS, Figma"}`;
    } else if (sectionType === "education") {
      enhanced = `✨ ${currentContent || "Master of Business Administration (MBA) - [University Name], 2020-2022\n• GPA: 3.8/4.0\n• Relevant Coursework: Strategic Management, Marketing Analytics\n\nBachelor of Technology in Computer Science - [University Name], 2016-2020\n• Graduated with Honors\n• Led university coding club"}`;
    } else {
      enhanced = `✨ ${currentContent || "Your enhanced content will appear here. The AI can help you write more professionally, fix grammar, and add impact."}`;
    }

    enhanced += `\n\n💡 Tip: Be specific about your achievements and use action verbs.`;

    setAiSuggestion(enhanced);
    setIsLoading(false);
  };

  const applySuggestion = () => {
    if (aiSuggestion) {
      onUpdate(aiSuggestion);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wand2 className="text-purple-600" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">
              AI Assistant - {fieldName || sectionType}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-800">✨ AI can help you:</p>
            <ul className="text-sm text-purple-700 mt-2 space-y-1">
              <li>• Improve grammar and sentence structure</li>
              <li>• Make your writing more professional</li>
              <li>• Add impactful action verbs</li>
              <li>• Quantify your achievements</li>
            </ul>
          </div>

          <textarea
            placeholder={`Describe what you want to improve or leave empty for automatic enhancement...\n\nExample: "Make this more achievement-focused" or "Add more technical details"`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />

          <button
            onClick={handleEnhance}
            disabled={isLoading}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Wand2 size={20} />
            )}
            {isLoading ? "Generating..." : "Generate AI Enhancement"}
          </button>

          {aiSuggestion && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI Suggestion:
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-[300px] overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                  {aiSuggestion}
                </pre>
              </div>
              <button
                onClick={applySuggestion}
                className="mt-3 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Apply This Enhancement
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Quick Fill Form
const QuickFillForm = ({ onGenerate, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    education: "",
    summary: "",
  });

  const handleGenerate = () => {
    const generatedResume = {
      personal: {
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        title: formData.title || "",
        portfolio: "",
        linkedin: "",
        behance: "",
      },
      summary: formData.summary || "",
      experience: formData.experience
        .split("\n")
        .filter((e) => e.trim())
        .map((exp, idx) => ({
          id: Date.now() + idx,
          title: exp.split(" at ")[0] || "",
          company: exp.split(" at ")[1] || "",
          period: "",
          highlights: [""],
        })),
      skills: formData.skills
        ? [
            {
              id: Date.now().toString(),
              category: "Skills",
              items: formData.skills.split(",").map((s) => s.trim()),
            },
          ]
        : [],
      education: formData.education
        .split("\n")
        .filter((e) => e.trim())
        .map((edu, idx) => ({
          id: Date.now() + idx,
          degree: edu.split(" at ")[0] || "",
          institution: edu.split(" at ")[1] || "",
          period: "",
          gpa: "",
        })),
      customSections: [],
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
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Professional Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <textarea
            placeholder="Professional Summary"
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Work Experience (one per line)&#10;e.g., Software Engineer at Google"
            value={formData.experience}
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Skills (comma-separated)&#10;e.g., React, Python, Figma"
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Education (one per line)&#10;e.g., B.Tech at IIT Delhi"
            value={formData.education}
            onChange={(e) =>
              setFormData({ ...formData, education: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Custom Section Form
const CustomSectionForm = ({ section, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    section || { title: "", items: [{ id: Date.now(), content: "" }] },
  );
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiContent, setAiContent] = useState("");

  const addItem = () =>
    setFormData({
      ...formData,
      items: [...formData.items, { id: Date.now(), content: "" }],
    });
  const updateItem = (id, content) =>
    setFormData({
      ...formData,
      items: formData.items.map((item) =>
        item.id === id ? { ...item, content } : item,
      ),
    });
  const removeItem = (id) =>
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.id !== id),
    });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowAIAssistant(true)}
          className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
        >
          <Wand2 size={14} /> AI Enhance Section
        </button>
      </div>
      <input
        type="text"
        placeholder="Section Title (e.g., Hobbies, Certifications, Awards)"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Items
        </label>
        {formData.items.map((item, index) => (
          <div key={item.id} className="flex gap-2 mb-2">
            <RichTextEditor
              value={item.content}
              onChange={(value) => updateItem(item.id, value)}
              placeholder={`Item ${index + 1}`}
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-2"
        >
          <Plus size={16} /> Add Item
        </button>
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
          Save Section
        </button>
      </div>
      {showAIAssistant && (
        <AIAssistant
          currentContent={JSON.stringify(formData)}
          onUpdate={(newContent) => {
            try {
              const parsed = JSON.parse(newContent);
              setFormData(parsed);
            } catch (e) {}
            setShowAIAssistant(false);
          }}
          onClose={() => setShowAIAssistant(false)}
          sectionType="custom"
          fieldName={formData.title || "Custom Section"}
        />
      )}
    </div>
  );
};

// Main Component
const BuildResume = () => {
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [activeSection, setActiveSection] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [accentColor, setAccentColor] = useState("#2563EB");
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiContext, setAiContext] = useState({
    content: "",
    sectionType: "",
    fieldName: "",
  });
  const [showQuickFill, setShowQuickFill] = useState(false);
  const [editingSummary, setEditingSummary] = useState(false);
  const [showCustomSection, setShowCustomSection] = useState(false);
  const [editingCustomSection, setEditingCustomSection] = useState(null);
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingSkillItem, setEditingSkillItem] = useState(null);

  const updateResumeData = (section, data) =>
    setResumeData((prev) => ({ ...prev, [section]: data }));

  const addExperience = (exp) =>
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...exp, id: Date.now().toString() }],
    }));
  const updateExperience = (id, updatedExp) =>
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, ...updatedExp } : exp,
      ),
    }));
  const deleteExperience = (id) =>
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));

  const addProject = (project) =>
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: Date.now().toString() }],
    }));
  const updateProject = (id, updatedProject) =>
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, ...updatedProject } : proj,
      ),
    }));
  const deleteProject = (id) =>
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));

  const addSkill = (skill) =>
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id: Date.now().toString() }],
    }));
  const updateSkill = (id, updatedSkill) =>
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, ...updatedSkill } : skill,
      ),
    }));
  const deleteSkill = (id) =>
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));

  const addEducation = (edu) =>
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { ...edu, id: Date.now().toString() }],
    }));
  const updateEducation = (id, updatedEdu) =>
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...updatedEdu } : edu,
      ),
    }));
  const deleteEducation = (id) =>
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));

  const updateSummary = (newSummary) => {
    updateResumeData("summary", newSummary);
    setEditingSummary(false);
  };

  const addCustomSection = (section) =>
    setResumeData((prev) => ({
      ...prev,
      customSections: [
        ...prev.customSections,
        { ...section, id: Date.now().toString() },
      ],
    }));
  const updateCustomSection = (id, updatedSection) =>
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((section) =>
        section.id === id ? { ...section, ...updatedSection } : section,
      ),
    }));
  const deleteCustomSection = (id) =>
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter(
        (section) => section.id !== id,
      ),
    }));

  // Experience Form
  const ExperienceForm = ({ exp, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      exp || { title: "", company: "", period: "", highlights: [""] },
    );
    const [showAI, setShowAI] = useState(false);

    const handleHighlightChange = (index, value) => {
      const newHighlights = [...formData.highlights];
      newHighlights[index] = value;
      setFormData({ ...formData, highlights: newHighlights });
    };
    const addHighlight = () =>
      setFormData({ ...formData, highlights: [...formData.highlights, ""] });
    const removeHighlight = (index) =>
      setFormData({
        ...formData,
        highlights: formData.highlights.filter((_, i) => i !== index),
      });

    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowAI(true)}
            className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            <Wand2 size={14} /> AI Enhance
          </button>
        </div>
        <input
          type="text"
          placeholder="Job Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Period (e.g., Jan 2024 - Present)"
          value={formData.period}
          onChange={(e) => setFormData({ ...formData, period: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Highlights
          </label>
          {formData.highlights.map((highlight, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <RichTextEditor
                value={highlight}
                onChange={(value) => handleHighlightChange(index, value)}
                placeholder={`Highlight ${index + 1}`}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => removeHighlight(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addHighlight}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-2"
          >
            <Plus size={16} /> Add Highlight
          </button>
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
        {showAI && (
          <AIAssistant
            currentContent={JSON.stringify(formData)}
            onUpdate={(newContent) => {
              try {
                const parsed = JSON.parse(newContent);
                setFormData(parsed);
              } catch (e) {}
              setShowAI(false);
            }}
            onClose={() => setShowAI(false)}
            sectionType="experience"
            fieldName="Work Experience"
          />
        )}
      </div>
    );
  };

  // Project Form
  const ProjectForm = ({ project, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      project || { title: "", description: "", technologies: [] },
    );
    const [techInput, setTechInput] = useState("");
    const [showAI, setShowAI] = useState(false);

    const addTechnology = () => {
      if (techInput.trim()) {
        setFormData({
          ...formData,
          technologies: [...(formData.technologies || []), techInput.trim()],
        });
        setTechInput("");
      }
    };
    const removeTechnology = (index) =>
      setFormData({
        ...formData,
        technologies: formData.technologies.filter((_, i) => i !== index),
      });

    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowAI(true)}
            className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            <Wand2 size={14} /> AI Enhance
          </button>
        </div>
        <input
          type="text"
          placeholder="Project Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <RichTextEditor
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          placeholder="Project Description"
          className="w-full"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technologies Used
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="e.g., React, Node.js"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              onKeyPress={(e) => e.key === "Enter" && addTechnology()}
            />
            <button
              type="button"
              onClick={addTechnology}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.technologies?.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
              >
                {tech}
                <button
                  onClick={() => removeTechnology(index)}
                  className="hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            ))}
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
        {showAI && (
          <AIAssistant
            currentContent={JSON.stringify(formData)}
            onUpdate={(newContent) => {
              try {
                const parsed = JSON.parse(newContent);
                setFormData(parsed);
              } catch (e) {}
              setShowAI(false);
            }}
            onClose={() => setShowAI(false)}
            sectionType="project"
            fieldName="Project"
          />
        )}
      </div>
    );
  };

  // Skill Form
  const SkillForm = ({ skill, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      skill || { category: "", items: [""] },
    );
    const [showAI, setShowAI] = useState(false);

    const handleItemChange = (index, value) => {
      const newItems = [...formData.items];
      newItems[index] = value;
      setFormData({ ...formData, items: newItems });
    };
    const addItem = () =>
      setFormData({ ...formData, items: [...formData.items, ""] });
    const removeItem = (index) =>
      setFormData({
        ...formData,
        items: formData.items.filter((_, i) => i !== index),
      });

    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowAI(true)}
            className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            <Wand2 size={14} /> AI Enhance
          </button>
        </div>
        <input
          type="text"
          placeholder="Category (e.g., Programming Languages, Design Tools)"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills
          </label>
          {formData.items.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                placeholder={`Skill ${index + 1}`}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => removeItem(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            onClick={addItem}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-2"
          >
            <Plus size={16} /> Add Skill
          </button>
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
        {showAI && (
          <AIAssistant
            currentContent={JSON.stringify(formData)}
            onUpdate={(newContent) => {
              try {
                const parsed = JSON.parse(newContent);
                setFormData(parsed);
              } catch (e) {}
              setShowAI(false);
            }}
            onClose={() => setShowAI(false)}
            sectionType="skill"
            fieldName="Skills"
          />
        )}
      </div>
    );
  };

  // Education Form
  const EducationForm = ({ edu, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      edu || { degree: "", institution: "", period: "", gpa: "" },
    );
    const [showAI, setShowAI] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowAI(true)}
            className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            <Wand2 size={14} /> AI Enhance
          </button>
        </div>
        <input
          type="text"
          placeholder="Degree / Program"
          value={formData.degree}
          onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Institution"
          value={formData.institution}
          onChange={(e) =>
            setFormData({ ...formData, institution: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Period (e.g., 2020 - 2024)"
          value={formData.period}
          onChange={(e) => setFormData({ ...formData, period: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="GPA / Percentage (Optional)"
          value={formData.gpa}
          onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
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
        {showAI && (
          <AIAssistant
            currentContent={JSON.stringify(formData)}
            onUpdate={(newContent) => {
              try {
                const parsed = JSON.parse(newContent);
                setFormData(parsed);
              } catch (e) {}
              setShowAI(false);
            }}
            onClose={() => setShowAI(false)}
            sectionType="education"
            fieldName="Education"
          />
        )}
      </div>
    );
  };

  // Personal Info Form
  const PersonalInfoForm = ({ data, onSave, onClose }) => {
    const [formData, setFormData] = useState(data);
    const [showAI, setShowAI] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowAI(true)}
            className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            <Wand2 size={14} /> AI Enhance
          </button>
        </div>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Professional Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="url"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={(e) =>
            setFormData({ ...formData, linkedin: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="url"
          placeholder="Portfolio URL"
          value={formData.portfolio}
          onChange={(e) =>
            setFormData({ ...formData, portfolio: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
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
        {showAI && (
          <AIAssistant
            currentContent={JSON.stringify(formData)}
            onUpdate={(newContent) => {
              try {
                const parsed = JSON.parse(newContent);
                setFormData(parsed);
              } catch (e) {}
              setShowAI(false);
            }}
            onClose={() => setShowAI(false)}
            sectionType="personal"
            fieldName="Personal Information"
          />
        )}
      </div>
    );
  };

  const ResumePreview = () => (
    <div
      className="bg-white shadow-2xl rounded-xl overflow-hidden"
      style={{ fontFamily: "'Charter', 'Times New Roman', serif" }}
    >
      <div
        className="text-center py-8 px-6 border-b"
        style={{ borderBottomColor: `${accentColor}20` }}
      >
        <h1 className="text-4xl font-bold mb-2" style={{ color: accentColor }}>
          {resumeData.personal.name || "Your Name"}
        </h1>
        <p className="text-gray-600 mb-3">
          {resumeData.personal.title || "Professional Title"}
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
          {resumeData.personal.email && (
            <>
              <a
                href={`mailto:${resumeData.personal.email}`}
                className="hover:underline"
              >
                {resumeData.personal.email}
              </a>
              <span>|</span>
            </>
          )}
          {resumeData.personal.phone && (
            <a
              href={`tel:${resumeData.personal.phone}`}
              className="hover:underline"
            >
              {resumeData.personal.phone}
            </a>
          )}
          {resumeData.personal.linkedin && (
            <>
              <span>|</span>
              <a
                href={resumeData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            </>
          )}
          {resumeData.personal.portfolio && (
            <>
              <span>|</span>
              <a
                href={resumeData.personal.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Portfolio
              </a>
            </>
          )}
        </div>
      </div>
      <div className="p-6 space-y-6">
        {resumeData.summary && (
          <section>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b"
              style={{
                color: accentColor,
                borderBottomColor: `${accentColor}40`,
              }}
            >
              Professional Summary
            </h2>
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: resumeData.summary }}
            />
          </section>
        )}
        {resumeData.experience.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b"
              style={{
                color: accentColor,
                borderBottomColor: `${accentColor}40`,
              }}
            >
              Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline flex-wrap gap-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {exp.title}, {exp.company}
                    </h3>
                    <span className="text-sm text-gray-500">{exp.period}</span>
                  </div>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-gray-600">
                    {exp.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: highlight }}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        {resumeData.projects.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b"
              style={{
                color: accentColor,
                borderBottomColor: `${accentColor}40`,
              }}
            >
              Projects
            </h2>
            <div className="space-y-4">
              {resumeData.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {project.title}
                  </h3>
                  <div
                    className="text-gray-600 text-sm mt-1"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
        {resumeData.skills.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b"
              style={{
                color: accentColor,
                borderBottomColor: `${accentColor}40`,
              }}
            >
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.skills.map((skillCategory) => (
                <div key={skillCategory.id}>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {skillCategory.category}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {skillCategory.items.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
        {resumeData.education.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b"
              style={{
                color: accentColor,
                borderBottomColor: `${accentColor}40`,
              }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline flex-wrap gap-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {edu.degree}
                    </h3>
                    <span className="text-sm text-gray-500">{edu.period}</span>
                  </div>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        {resumeData.customSections.map((section) => (
          <section key={section.id}>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b"
              style={{
                color: accentColor,
                borderBottomColor: `${accentColor}40`,
              }}
            >
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <FileText className="text-blue-600" size={28} />
              <span className="font-bold text-xl text-gray-800">
                Resume Builder
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowQuickFill(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Wand2 size={18} /> AI Quick Build
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                <span className="text-sm text-gray-600">Theme:</span>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer border border-gray-300"
                />
              </div>
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: isPreviewMode ? "#2563EB" : "#E5E7EB",
                  color: isPreviewMode ? "white" : "#374151",
                }}
              >
                {isPreviewMode ? <Edit2 size={18} /> : <Eye size={18} />}
                {isPreviewMode ? "Edit Mode" : "Preview"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isPreviewMode ? (
          <ResumePreview />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              {/* Personal Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                    <UserIcon size={18} /> Personal Information
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setAiContext({
                          content: JSON.stringify(resumeData.personal),
                          sectionType: "personal",
                          fieldName: "Personal Information",
                        });
                        setShowAIAssistant(true);
                      }}
                      className="text-purple-600 hover:text-purple-700 text-sm flex items-center gap-1"
                    >
                      <Wand2 size={14} /> AI
                    </button>
                    <button
                      onClick={() => setActiveSection("personal")}
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Name
                    </p>
                    <p className="font-medium text-gray-900">
                      {resumeData.personal.name || "Not added"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Title
                    </p>
                    <p className="text-gray-700">
                      {resumeData.personal.title || "Not added"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Contact
                    </p>
                    {resumeData.personal.email && (
                      <p className="text-gray-700 break-all">
                        {resumeData.personal.email}
                      </p>
                    )}
                    {resumeData.personal.phone && (
                      <p className="text-gray-700">
                        {resumeData.personal.phone}
                      </p>
                    )}
                    {!resumeData.personal.email &&
                      !resumeData.personal.phone && (
                        <p className="text-gray-400 text-sm">Not added</p>
                      )}
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800">
                    Professional Summary
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setAiContext({
                          content: resumeData.summary,
                          sectionType: "summary",
                          fieldName: "Professional Summary",
                        });
                        setShowAIAssistant(true);
                      }}
                      className="text-purple-600 hover:text-purple-700 text-sm flex items-center gap-1"
                    >
                      <Wand2 size={14} /> AI
                    </button>
                    <button
                      onClick={() => setEditingSummary(true)}
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html:
                        resumeData.summary ||
                        "<em class='text-gray-400'>No summary added yet.</em>",
                    }}
                  />
                </div>
              </div>

              {/* Skills Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Code2 size={18} /> Skills
                  </h2>
                  <button
                    onClick={() => setActiveSection("skills")}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  {resumeData.skills.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">
                      No skills added yet.
                    </p>
                  )}
                  {resumeData.skills.map((skillCategory) => (
                    <div key={skillCategory.id} className="group relative">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-800">
                          {skillCategory.category}
                        </h3>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => {
                              setEditingItem({
                                type: "skills",
                                data: skillCategory,
                              });
                              setActiveSection("skillsEdit");
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => deleteSkill(skillCategory.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {skillCategory.items.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                    <GraduationCap size={18} /> Education
                  </h2>
                  <button
                    onClick={() => setActiveSection("education")}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  {resumeData.education.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">
                      No education added yet.
                    </p>
                  )}
                  {resumeData.education.map((edu) => (
                    <div
                      key={edu.id}
                      className="group relative border-b border-gray-100 last:border-0 pb-3 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {edu.degree || "Degree"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {edu.institution || "Institution"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {edu.period || "Year"}
                          </p>
                          {edu.gpa && (
                            <p className="text-xs text-gray-500">
                              GPA: {edu.gpa}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => {
                              setEditingItem({ type: "education", data: edu });
                              setActiveSection("educationEdit");
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => deleteEducation(edu.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Sections Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                    <PlusCircle size={18} /> Custom Sections
                  </h2>
                  <button
                    onClick={() => setShowCustomSection(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  {resumeData.customSections.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">
                      No custom sections added.
                    </p>
                  )}
                  {resumeData.customSections.map((section) => (
                    <div
                      key={section.id}
                      className="group relative border-b border-gray-100 last:border-0 pb-3 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {section.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {section.items.length} item
                            {section.items.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => {
                              setEditingCustomSection(section);
                              setShowCustomSection(true);
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => deleteCustomSection(section.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {/* Experience Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Briefcase size={18} /> Work Experience
                  </h2>
                  <button
                    onClick={() => setActiveSection("experience")}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Experience
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  {resumeData.experience.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-8">
                      No work experience added yet.
                    </p>
                  )}
                  {resumeData.experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="group relative border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex justify-between items-baseline flex-wrap gap-2">
                            <h3 className="font-semibold text-gray-800">
                              {exp.title || "Title"}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {exp.period || "Date"}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            {exp.company || "Company"}
                          </p>
                          <ul className="space-y-1">
                            {exp.highlights
                              .slice(0, 2)
                              .map((highlight, idx) => (
                                <li
                                  key={idx}
                                  className="text-sm text-gray-600 flex gap-2"
                                >
                                  <span className="text-blue-500">•</span>
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        highlight.length > 100
                                          ? highlight.substring(0, 100) + "..."
                                          : highlight || "Add description",
                                    }}
                                  />
                                </li>
                              ))}
                            {exp.highlights.length > 2 && (
                              <li className="text-sm text-blue-500">
                                +{exp.highlights.length - 2} more
                              </li>
                            )}
                          </ul>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => {
                              setEditingItem({ type: "experience", data: exp });
                              setActiveSection("experienceEdit");
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => deleteExperience(exp.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                    <FolderGit2 size={18} /> Projects
                  </h2>
                  <button
                    onClick={() => setActiveSection("projects")}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Project
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  {resumeData.projects.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-8">
                      No projects added yet.
                    </p>
                  )}
                  {resumeData.projects.map((project) => (
                    <div
                      key={project.id}
                      className="group relative border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">
                            {project.title || "Project Title"}
                          </h3>
                          <div
                            className="text-sm text-gray-600 mt-1"
                            dangerouslySetInnerHTML={{
                              __html:
                                project.description.length > 120
                                  ? project.description.substring(0, 120) +
                                    "..."
                                  : project.description ||
                                    "Project description",
                            }}
                          />
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => {
                              setEditingItem({
                                type: "projects",
                                data: project,
                              });
                              setActiveSection("projectsEdit");
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeSection === "personal"}
        onClose={() => setActiveSection(null)}
        title="Edit Personal Information"
      >
        <PersonalInfoForm
          data={resumeData.personal}
          onSave={(data) => {
            updateResumeData("personal", data);
            setActiveSection(null);
          }}
          onClose={() => setActiveSection(null)}
        />
      </Modal>
      <Modal
        isOpen={editingSummary}
        onClose={() => setEditingSummary(false)}
        title="Edit Professional Summary"
      >
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setAiContext({
                  content: resumeData.summary,
                  sectionType: "summary",
                  fieldName: "Professional Summary",
                });
                setShowAIAssistant(true);
              }}
              className="text-purple-600 hover:text-purple-700 text-sm flex items-center gap-1"
            >
              <Wand2 size={14} /> AI Enhance
            </button>
          </div>
          <RichTextEditor
            value={resumeData.summary}
            onChange={updateSummary}
            placeholder="Write your professional summary here..."
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setEditingSummary(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => setEditingSummary(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={activeSection === "experience"}
        onClose={() => setActiveSection(null)}
        title="Add Work Experience"
      >
        <ExperienceForm
          onSave={(data) => {
            addExperience(data);
            setActiveSection(null);
          }}
          onCancel={() => setActiveSection(null)}
        />
      </Modal>
      <Modal
        isOpen={activeSection === "experienceEdit"}
        onClose={() => setActiveSection(null)}
        title="Edit Work Experience"
      >
        <ExperienceForm
          exp={editingItem?.data}
          onSave={(data) => {
            updateExperience(editingItem.data.id, data);
            setActiveSection(null);
            setEditingItem(null);
          }}
          onCancel={() => {
            setActiveSection(null);
            setEditingItem(null);
          }}
        />
      </Modal>
      <Modal
        isOpen={activeSection === "projects"}
        onClose={() => setActiveSection(null)}
        title="Add Project"
      >
        <ProjectForm
          onSave={(data) => {
            addProject(data);
            setActiveSection(null);
          }}
          onCancel={() => setActiveSection(null)}
        />
      </Modal>
      <Modal
        isOpen={activeSection === "projectsEdit"}
        onClose={() => setActiveSection(null)}
        title="Edit Project"
      >
        <ProjectForm
          project={editingItem?.data}
          onSave={(data) => {
            updateProject(editingItem.data.id, data);
            setActiveSection(null);
            setEditingItem(null);
          }}
          onCancel={() => {
            setActiveSection(null);
            setEditingItem(null);
          }}
        />
      </Modal>
      <Modal
        isOpen={activeSection === "skills"}
        onClose={() => setActiveSection(null)}
        title="Add Skill Category"
      >
        <SkillForm
          onSave={(data) => {
            addSkill(data);
            setActiveSection(null);
          }}
          onCancel={() => setActiveSection(null)}
        />
      </Modal>
      <Modal
        isOpen={activeSection === "skillsEdit"}
        onClose={() => setActiveSection(null)}
        title="Edit Skill Category"
      >
        <SkillForm
          skill={editingItem?.data}
          onSave={(data) => {
            updateSkill(editingItem.data.id, data);
            setActiveSection(null);
            setEditingItem(null);
          }}
          onCancel={() => {
            setActiveSection(null);
            setEditingItem(null);
          }}
        />
      </Modal>
      <Modal
        isOpen={activeSection === "education"}
        onClose={() => setActiveSection(null)}
        title="Add Education"
      >
        <EducationForm
          onSave={(data) => {
            addEducation(data);
            setActiveSection(null);
          }}
          onCancel={() => setActiveSection(null)}
        />
      </Modal>
      <Modal
        isOpen={activeSection === "educationEdit"}
        onClose={() => setActiveSection(null)}
        title="Edit Education"
      >
        <EducationForm
          edu={editingItem?.data}
          onSave={(data) => {
            updateEducation(editingItem.data.id, data);
            setActiveSection(null);
            setEditingItem(null);
          }}
          onCancel={() => {
            setActiveSection(null);
            setEditingItem(null);
          }}
        />
      </Modal>
      <Modal
        isOpen={showCustomSection}
        onClose={() => {
          setShowCustomSection(false);
          setEditingCustomSection(null);
        }}
        title={
          editingCustomSection ? "Edit Custom Section" : "Add Custom Section"
        }
      >
        <CustomSectionForm
          section={editingCustomSection}
          onSave={(data) => {
            if (editingCustomSection) {
              updateCustomSection(editingCustomSection.id, data);
            } else {
              addCustomSection(data);
            }
            setShowCustomSection(false);
            setEditingCustomSection(null);
          }}
          onCancel={() => {
            setShowCustomSection(false);
            setEditingCustomSection(null);
          }}
        />
      </Modal>

      {showAIAssistant && (
        <AIAssistant
          currentContent={aiContext.content}
          onUpdate={(newContent) => {
            if (editingSummary) updateSummary(newContent);
            setShowAIAssistant(false);
          }}
          onClose={() => setShowAIAssistant(false)}
          sectionType={aiContext.sectionType}
          fieldName={aiContext.fieldName}
        />
      )}
      {showQuickFill && (
        <QuickFillForm
          onGenerate={(newData) => {
            setResumeData(newData);
            setShowQuickFill(false);
          }}
          onClose={() => setShowQuickFill(false)}
        />
      )}
    </div>
  );
};

export default BuildResume;
