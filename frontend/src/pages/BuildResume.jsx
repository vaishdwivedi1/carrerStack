import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Award,
  Bold,
  Briefcase,
  Code2,
  Edit2,
  Eye,
  FileText,
  FolderGit2,
  GraduationCap,
  Heart,
  Highlighter,
  Italic,
  Languages,
  Loader2,
  MapPin,
  Plus,
  PlusCircle,
  RotateCcw,
  Save,
  Trash2,
  Trophy,
  Type,
  Underline,
  User as UserIcon,
  Wand2,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { POSTMethod } from "../utils/server";
import { API } from "../utils/APIS";

// Empty default resume data matching new structure
const defaultResumeData = {
  user_profile: {
    full_name: "",
    email: "",
    phone: "",
    location: "",
    professional_title: "",
    linkedin_url: "",
    github_url: "",
    portfolio_url: "",
    behance_url: "",
  },
  summary: "",
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

// Rich Text Editor Component (same as before)
const RichTextEditor = ({ value, onChange, placeholder, className = "" }) => {
  const editorRef = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current.focus();
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.execCommand("insertLineBreak");
      handleInput();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
    handleInput();
  };

  return (
    <div
      className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}
    >
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1 sticky top-0 z-10">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("bold");
          }}
          className="p-1.5 rounded hover:bg-gray-200"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("italic");
          }}
          className="p-1.5 rounded hover:bg-gray-200"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("underline");
          }}
          className="p-1.5 rounded hover:bg-gray-200"
        >
          <Underline size={16} />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("justifyLeft");
          }}
          className="p-1.5 rounded hover:bg-gray-200"
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("justifyCenter");
          }}
          className="p-1.5 rounded hover:bg-gray-200"
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("justifyRight");
          }}
          className="p-1.5 rounded hover:bg-gray-200"
        >
          <AlignRight size={16} />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <div className="relative">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              setShowColorPicker(!showColorPicker);
            }}
            className="p-1.5 rounded hover:bg-gray-200"
          >
            <Type size={16} />
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-20">
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
                    onMouseDown={(e) => {
                      e.preventDefault();
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
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("backColor", "#FFFF00");
          }}
          className="p-1.5 rounded hover:bg-gray-200"
        >
          <Highlighter size={16} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            if (editorRef.current) {
              editorRef.current.innerHTML = "";
              onChange("");
              editorRef.current.focus();
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
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="p-3 min-h-[150px] focus:outline-none prose prose-sm max-w-none"
        style={{ fontFamily: "inherit" }}
      />
      {(!value || value === "<br>") && !isFocused && (
        <div
          className="absolute text-gray-400 pointer-events-none p-3"
          style={{ marginTop: "-40px" }}
        >
          {placeholder}
        </div>
      )}
    </div>
  );
};

// AI Assistant Component (same as before)
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

  const handleEnhance = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    let enhanced = currentContent || "Your enhanced content will appear here.";
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
            <p className="text-sm text-purple-800">
              ✨ AI can help you improve grammar, make writing more
              professional, and add impactful action verbs.
            </p>
          </div>
          <textarea
            placeholder="Describe what you want to improve..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleEnhance}
            disabled={isLoading}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
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
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-[300px] overflow-y-auto whitespace-pre-wrap text-sm text-gray-700">
                {aiSuggestion}
              </div>
              <button
                onClick={applySuggestion}
                className="mt-3 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Professional Title"
            value={formData.professional_title}
            onChange={(e) =>
              setFormData({ ...formData, professional_title: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <div className="grid grid-cols-2 gap-4">
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
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Professional Summary"
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleGenerate}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
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
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
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

  // Save state
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({
    show: false,
    success: false,
    message: "",
  });

  // Get user ID from localStorage or context (adjust based on your auth system)
  const getUserId = () => {
    // Option 1: From localStorage
    const user = localStorage.getItem("user");
    if (user) {
      try {
        return JSON.parse(user)._id;
      } catch (e) {
        return null;
      }
    }
  };

  // Get auth token
  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  // Save resume to backend
  const saveResume = async () => {
    setIsSaving(true);
    setSaveStatus({ show: false, success: false, message: "" });

    try {
      const token = getAuthToken();
      const userId = getUserId();

      // Validate required fields before saving
      const requiredErrors = [];
      if (!resumeData.user_profile.full_name)
        requiredErrors.push("Full name is required");
      if (!resumeData.user_profile.email)
        requiredErrors.push("Email is required");
      if (!resumeData.user_profile.phone)
        requiredErrors.push("Phone number is required");
      if (!resumeData.user_profile.professional_title)
        requiredErrors.push("Professional title is required");

      if (requiredErrors.length > 0) {
        setSaveStatus({
          show: true,
          success: false,
          message: `Missing required fields: ${requiredErrors.join(", ")}`,
        });
        setIsSaving(false);
        return;
      }

      // Prepare payload
      const payload = {
        userId: userId,
        user_profile: resumeData.user_profile,
        summary: resumeData.summary,
        skills: resumeData.skills,
        experience: resumeData.experience,
        projects: resumeData.projects,
        education: resumeData.education,
        certifications: resumeData.certifications,
        achievements: resumeData.achievements,
        languages: resumeData.languages,
        volunteering: resumeData.volunteering,
        hobbies: resumeData.hobbies,
        custom_sections: resumeData.custom_sections,
      };

      // Make API call
      const response = await POSTMethod(API.buildResume, payload);

      if (response.data.success) {
        setSaveStatus({
          show: true,
          success: true,
          message: "Resume saved successfully!",
        });

        // Optionally store resume ID
        if (response.data.data?._id) {
          localStorage.setItem("resumeId", response.data.data._id);
        }

        // Auto hide success message after 3 seconds
        setTimeout(() => {
          setSaveStatus({ show: false, success: false, message: "" });
        }, 3000);
      } else {
        throw new Error(response.data.message || "Failed to save resume");
      }
    } catch (error) {
      console.error("Save error:", error);
      setSaveStatus({
        show: true,
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to save resume. Please try again.",
      });

      // Auto hide error message after 5 seconds
      setTimeout(() => {
        setSaveStatus({ show: false, success: false, message: "" });
      }, 5000);
    } finally {
      setIsSaving(false);
    }
  };

  // Load existing resume (if editing)
  const loadResume = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/resume/my-resume`,
        {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        },
      );

      if (response.data.success && response.data.data) {
        setResumeData(response.data.data);
      }
    } catch (error) {
      console.error("Load error:", error);
      // No resume found, continue with empty form
    }
  };

  // Load resume on component mount
  useEffect(() => {
    loadResume();
  }, []);

  // Rest of your CRUD functions (same as before)
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

  const addCertification = (cert) =>
    setResumeData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { ...cert, id: Date.now().toString() },
      ],
    }));
  const updateCertification = (id, updatedCert) =>
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) =>
        cert.id === id ? { ...cert, ...updatedCert } : cert,
      ),
    }));
  const deleteCertification = (id) =>
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));

  const addAchievement = (ach) =>
    setResumeData((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        { ...ach, id: Date.now().toString() },
      ],
    }));
  const updateAchievement = (id, updatedAch) =>
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((ach) =>
        ach.id === id ? { ...ach, ...updatedAch } : ach,
      ),
    }));
  const deleteAchievement = (id) =>
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((ach) => ach.id !== id),
    }));

  const addLanguage = (lang) =>
    setResumeData((prev) => ({
      ...prev,
      languages: [...prev.languages, { ...lang, id: Date.now().toString() }],
    }));
  const updateLanguage = (id, updatedLang) =>
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) =>
        lang.id === id ? { ...lang, ...updatedLang } : lang,
      ),
    }));
  const deleteLanguage = (id) =>
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }));

  const addVolunteering = (vol) =>
    setResumeData((prev) => ({
      ...prev,
      volunteering: [
        ...prev.volunteering,
        { ...vol, id: Date.now().toString() },
      ],
    }));
  const updateVolunteering = (id, updatedVol) =>
    setResumeData((prev) => ({
      ...prev,
      volunteering: prev.volunteering.map((vol) =>
        vol.id === id ? { ...vol, ...updatedVol } : vol,
      ),
    }));
  const deleteVolunteering = (id) =>
    setResumeData((prev) => ({
      ...prev,
      volunteering: prev.volunteering.filter((vol) => vol.id !== id),
    }));

  const updateSkills = (category, values) =>
    setResumeData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [category]: values },
    }));
  const addSkillItem = (category, value) => {
    if (value.trim()) {
      setResumeData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [category]: [...prev.skills[category], value.trim()],
        },
      }));
    }
  };
  const removeSkillItem = (category, index) =>
    setResumeData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index),
      },
    }));

  const updateSummary = (newSummary) => {
    updateResumeData("summary", newSummary);
    setEditingSummary(false);
  };

  const addCustomSection = (section) =>
    setResumeData((prev) => ({
      ...prev,
      custom_sections: [
        ...prev.custom_sections,
        { ...section, id: Date.now().toString() },
      ],
    }));
  const updateCustomSection = (id, updatedSection) =>
    setResumeData((prev) => ({
      ...prev,
      custom_sections: prev.custom_sections.map((section) =>
        section.id === id ? { ...section, ...updatedSection } : section,
      ),
    }));
  const deleteCustomSection = (id) =>
    setResumeData((prev) => ({
      ...prev,
      custom_sections: prev.custom_sections.filter(
        (section) => section.id !== id,
      ),
    }));

  // Form Components (same as before - shortened for brevity)
  const ExperienceForm = ({ exp, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      exp || {
        company_name: "",
        role: "",
        location: "",
        start_date: "",
        end_date: "",
        isPresentCompany: false,
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
            placeholder="Company Name"
            value={formData.company_name}
            onChange={(e) =>
              setFormData({ ...formData, company_name: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Role / Title"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Start Date"
              value={formData.start_date}
              onChange={(e) =>
                setFormData({ ...formData, start_date: e.target.value })
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            {!formData.isPresentCompany ? (
              <input
                type="text"
                placeholder="End Date"
                value={formData.end_date}
                onChange={(e) =>
                  setFormData({ ...formData, end_date: e.target.value })
                }
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
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
            <label className="text-sm text-gray-600">
              I currently work here
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Responsibilities & Achievements
          </label>
          {formData.highlights?.map((highlight, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <RichTextEditor
                value={highlight}
                onChange={(value) => {
                  const newHighlights = [...formData.highlights];
                  newHighlights[index] = value;
                  setFormData({ ...formData, highlights: newHighlights });
                }}
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
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              placeholder="Add a responsibility or achievement"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              onKeyPress={(e) => e.key === "Enter" && addHighlight()}
            />
            <button
              type="button"
              onClick={addHighlight}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
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

  const ProjectForm = ({ project, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      project || {
        project_name: "",
        duration: "",
        description: "",
        tech_stack: [],
        highlights: [],
        project_link: "",
        github_link: "",
        live_link: "",
      },
    );
    const [techInput, setTechInput] = useState("");
    const [newHighlight, setNewHighlight] = useState("");
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
            placeholder="Project Name"
            value={formData.project_name}
            onChange={(e) =>
              setFormData({ ...formData, project_name: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Duration (e.g., 3 months)"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <RichTextEditor
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          placeholder="Project Description"
          className="w-full"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tech Stack
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="e.g., React, Node.js"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              onKeyPress={(e) => e.key === "Enter" && addTech()}
            />
            <button
              onClick={addTech}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tech_stack?.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
              >
                {tech}
                <button
                  onClick={() => removeTech(index)}
                  className="hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Highlights
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
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
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
              placeholder="Add a highlight"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
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
        <div className="grid grid-cols-2 gap-4">
          <input
            type="url"
            placeholder="Project Link"
            value={formData.project_link}
            onChange={(e) =>
              setFormData({ ...formData, project_link: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="url"
            placeholder="GitHub Link"
            value={formData.github_link}
            onChange={(e) =>
              setFormData({ ...formData, github_link: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="url"
            placeholder="Live Demo Link"
            value={formData.live_link}
            onChange={(e) =>
              setFormData({ ...formData, live_link: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
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
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    );
  };

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
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Degree Name"
            value={formData.degree_name}
            onChange={(e) =>
              setFormData({ ...formData, degree_name: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Start Year"
            value={formData.start_year}
            onChange={(e) =>
              setFormData({ ...formData, start_year: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="End Year"
            value={formData.end_year}
            onChange={(e) =>
              setFormData({ ...formData, end_year: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Grade / GPA"
            value={formData.grade}
            onChange={(e) =>
              setFormData({ ...formData, grade: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
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
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
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
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
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

  const CertificationForm = ({ cert, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      cert || { name: "", issuer: "", year: "", link: "" },
    );
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Certification Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Issuer"
            value={formData.issuer}
            onChange={(e) =>
              setFormData({ ...formData, issuer: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="url"
            placeholder="Certification Link"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg"
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
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  const AchievementForm = ({ ach, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      ach || { title: "", description: "", year: "" },
    );
    return (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Achievement Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <RichTextEditor
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          placeholder="Achievement Description"
          className="w-full"
        />
        <input
          type="text"
          placeholder="Year"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
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
      </div>
    );
  };

  const LanguageForm = ({ lang, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      lang || { name: "", proficiency: "" },
    );
    const proficiencies = [
      "Native",
      "Fluent",
      "Professional Working",
      "Limited Working",
      "Elementary",
    ];
    return (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Language"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <select
          value={formData.proficiency}
          onChange={(e) =>
            setFormData({ ...formData, proficiency: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select Proficiency</option>
          {proficiencies.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
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

  const VolunteeringForm = ({ vol, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      vol || { organization: "", role: "", duration: "", description: "" },
    );
    return (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Organization"
          value={formData.organization}
          onChange={(e) =>
            setFormData({ ...formData, organization: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Duration"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <RichTextEditor
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          placeholder="Description"
          className="w-full"
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
      </div>
    );
  };

  const CustomSectionForm = ({ section, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      section || { title: "", items: [] },
    );
    const [newItem, setNewItem] = useState("");
    const addItem = () => {
      if (newItem.trim()) {
        setFormData({
          ...formData,
          items: [...formData.items, newItem.trim()],
        });
        setNewItem("");
      }
    };
    const removeItem = (index) =>
      setFormData({
        ...formData,
        items: formData.items.filter((_, i) => i !== index),
      });
    return (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Section Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Items
          </label>
          {formData.items.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newItems = [...formData.items];
                  newItems[index] = e.target.value;
                  setFormData({ ...formData, items: newItems });
                }}
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
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add item"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              onKeyPress={(e) => e.key === "Enter" && addItem()}
            />
            <button
              onClick={addItem}
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

  const PersonalInfoForm = ({ data, onSave, onClose }) => {
    const [formData, setFormData] = useState(data);
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Professional Title"
            value={formData.professional_title}
            onChange={(e) =>
              setFormData({ ...formData, professional_title: e.target.value })
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
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={formData.linkedin_url}
            onChange={(e) =>
              setFormData({ ...formData, linkedin_url: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="url"
            placeholder="GitHub URL"
            value={formData.github_url}
            onChange={(e) =>
              setFormData({ ...formData, github_url: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="url"
            placeholder="Portfolio URL"
            value={formData.portfolio_url}
            onChange={(e) =>
              setFormData({ ...formData, portfolio_url: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="url"
            placeholder="Behance URL"
            value={formData.behance_url}
            onChange={(e) =>
              setFormData({ ...formData, behance_url: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
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
          {resumeData.user_profile.full_name || "Your Name"}
        </h1>
        <p className="text-gray-600 mb-3">
          {resumeData.user_profile.professional_title || "Professional Title"}
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
          {resumeData.user_profile.email && (
            <>
              <a
                href={`mailto:${resumeData.user_profile.email}`}
                className="hover:underline"
              >
                {resumeData.user_profile.email}
              </a>
              <span>|</span>
            </>
          )}
          {resumeData.user_profile.phone && (
            <a
              href={`tel:${resumeData.user_profile.phone}`}
              className="hover:underline"
            >
              {resumeData.user_profile.phone}
            </a>
          )}
          {resumeData.user_profile.location && (
            <>
              <span>|</span>
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {resumeData.user_profile.location}
              </span>
            </>
          )}
          {resumeData.user_profile.linkedin_url && (
            <>
              <span>|</span>
              <a
                href={resumeData.user_profile.linkedin_url}
                target="_blank"
                className="hover:underline"
              >
                LinkedIn
              </a>
            </>
          )}
          {resumeData.user_profile.github_url && (
            <>
              <span>|</span>
              <a
                href={resumeData.user_profile.github_url}
                target="_blank"
                className="hover:underline"
              >
                GitHub
              </a>
            </>
          )}
          {resumeData.user_profile.portfolio_url && (
            <>
              <span>|</span>
              <a
                href={resumeData.user_profile.portfolio_url}
                target="_blank"
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
        {Object.keys(resumeData.skills).some(
          (cat) => resumeData.skills[cat].length > 0,
        ) && (
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
            <div className="space-y-3">
              {Object.entries(resumeData.skills)
                .filter(([_, items]) => items.length > 0)
                .map(([category, items]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-800 capitalize">
                      {category.replace(/_/g, " ")}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {items.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
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
            <div className="space-y-5">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {exp.role}
                      </h3>
                      <p className="text-gray-600">
                        {exp.company_name} • {exp.location}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {exp.start_date} -{" "}
                      {exp.isPresentCompany ? "Present" : exp.end_date}
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-gray-600">
                    {exp.highlights?.map((highlight, idx) => (
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
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.project_name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {project.duration}
                    </span>
                  </div>
                  <div
                    className="text-gray-600 text-sm mt-1"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech_stack?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${accentColor}10`,
                          color: accentColor,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-gray-600">
                    {project.highlights?.map((highlight, idx) => (
                      <li key={idx} className="text-sm">
                        {highlight}
                      </li>
                    ))}
                  </ul>
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
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {edu.degree_name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {edu.start_year} - {edu.end_year}
                    </span>
                  </div>
                  <p className="text-gray-600">{edu.institution_name}</p>
                  {edu.grade && (
                    <p className="text-sm text-gray-500">Grade: {edu.grade}</p>
                  )}
                  <ul className="mt-1 space-y-1 list-disc list-inside text-gray-600">
                    {edu.highlights?.map((highlight, idx) => (
                      <li key={idx} className="text-sm">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        {resumeData.certifications.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b"
              style={{
                color: accentColor,
                borderBottomColor: `${accentColor}40`,
              }}
            >
              Certifications
            </h2>
            <div className="space-y-2">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-gray-800">
                      {cert.name}
                    </span>
                    <span className="text-sm text-gray-500">{cert.year}</span>
                  </div>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {resumeData.achievements.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b"
              style={{
                color: accentColor,
                borderBottomColor: `${accentColor}40`,
              }}
            >
              Achievements
            </h2>
            <div className="space-y-3">
              {resumeData.achievements.map((ach) => (
                <div key={ach.id}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">{ach.title}</h3>
                    <span className="text-sm text-gray-500">{ach.year}</span>
                  </div>
                  <div
                    className="text-gray-600 text-sm"
                    dangerouslySetInnerHTML={{ __html: ach.description }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
        {resumeData.languages.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b"
              style={{
                color: accentColor,
                borderBottomColor: `${accentColor}40`,
              }}
            >
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {resumeData.languages.map((lang) => (
                <div key={lang.id}>
                  <span className="font-medium text-gray-800">{lang.name}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({lang.proficiency})
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
        {resumeData.volunteering.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b"
              style={{
                color: accentColor,
                borderBottomColor: `${accentColor}40`,
              }}
            >
              Volunteering
            </h2>
            <div className="space-y-3">
              {resumeData.volunteering.map((vol) => (
                <div key={vol.id}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">
                      {vol.role} at {vol.organization}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {vol.duration}
                    </span>
                  </div>
                  <div
                    className="text-gray-600 text-sm"
                    dangerouslySetInnerHTML={{ __html: vol.description }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
        {resumeData.hobbies.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b"
              style={{
                color: accentColor,
                borderBottomColor: `${accentColor}40`,
              }}
            >
              Hobbies & Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.hobbies.map((hobby, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </section>
        )}
        {resumeData.custom_sections.map((section) => (
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
            <div className="space-y-1">
              {section.items.map((item, idx) => (
                <p key={idx} className="text-gray-700">
                  {item}
                </p>
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
              {/* Save Button */}
              <button
                onClick={saveResume}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Save size={18} />
                )}
                {isSaving ? "Saving..." : "Save Resume"}
              </button>

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

      {/* Save Status Toast Notification */}
      {saveStatus.show && (
        <div
          className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-slide-in ${
            saveStatus.success
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          {saveStatus.success ? (
            <CheckCircle className="text-green-600" size={20} />
          ) : (
            <AlertCircle className="text-red-600" size={20} />
          )}
          <p className={saveStatus.success ? "text-green-800" : "text-red-800"}>
            {saveStatus.message}
          </p>
          <button
            onClick={() =>
              setSaveStatus({ show: false, success: false, message: "" })
            }
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isPreviewMode ? (
          <ResumePreview />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Same as before */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                    <UserIcon size={18} /> Profile
                  </h2>
                  <div className="flex gap-2">
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
                    <p className="text-xs text-gray-500 uppercase">Full Name</p>
                    <p className="font-medium">
                      {resumeData.user_profile.full_name || "Not added"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Title</p>
                    <p className="text-gray-700">
                      {resumeData.user_profile.professional_title ||
                        "Not added"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Contact</p>
                    {resumeData.user_profile.email && (
                      <p className="text-sm break-all">
                        {resumeData.user_profile.email}
                      </p>
                    )}
                    {resumeData.user_profile.phone && (
                      <p className="text-sm">{resumeData.user_profile.phone}</p>
                    )}
                    {resumeData.user_profile.location && (
                      <p className="text-sm flex items-center gap-1">
                        <MapPin size={12} />
                        {resumeData.user_profile.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold">Professional Summary</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingSummary(true)}
                      className="text-blue-600 text-sm"
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
                        "<em class='text-gray-400'>No summary added.</em>",
                    }}
                  />
                </div>
              </div>

              {/* Skills Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Code2 size={18} /> Skills
                  </h2>
                  <button
                    onClick={() => setActiveSection("skills")}
                    className="text-blue-600 text-sm"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
                <div className="p-6">
                  {Object.keys(resumeData.skills).every(
                    (cat) => resumeData.skills[cat].length === 0,
                  ) && (
                    <p className="text-gray-400 text-sm text-center">
                      No skills added.
                    </p>
                  )}
                  {Object.entries(resumeData.skills)
                    .filter(([_, items]) => items.length > 0)
                    .map(([category, items]) => (
                      <div key={category} className="mb-3">
                        <h3 className="font-medium text-gray-800 capitalize text-sm">
                          {category.replace(/_/g, " ")}
                        </h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {items.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-gray-100 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Languages Card */}
              {resumeData.languages.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b flex justify-between">
                    <h2 className="font-semibold flex items-center gap-2">
                      <Languages size={18} /> Languages
                    </h2>
                    <button
                      onClick={() => setActiveSection("languages")}
                      className="text-blue-600 text-sm"
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>
                  <div className="p-6 space-y-2">
                    {resumeData.languages.map((lang) => (
                      <div key={lang.id} className="flex justify-between">
                        <span>{lang.name}</span>
                        <span className="text-gray-500 text-sm">
                          {lang.proficiency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications Card */}
              {resumeData.certifications.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b flex justify-between">
                    <h2 className="font-semibold flex items-center gap-2">
                      <Award size={18} /> Certifications
                    </h2>
                    <button
                      onClick={() => setActiveSection("certifications")}
                      className="text-blue-600 text-sm"
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>
                  <div className="p-6 space-y-3">
                    {resumeData.certifications.map((cert) => (
                      <div key={cert.id}>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-gray-600">
                          {cert.issuer} • {cert.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Sections Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold flex items-center gap-2">
                    <PlusCircle size={18} /> Custom Sections
                  </h2>
                  <button
                    onClick={() => setShowCustomSection(true)}
                    className="text-blue-600 text-sm"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  {resumeData.custom_sections.length === 0 && (
                    <p className="text-gray-400 text-sm text-center">
                      No custom sections.
                    </p>
                  )}
                  {resumeData.custom_sections.map((section) => (
                    <div
                      key={section.id}
                      className="group relative border-b pb-2"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">{section.title}</h3>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setEditingCustomSection(section);
                              setShowCustomSection(true);
                            }}
                            className="text-gray-400 hover:text-blue-600"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => deleteCustomSection(section.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {section.items.length} items
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Same as before */}
            <div className="lg:col-span-2 space-y-6">
              {/* Experience Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Briefcase size={18} /> Work Experience
                  </h2>
                  <button
                    onClick={() => setActiveSection("experience")}
                    className="text-blue-600 text-sm"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  {resumeData.experience.length === 0 && (
                    <p className="text-gray-400 text-center py-8">
                      No experience added.
                    </p>
                  )}
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="group relative border-b pb-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold">{exp.role}</h3>
                          <p className="text-gray-600 text-sm">
                            {exp.company_name} • {exp.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">
                            {exp.start_date} -{" "}
                            {exp.isPresentCompany ? "Present" : exp.end_date}
                          </span>
                        </div>
                      </div>
                      <ul className="mt-2 space-y-1 list-disc list-inside text-gray-600 text-sm">
                        {exp.highlights?.slice(0, 2).map((h, i) => (
                          <li
                            key={i}
                            dangerouslySetInnerHTML={{
                              __html:
                                h.length > 80 ? h.substring(0, 80) + "..." : h,
                            }}
                          />
                        ))}
                        {exp.highlights?.length > 2 && (
                          <li className="text-blue-500">
                            +{exp.highlights.length - 2} more
                          </li>
                        )}
                      </ul>
                      <div className="absolute top-0 right-0 flex gap-1 opacity-0 group-hover:opacity-100">
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
                  ))}
                </div>
              </div>

              {/* Projects Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold flex items-center gap-2">
                    <FolderGit2 size={18} /> Projects
                  </h2>
                  <button
                    onClick={() => setActiveSection("projects")}
                    className="text-blue-600 text-sm"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  {resumeData.projects.length === 0 && (
                    <p className="text-gray-400 text-center py-8">
                      No projects added.
                    </p>
                  )}
                  {resumeData.projects.map((project) => (
                    <div
                      key={project.id}
                      className="group relative border-b pb-4"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-semibold">
                          {project.project_name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {project.duration}
                        </span>
                      </div>
                      <p
                        className="text-gray-600 text-sm mt-1"
                        dangerouslySetInnerHTML={{
                          __html:
                            project.description?.length > 100
                              ? project.description.substring(0, 100) + "..."
                              : project.description || "",
                        }}
                      />
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tech_stack?.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-0.5 bg-gray-100 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech_stack?.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{project.tech_stack.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="absolute top-0 right-0 flex gap-1 opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => {
                            setEditingItem({ type: "projects", data: project });
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
                  ))}
                </div>
              </div>

              {/* Education Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold flex items-center gap-2">
                    <GraduationCap size={18} /> Education
                  </h2>
                  <button
                    onClick={() => setActiveSection("education")}
                    className="text-blue-600 text-sm"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  {resumeData.education.length === 0 && (
                    <p className="text-gray-400 text-center py-8">
                      No education added.
                    </p>
                  )}
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="group relative border-b pb-3">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold">{edu.degree_name}</h3>
                          <p className="text-gray-600 text-sm">
                            {edu.institution_name}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {edu.start_year} - {edu.end_year}
                        </span>
                      </div>
                      {edu.grade && (
                        <p className="text-sm text-gray-500">
                          Grade: {edu.grade}
                        </p>
                      )}
                      <div className="absolute top-0 right-0 flex gap-1 opacity-0 group-hover:opacity-100">
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
                  ))}
                </div>
              </div>

              {/* Achievements Card */}
              {resumeData.achievements.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b flex justify-between">
                    <h2 className="font-semibold flex items-center gap-2">
                      <Trophy size={18} /> Achievements
                    </h2>
                    <button
                      onClick={() => setActiveSection("achievements")}
                      className="text-blue-600 text-sm"
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>
                  <div className="p-6 space-y-3">
                    {resumeData.achievements.map((ach) => (
                      <div key={ach.id} className="group relative">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{ach.title}</h3>
                          <span className="text-sm text-gray-500">
                            {ach.year}
                          </span>
                        </div>
                        <div
                          className="text-sm text-gray-600"
                          dangerouslySetInnerHTML={{ __html: ach.description }}
                        />
                        <div className="absolute top-0 right-0 flex gap-1 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => {
                              setEditingItem({
                                type: "achievements",
                                data: ach,
                              });
                              setActiveSection("achievementsEdit");
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => deleteAchievement(ach.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Volunteering Card */}
              {resumeData.volunteering.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b flex justify-between">
                    <h2 className="font-semibold flex items-center gap-2">
                      <Heart size={18} /> Volunteering
                    </h2>
                    <button
                      onClick={() => setActiveSection("volunteering")}
                      className="text-blue-600 text-sm"
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>
                  <div className="p-6 space-y-3">
                    {resumeData.volunteering.map((vol) => (
                      <div key={vol.id}>
                        <div className="flex justify-between">
                          <h3 className="font-medium">
                            {vol.role} at {vol.organization}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {vol.duration}
                          </span>
                        </div>
                        <div
                          className="text-sm text-gray-600"
                          dangerouslySetInnerHTML={{ __html: vol.description }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hobbies Card */}
              {resumeData.hobbies.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b flex justify-between">
                    <h2 className="font-semibold flex items-center gap-2">
                      <Heart size={18} /> Hobbies
                    </h2>
                    <button
                      onClick={() => setActiveSection("hobbies")}
                      className="text-blue-600 text-sm"
                    >
                      <Plus size={14} /> Edit
                    </button>
                  </div>
                  <div className="p-6 flex flex-wrap gap-2">
                    {resumeData.hobbies.map((hobby, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals - Same as before */}
      <Modal
        isOpen={activeSection === "personal"}
        onClose={() => setActiveSection(null)}
        title="Edit Profile"
      >
        <PersonalInfoForm
          data={resumeData.user_profile}
          onSave={(data) => {
            updateResumeData("user_profile", data);
            setActiveSection(null);
          }}
          onClose={() => setActiveSection(null)}
        />
      </Modal>
      <Modal
        isOpen={editingSummary}
        onClose={() => setEditingSummary(false)}
        title="Edit Summary"
      >
        <div className="space-y-4">
          <RichTextEditor
            value={resumeData.summary}
            onChange={updateSummary}
            placeholder="Write your professional summary..."
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setEditingSummary(false)}
              className="px-4 py-2 text-gray-600 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => setEditingSummary(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={activeSection === "skills"}
        onClose={() => setActiveSection(null)}
        title="Edit Skills"
      >
        <div className="space-y-6">
          {Object.keys(resumeData.skills).map((category) => (
            <div key={category}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {category.replace(/_/g, " ")}
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {resumeData.skills[category].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkillItem(category, idx)}
                      className="hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Add ${category.replace(/_/g, " ")}`}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addSkillItem(category, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.target.previousSibling;
                    addSkillItem(category, input.value);
                    input.value = "";
                  }}
                  className="px-4 py-2 bg-gray-100 rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <button
              onClick={() => setActiveSection(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={activeSection === "experience"}
        onClose={() => setActiveSection(null)}
        title="Add Experience"
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
        title="Edit Experience"
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
        isOpen={activeSection === "certifications"}
        onClose={() => setActiveSection(null)}
        title="Add Certification"
      >
        <CertificationForm
          onSave={(data) => {
            addCertification(data);
            setActiveSection(null);
          }}
          onCancel={() => setActiveSection(null)}
        />
      </Modal>
      <Modal
        isOpen={activeSection === "certificationsEdit"}
        onClose={() => setActiveSection(null)}
        title="Edit Certification"
      >
        <CertificationForm
          cert={editingItem?.data}
          onSave={(data) => {
            updateCertification(editingItem.data.id, data);
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
        isOpen={activeSection === "achievements"}
        onClose={() => setActiveSection(null)}
        title="Add Achievement"
      >
        <AchievementForm
          onSave={(data) => {
            addAchievement(data);
            setActiveSection(null);
          }}
          onCancel={() => setActiveSection(null)}
        />
      </Modal>
      <Modal
        isOpen={activeSection === "achievementsEdit"}
        onClose={() => setActiveSection(null)}
        title="Edit Achievement"
      >
        <AchievementForm
          ach={editingItem?.data}
          onSave={(data) => {
            updateAchievement(editingItem.data.id, data);
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
        isOpen={activeSection === "languages"}
        onClose={() => setActiveSection(null)}
        title="Add Language"
      >
        <LanguageForm
          onSave={(data) => {
            addLanguage(data);
            setActiveSection(null);
          }}
          onCancel={() => setActiveSection(null)}
        />
      </Modal>
      <Modal
        isOpen={activeSection === "languagesEdit"}
        onClose={() => setActiveSection(null)}
        title="Edit Language"
      >
        <LanguageForm
          lang={editingItem?.data}
          onSave={(data) => {
            updateLanguage(editingItem.data.id, data);
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
        isOpen={activeSection === "volunteering"}
        onClose={() => setActiveSection(null)}
        title="Add Volunteering"
      >
        <VolunteeringForm
          onSave={(data) => {
            addVolunteering(data);
            setActiveSection(null);
          }}
          onCancel={() => setActiveSection(null)}
        />
      </Modal>
      <Modal
        isOpen={activeSection === "volunteeringEdit"}
        onClose={() => setActiveSection(null)}
        title="Edit Volunteering"
      >
        <VolunteeringForm
          vol={editingItem?.data}
          onSave={(data) => {
            updateVolunteering(editingItem.data.id, data);
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
        isOpen={activeSection === "hobbies"}
        onClose={() => setActiveSection(null)}
        title="Edit Hobbies"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {resumeData.hobbies.map((hobby, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
              >
                {hobby}
                <button
                  onClick={() => {
                    const newHobbies = [...resumeData.hobbies];
                    newHobbies.splice(idx, 1);
                    updateResumeData("hobbies", newHobbies);
                  }}
                  className="hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add hobby"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  updateResumeData("hobbies", [
                    ...resumeData.hobbies,
                    e.target.value,
                  ]);
                  e.target.value = "";
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = document.querySelector("#hobbyInput");
                if (input.value) {
                  updateResumeData("hobbies", [
                    ...resumeData.hobbies,
                    input.value,
                  ]);
                  input.value = "";
                }
              }}
              className="px-4 py-2 bg-gray-100 rounded-lg"
            >
              Add
            </button>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setActiveSection(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Done
            </button>
          </div>
        </div>
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
