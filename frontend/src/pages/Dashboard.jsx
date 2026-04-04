import { Calendar, CheckSquare, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Dashboard = () => {
  const features = [
    {
      icon: <FileText className="w-7 h-7" />,
      title: "Build & Compare Resume",
      desc: "Create professional resumes with AI assistance",
      path: "/build-resume",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },

    {
      icon: <Calendar className="w-7 h-7" />,
      title: "Content Calendar",
      desc: "Plan your next post",
      path: "/content-calendar",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "Generate Post",
      desc: "Draft your thoughts with AI",
      path: "/generate-post",
      color: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },

    {
      icon: <CheckSquare className="w-7 h-7" />,
      title: "Tasks",
      desc: "Open anywhere and add your tasks",
      path: "/tasks",
      color: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <img src={logo} className="w-[40px] h-[40px]" />{" "}
            </div>
            <span className="font-bold text-xl text-gray-900">CarrerStack</span>
          </div>
          <div className="flex gap-2">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-600 font-medium hover:text-black transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Compact */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Build Your{" "}
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Dream Career
              </span>
            </h1>
            <p className="text-gray-600 mb-6">
              Create ATS-friendly resumes, track applications, and land your
              dream job faster
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                to="/signup"
                className="px-6 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
              >
                Start Building Free
              </Link>
              <Link
                to="/login"
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-black hover:text-black transition"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid - Tight Layout */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-[100px] w-full items-center ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {features.map((feature, idx) => (
            <Link to={feature.path} key={idx}>
              <div
                className={`${feature.color} h-full rounded-lg p-4 hover:shadow-md transition-all cursor-pointer border border-gray-100`}
              >
                <div className="flex items-center gap-3">
                  <div className={`${feature.iconColor}`}>{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/signup"
          className="px-5 py-2 w-[150px] bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition shadow-sm flex items-center justify-center"
        >
          View Demo
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
