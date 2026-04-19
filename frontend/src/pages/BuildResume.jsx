import {
  AlertCircle,
  Award,
  Briefcase,
  CheckCircle,
  Code2,
  Edit2,
  Eye,
  FileText,
  FolderGit2,
  GraduationCap,
  Heart,
  Languages,
  Loader2,
  MapPin,
  Plus,
  PlusCircle,
  Save,
  Trash2,
  Trophy,
  User as UserIcon,
  Wand2,
  X,
} from "lucide-react";
import { useState } from "react";
import AIAssistant from "../components/ai/AIAssistant";
import QuickFillForm from "../components/ai/QuickFillForm";
import RichTextEditor from "../components/ai/RichTextEditor";
import Modal from "../components/common/Modal";
import AchievementForm from "../components/resume/AchievementForm";
import CertificationForm from "../components/resume/CertificationForm";
import CustomSectionForm from "../components/resume/CustomSectionForm";
import EducationForm from "../components/resume/EducationForm";
import ExperienceForm from "../components/resume/ExperienceForm";
import PersonalInfoForm from "../components/resume/PersonalInfoForm";
import ProjectForm from "../components/resume/ProjectForm";
import ResumePreview from "../components/resume/ResumePreview";
import { API } from "../utils/APIS";
import { POSTMethod } from "../utils/server";

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

// Main Component
const BuildResume = () => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
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
  const [tempSummary, setTempSummary] = useState("");
  const [showCustomSection, setShowCustomSection] = useState(false);
  const [editingCustomSection, setEditingCustomSection] = useState(null);

  // Save state
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({
    show: false,
    success: false,
    message: "",
  });

  // Save resume to backend
  const saveResume = async () => {
    setIsSaving(true);
    setSaveStatus({ show: false, success: false, message: "" });

    try {
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

      const response = await POSTMethod(API.buildResume, payload);

      if (response.data.success) {
        setSaveStatus({
          show: true,
          success: true,
          message: "Resume saved successfully!",
        });

        if (response.data.data?._id) {
          localStorage.setItem("resumeId", response.data.data._id);
        }

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

      setTimeout(() => {
        setSaveStatus({ show: false, success: false, message: "" });
      }, 5000);
    } finally {
      setIsSaving(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
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
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
          <ResumePreview accentColor={accentColor} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
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
                      <Edit2 size={14} />
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
                      onClick={() => {
                        setTempSummary(resumeData.summary);
                        setEditingSummary(true);
                      }}
                      className="text-blue-600 text-sm whitespace-nowrap"
                    >
                      <Edit2 size={14} />
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
                    <Plus size={14} />
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
                      <Plus size={14} />
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
                      <Plus size={14} />
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
                    <Plus size={14} />
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

            {/* Right Column */}
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
                    <Plus size={14} />
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
                      <div className="absolute top-0 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    <Plus size={14} />
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
                      <div className="absolute top-0 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    <Plus size={14} />
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
                      <div className="absolute top-0 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                      <Plus size={14} />
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
                        <div className="absolute top-0 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                      <Plus size={14} />
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
                      <Plus size={14} />
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

      {/* Modals */}
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

      {/* Fixed Summary Modal */}
      <Modal
        isOpen={editingSummary}
        onClose={() => setEditingSummary(false)}
        title="Edit Professional Summary"
      >
        <div className="space-y-4">
          <RichTextEditor
            value={tempSummary}
            onChange={setTempSummary}
            placeholder="Write your professional summary..."
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setAiContext({
                  content: tempSummary,
                  sectionType: "summary",
                  fieldName: "Professional Summary",
                });
                setShowAIAssistant(true);
                setEditingSummary(false);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Wand2 size={16} /> Generate with AI
            </button>
            <button
              onClick={() => setEditingSummary(false)}
              className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                updateResumeData("summary", tempSummary);
                setEditingSummary(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Summary
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
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <button
              onClick={() => setActiveSection(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Add
            </button>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setActiveSection(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
            if (aiContext.sectionType === "summary") {
              setTempSummary(newContent);
              setEditingSummary(true);
            }
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
