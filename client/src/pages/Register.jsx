import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { registerUser } from "../services/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await registerUser(form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Create your account 🚀
          </h1>
          <p className="text-gray-500 mt-1">
            Start learning from top-quality courses
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-gray-100">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 text-red-600 text-sm px-4 py-2">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* 🔑 ROLE SELECTION */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Register as
              </label>
              <select
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 py-2.5
                text-white font-semibold tracking-wide
                hover:bg-indigo-700 active:scale-[0.98]
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;