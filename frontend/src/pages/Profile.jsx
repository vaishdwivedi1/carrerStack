import axios from "axios";
import {
  Edit,
  FileText,
  Link2,
  Mail,
  PenTool,
  Save,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { GETMethod, PUTMethod } from "../utils/server";
import { API } from "../utils/APIS";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    social_links: {
      linkedin: "",
      github: "",
      portfolio: "",
      twitter: "",
      hashnode: "",
      dev_to: "",
      medium: "",
    },
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await GETMethod(`${API.getProfile}?email=${user.email}`);

      setUser(response?.user);
      setFormData({
        username: response.data.user.username,
        email: response.data.user.email,
        social_links: response.data.user.social_links || {
          linkedin: "",
          github: "",
          portfolio: "",
          twitter: "",
          hashnode: "",
          dev_to: "",
          medium: "",
        },
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("social_links.")) {
      const socialKey = name.split(".")[1];
      setFormData({
        ...formData,
        social_links: {
          ...formData.social_links,
          [socialKey]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // Only send social_links for update
      await PUTMethod(`${API.editProfile}`, {
        socialLinks: {
          linkedin: formData.social_links.linkedin,
          github: formData.social_links.github,
          portfolio: formData.social_links.portfolio,
          twitter: formData.social_links.twitter,
          dev_to: formData.social_links.dev_to,
          hashnode: formData.social_links.hashnode,
          medium: formData.social_links.medium,
        },
        email: user.email,
      });

      setEditing(false);
      fetchUserProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    // Reset form data to original user data
    setFormData({
      username: user.username,
      email: user.email,
      social_links: user.social_links || {
        linkedin: "",
        github: "",
        portfolio: "",
        twitter: "",
        hashnode: "",
        dev_to: "",
        medium: "",
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit}>
          {/* Basic Info - Read Only */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-black flex items-center">
                <User className="w-5 h-5 mr-2" />
                Basic Information
              </h2>
              {!editing && (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit Social Links
                </button>
              )}
              {editing && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <p className="text-gray-900 py-2 bg-gray-50 px-3 rounded-lg">
                  {user?.username}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </label>
                <p className="text-gray-900 py-2 bg-gray-50 px-3 rounded-lg">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Social Links - Editable */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
              <Link2 className="w-5 h-5 mr-2" />
              Social Links
              {editing && (
                <span className="ml-3 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                  Editing Mode
                </span>
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                {editing ? (
                  <input
                    type="url"
                    name="social_links.linkedin"
                    value={formData.social_links.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <div className="py-2">
                    {user?.social_links?.linkedin ? (
                      <a
                        href={user.social_links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {user.social_links.linkedin}
                      </a>
                    ) : (
                      <span className="text-gray-400">Not added</span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub
                </label>
                {editing ? (
                  <input
                    type="url"
                    name="social_links.github"
                    value={formData.social_links.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <div className="py-2">
                    {user?.social_links?.github ? (
                      <a
                        href={user.social_links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {user.social_links.github}
                      </a>
                    ) : (
                      <span className="text-gray-400">Not added</span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Portfolio
                </label>
                {editing ? (
                  <input
                    type="url"
                    name="social_links.portfolio"
                    value={formData.social_links.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://yourportfolio.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <div className="py-2">
                    {user?.social_links?.portfolio ? (
                      <a
                        href={user.social_links.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {user.social_links.portfolio}
                      </a>
                    ) : (
                      <span className="text-gray-400">Not added</span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter/X
                </label>
                {editing ? (
                  <input
                    type="url"
                    name="social_links.twitter"
                    value={formData.social_links.twitter}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <div className="py-2">
                    {user?.social_links?.twitter ? (
                      <a
                        href={user.social_links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {user.social_links.twitter}
                      </a>
                    ) : (
                      <span className="text-gray-400">Not added</span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hashnode
                </label>
                {editing ? (
                  <input
                    type="url"
                    name="social_links.hashnode"
                    value={formData.social_links.hashnode}
                    onChange={handleInputChange}
                    placeholder="https://hashnode.com/@username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <div className="py-2">
                    {user?.social_links?.hashnode ? (
                      <a
                        href={user.social_links.hashnode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {user.social_links.hashnode}
                      </a>
                    ) : (
                      <span className="text-gray-400">Not added</span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dev.to
                </label>
                {editing ? (
                  <input
                    type="url"
                    name="social_links.dev_to"
                    value={formData.social_links.dev_to}
                    onChange={handleInputChange}
                    placeholder="https://dev.to/username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <div className="py-2">
                    {user?.social_links?.dev_to ? (
                      <a
                        href={user.social_links.dev_to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {user.social_links.dev_to}
                      </a>
                    ) : (
                      <span className="text-gray-400">Not added</span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medium
                </label>
                {editing ? (
                  <input
                    type="url"
                    name="social_links.medium"
                    value={formData.social_links.medium}
                    onChange={handleInputChange}
                    placeholder="https://medium.com/@username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <div className="py-2">
                    {user?.social_links?.medium ? (
                      <a
                        href={user.social_links.medium}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {user.social_links.medium}
                      </a>
                    ) : (
                      <span className="text-gray-400">Not added</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Section - Resumes & Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Resumes</p>
                  <p className="text-2xl font-bold text-black">
                    {user?.resumes?.length || 0}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Posts</p>
                  <p className="text-2xl font-bold text-black">
                    {user?.posts?.length || 0}
                  </p>
                </div>
                <PenTool className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
