import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import BuildResume from "./pages/BuildResume";
import CompareResume from "./pages/CompareResume";
import ContentCalendar from "./pages/ContentCalendar";
import Dashboard from "./pages/Dashboard";
import GeneratePost from "./pages/GeneratePost";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Tasks from "./pages/Tasks";

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated =
    localStorage.getItem("token") || localStorage.getItem("user");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - No protection needed */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Protected Routes - User must be logged in */}
        <Route
          path="/build-resume"
          element={
            <ProtectedRoute>
              <BuildResume />
            </ProtectedRoute>
          }
        />
        <Route
          path="/compare-resume"
          element={
            <ProtectedRoute>
              <CompareResume />
            </ProtectedRoute>
          }
        />
        <Route
          path="/content-calendar"
          element={
            <ProtectedRoute>
              <ContentCalendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generate-post"
          element={
            <ProtectedRoute>
              <GeneratePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
