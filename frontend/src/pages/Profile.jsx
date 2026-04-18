import {
  Edit,
  FileText,
  Globe,
  Link2,
  Mail,
  PenTool,
  Plus,
  Save,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { API } from "../utils/APIS";
import { GETMethod, PUTMethod } from "../utils/server";

// SVG Icon Components
const LinkedInIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 382 382"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889 C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056 H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806 c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1 s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73 c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079 c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426 c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472 L341.91,330.654L341.91,330.654z"
      fill="#0077B7"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 -0.5 25 25"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="-143 145 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M-143,145v512h512V145H-143z M215.2,361.2c0.1,2.2,0.1,4.5,0.1,6.8c0,69.5-52.9,149.7-149.7,149.7 c-29.7,0-57.4-8.7-80.6-23.6c4.1,0.5,8.3,0.7,12.6,0.7c24.6,0,47.3-8.4,65.3-22.5c-23-0.4-42.5-15.6-49.1-36.5 c3.2,0.6,6.5,0.9,9.9,0.9c4.8,0,9.5-0.6,13.9-1.9C13.5,430-4.6,408.7-4.6,383.2v-0.6c7.1,3.9,15.2,6.3,23.8,6.6 c-14.1-9.4-23.4-25.6-23.4-43.8c0-9.6,2.6-18.7,7.1-26.5c26,31.9,64.7,52.8,108.4,55c-0.9-3.8-1.4-7.8-1.4-12 c0-29,23.6-52.6,52.6-52.6c15.1,0,28.8,6.4,38.4,16.6c12-2.4,23.2-6.7,33.4-12.8c-3.9,12.3-12.3,22.6-23.1,29.1 c10.6-1.3,20.8-4.1,30.2-8.3C234.4,344.5,225.5,353.7,215.2,361.2z" />
  </svg>
);

const HashnodeIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 282 282"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.68 13.032c-3.573 3.505-3.573 9.363 0 12.936L13.032 36.32c3.505 3.573 9.363 3.573 12.936 0L36.32 25.968c3.573-3.573 3.573-9.431 0-12.936L25.968 2.68c-3.573-3.573-9.431-3.573-12.936 0zm12.211 1.935c2.507-2.521 6.582-2.544 9.104-.038s2.544 6.582.038 9.104-6.582 2.544-9.104.038-2.544-6.582-.038-9.104" />
    <path d="M268.379 39q-6.322 0-10.35-4.108-4.002-4.134-4.002-10.483 0-6.296 4.002-10.43 4-4.135 10.163-4.135 6.028 0 9.817 3.734 3.814 3.735 3.814 9.497v2.8h-24.248v-4.054h17.633q-.187-2.747-2.054-4.508-1.868-1.76-4.962-1.76-3.28-.001-5.388 2.374-2.108 2.373-2.108 6.375 0 4.188 2.348 6.695 2.347 2.481 5.895 2.481 1.68 0 2.934-.453a8.5 8.5 0 0 0 2.321-1.307q1.041-.854 2.268-2.614l4.694 2.96q-1.707 2.748-3.494 4.135a12.7 12.7 0 0 1-3.975 2.081q-2.187.72-5.308.72m-33.496 0q-5.575 0-9.283-4.028-3.681-4.029-3.681-10.484 0-6.43 3.761-10.51 3.76-4.108 9.47-4.108 2.8 0 5.175 1.2 2.4 1.174 3.628 3.148l.026-.08V0h7.016v38.2h-6.722v-4.722l.64.8-.694.133q-1.28 2.108-3.788 3.361Q237.924 39 234.883 39m1.627-6.002q3.308 0 5.495-2.428t2.188-6.135q0-3.762-2.214-6.109-2.214-2.374-5.469-2.374-3.28 0-5.522 2.347-2.214 2.348-2.214 6.163 0 3.76 2.214 6.162 2.214 2.374 5.522 2.374M205.811 39q-6.376 0-10.537-4.161-4.161-4.188-4.161-10.404 0-6.321 4.161-10.456 4.188-4.135 10.537-4.135 6.348 0 10.537 4.161 4.188 4.161 4.188 10.43 0 6.216-4.188 10.404Q212.186 39 205.811 39m0-6.162q3.307 0 5.575-2.374 2.267-2.374 2.267-6.055 0-3.707-2.294-6.056-2.267-2.347-5.548-2.347-3.308 0-5.575 2.374-2.268 2.348-2.268 6.029t2.241 6.055q2.268 2.374 5.602 2.374M162.586 38.2V10.644h6.802v5.015l-.8-.987h.906q1.308-2.187 3.762-3.494 2.48-1.335 5.228-1.334 4.615 0 7.256 2.8 2.667 2.776 2.667 7.603V38.2h-7.069V21.794q0-2.854-1.387-4.401t-4.134-1.547q-2.614 0-4.402 1.974-1.76 1.974-1.76 4.881V38.2zm-30.181 0V0h6.962v14.698h.134q1.2-2.187 3.574-3.521 2.375-1.335 5.229-1.334 4.615 0 7.255 2.828 2.668 2.801 2.668 7.522V38.2h-7.069V21.794q0-2.827-1.387-4.402-1.387-1.573-4.055-1.573-2.587 0-4.428 2.027-1.814 2.027-1.814 4.962v15.391zm-14.416.8q-2.882 0-5.015-.64-2.108-.614-3.761-1.84-1.654-1.228-2.668-2.695l-.987-1.467 4.695-3.174.773 1.067a9.1 9.1 0 0 0 1.788 1.814 8.2 8.2 0 0 0 2.32 1.2q1.308.4 3.068.4 2.161 0 3.441-.8 1.308-.8 1.307-2.294 0-1.36-1.147-2.108-1.12-.747-5.068-1.654-5.335-1.253-7.656-3.334-2.32-2.107-2.321-5.362 0-3.76 3.148-6.002 3.148-2.267 7.923-2.267 2.454 0 4.348.507t3.388 1.493q1.493.988 2.454 2.188l.987 1.2-4.482 3.255-.667-.774a7.4 7.4 0 0 0-1.627-1.387 6.4 6.4 0 0 0-2.054-.88 9.5 9.5 0 0 0-2.401-.294q-1.974 0-3.201.8-1.2.774-1.2 1.921 0 1.254 1.12 2.027 1.147.748 5.229 1.681 5.334 1.227 7.629 3.308 2.294 2.055 2.294 5.308 0 4.029-3.228 6.43Q123.217 39 117.989 39M87.61 39q-4.508 0-7.335-2.454-2.828-2.481-2.828-6.482 0-4.188 3.254-6.669t8.483-2.48q2.082 0 4.028.426 1.974.427 3.361 1.12v-1.6q0-2.588-1.813-4.082-1.788-1.493-4.615-1.493-1.628 0-2.801.373a8.7 8.7 0 0 0-2.188.987q-.987.614-1.84 1.414l-.854.8-4.081-3.788 1.307-1.173a18.7 18.7 0 0 1 2.934-2.108q1.601-.933 3.601-1.44t4.589-.507q5.868 0 9.229 2.88 3.361 2.882 3.361 8.084V38.2h-6.749v-5.922l1.654 2.187h-1.76q-1.308 2.055-3.655 3.308Q90.545 39 87.611 39m1.814-4.988q3.148 0 5.149-2.187 2-2.215 2-5.309v-.08q-1.12-.693-2.72-1.094a13 13 0 0 0-3.388-.426q-2.828 0-4.562 1.2-1.734 1.173-1.734 3.521 0 2.028 1.468 3.201t3.787 1.174M49 38.2V0h6.962v14.698h.134q1.2-2.187 3.574-3.521 2.375-1.335 5.229-1.334 4.615 0 7.255 2.828 2.668 2.801 2.668 7.522V38.2h-7.07V21.794q0-2.827-1.386-4.402-1.387-1.573-4.055-1.573-2.587 0-4.428 2.027-1.815 2.027-1.814 4.962v15.391z" />
  </svg>
);

const DevToIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="512" height="512" rx="15%" fill="#0A0A0A" />
    <path
      fill="#FFFFFF"
      d="M140.47 203.94h-17.44v104.47h17.45c10.155-.545 17.358-8.669 17.47-17.41v-69.65c-.696-10.364-7.796-17.272-17.48-17.41zm45.73 87.25c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28zm100.68-88.66H233.6v38.42h32.57v29.57H233.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58z"
    />
  </svg>
);

const MediumIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 256 146"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M72.2009141,0 C112.076502,0 144.399375,32.5485469 144.399375,72.6964154 C144.399375,112.844284 112.074049,145.390378 72.2009141,145.390378 C32.327779,145.390378 0,112.844284 0,72.6964154 C0,32.5485469 32.325326,0 72.2009141,0 Z M187.500628,4.25836743 C207.438422,4.25836743 223.601085,34.8960455 223.601085,72.6964154 C223.601085,110.486973 207.440875,141.134463 187.503081,141.134463 C167.565287,141.134463 151.402624,110.486973 151.402624,72.6964154 C151.402624,34.9058574 167.562834,4.25836743 187.500628,4.25836743 Z M243.303393,11.3867175 C250.314,11.3867175 256,38.835526 256,72.6964154 C256,106.547493 250.316453,134.006113 243.303393,134.006113 C236.290333,134.006113 230.609239,106.554852 230.609239,72.6964154 C230.609239,38.837979 236.292786,11.3867175 243.303393,11.3867175 Z"
      fill="#000000"
    />
  </svg>
);

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(true);
  const [editingSocial, setEditingSocial] = useState(null);
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

  // Social links configuration with proper icon handling
  const socialLinksConfig = [
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: LinkedInIcon,
      color: "text-blue-600",
      placeholder: "https://linkedin.com/in/username",
      bgColor: "hover:bg-blue-50",
    },
    {
      key: "github",
      label: "GitHub",
      icon: GitHubIcon,
      color: "text-gray-800",
      placeholder: "https://github.com/username",
      bgColor: "hover:bg-gray-50",
    },
    {
      key: "twitter",
      label: "Twitter/X",
      icon: TwitterIcon,
      color: "text-blue-400",
      placeholder: "https://twitter.com/username",
      bgColor: "hover:bg-blue-50",
    },
    {
      key: "portfolio",
      label: "Portfolio",
      icon: Globe,
      color: "text-green-600",
      placeholder: "https://yourportfolio.com",
      bgColor: "hover:bg-green-50",
    },
    {
      key: "hashnode",
      label: "Hashnode",
      icon: HashnodeIcon,
      color: "text-blue-700",
      placeholder: "https://hashnode.com/@username",
      bgColor: "hover:bg-blue-50",
    },
    {
      key: "dev_to",
      label: "Dev.to",
      icon: DevToIcon,
      color: "text-gray-700",
      placeholder: "https://dev.to/username",
      bgColor: "hover:bg-gray-50",
    },
    {
      key: "medium",
      label: "Medium",
      icon: MediumIcon,
      color: "text-black",
      placeholder: "https://medium.com/@username",
      bgColor: "hover:bg-gray-50",
    },
  ];

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await GETMethod(`${API.getProfile}?email=${user.email}`);
      setUser(response?.user);
      setFormData({
        username: response.user.username,
        email: response.user.email,
        social_links: response.user.social_links || {
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

  const handleInputChange = (e, socialKey = null) => {
    const { value } = e.target;
    if (socialKey) {
      setFormData({
        ...formData,
        social_links: {
          ...formData.social_links,
          [socialKey]: value,
        },
      });
    }
  };

  const handleSocialSubmit = async (socialKey) => {
    try {
      await PUTMethod(`${API.editProfile}`, {
        socialLinks: {
          [socialKey]: formData.social_links[socialKey],
        },
        email: user.email,
      });

      setEditingSocial(null);
      fetchUserProfile();
    } catch (error) {
      console.error("Error updating social link:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingSocial(null);
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

  const getDisplayValue = (url) => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return url;
    }
  };

  // Helper function to render icon
  const renderIcon = (Icon, color, additionalProps = {}) => {
    if (typeof Icon === "function") {
      // For custom SVG components
      return <Icon />;
    }
    // For Lucide icons
    return <Icon className={`w-5 h-5 ${color}`} {...additionalProps} />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Basic Info */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black flex items-center">
            <User className="w-5 h-5 mr-2" />
            Basic Information
          </h2>
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

      {/* Social Links - Icon Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
          <Link2 className="w-5 h-5 mr-2" />
          Social Links
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {socialLinksConfig.map((social) => {
            const hasLink = formData.social_links[social.key];
            const isEditing = editingSocial === social.key;
            const displayValue = getDisplayValue(hasLink);

            return (
              <div
                key={social.key}
                className={`group relative border rounded-lg p-3 transition-all ${
                  hasLink
                    ? `border-gray-200 ${social.bgColor}`
                    : "border-dashed border-gray-300 bg-gray-50"
                }`}
              >
                {!isEditing ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          {renderIcon(social.icon, social.color)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">
                            {social.label}
                          </p>
                          {hasLink ? (
                            <a
                              href={hasLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline truncate block"
                              title={hasLink}
                            >
                              {displayValue}
                            </a>
                          ) : (
                            <p className="text-sm text-gray-400">Not added</p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => setEditingSocial(social.key)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded ml-2 flex-shrink-0"
                        title={hasLink ? "Edit" : "Add"}
                      >
                        {hasLink ? (
                          <Edit className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Plus className="w-4 h-4 text-green-600" />
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0">
                        {renderIcon(social.icon, social.color)}
                      </div>
                      <input
                        type="url"
                        value={formData.social_links[social.key]}
                        onChange={(e) => handleInputChange(e, social.key)}
                        placeholder={social.placeholder}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        autoFocus
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={handleCancelEdit}
                        className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSocialSubmit(social.key)}
                        className="px-2 py-1 text-xs text-white bg-black rounded hover:bg-gray-800 flex items-center gap-1"
                      >
                        <Save className="w-3 h-3" />
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
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
    </div>
  );
};

export default Profile;
