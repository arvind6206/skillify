import { Routes,Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <MainLayout>
            <Dashboard/>
          </MainLayout>
        </ProtectedRoute>
      }
      />
      <Route path="/course/:id" element={
        <ProtectedRoute>
          <MainLayout>
            <CourseDetails/>
          </MainLayout>
        </ProtectedRoute>
      }
      />
      <Route path="/my-courses" element={
        <ProtectedRoute>
          <MainLayout>
            <MyCourses/>
          </MainLayout>
        </ProtectedRoute>
      }
      />
      <Route path="/profile" element={
        <ProtectedRoute>
          <MainLayout>
            <Profile/>
          </MainLayout>
        </ProtectedRoute>
      }
      />
    </Routes>
  );
}

export default App;