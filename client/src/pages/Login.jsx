import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await loginUser(form);
      login(response);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
<AuthLayout>
  <div className="w-full max-w-md mx-auto space-y-6">
    {/* Heading */}
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome Back 👋
      </h1>
      <p className="text-gray-500 mt-1">
        Login to continue your learning journey
      </p>
    </div>

    {/* Login Card */}
    <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-gray-100">
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 text-red-600 text-sm px-4 py-2">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-5">
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
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-2.5
            text-white font-semibold tracking-wide
            hover:bg-indigo-700 active:scale-[0.98]
            transition-all duration-200"
        >
          Login
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm text-center text-gray-600 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="text-indigo-600 font-semibold hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>

    {/* ===== Demo Credentials (Background UI) ===== */}
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-gray-700">
      <p className="font-semibold text-indigo-700 mb-2">
        🔐 Demo Login Credentials
      </p>

      <div className="space-y-2">
        <div>
          <p className="font-medium">Student</p>
          <p className="text-gray-600">
            Email: <span className="font-mono">alice@test.com</span>
          </p>
          <p className="text-gray-600">
            Password: <span className="font-mono">password123</span>
          </p>
        </div>

        <div className="border-t border-indigo-100 pt-2">
          <p className="font-medium">Instructor</p>
          <p className="text-gray-600">
            Email: <span className="font-mono">jhon@test.com</span>
          </p>
          <p className="text-gray-600">
            Password: <span className="font-mono">password123</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</AuthLayout>

  );
};

export default Login;