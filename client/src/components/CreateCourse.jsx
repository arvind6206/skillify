import { useState } from "react";
import { createCourse } from "../services/courseService";

const CreateCourse = ({ onCreated }) => {
  const [form, setForm] = useState({ 
    title: "", 
    description: "",
    category: "",
    level: "",
    duration: "",
    learningOutcomes: "",
  });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description) {
      setError("Title and description are required");
      return;
    }

    try {
      const courseData = {
        ...form,
        learningOutcomes: form.learningOutcomes
          ? form.learningOutcomes.split("\n").filter((item) => item.trim())
          : [],
      };
      await createCourse(courseData);
      setForm({ 
        title: "", 
        description: "",
        category: "",
        level: "",
        duration: "",
        learningOutcomes: "",
      });
      onCreated();
      alert("Course created successfully!");
    } catch (err) {
      setError(err.message || "Failed to create course");
    }
  };

  return (
    <div
      className="
        bg-white border border-gray-200 rounded-xl shadow-sm
        p-6 w-full
        sm:max-w-md
      "
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Create New Course
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Title *
          </label>
          <input
            placeholder="e.g. Mastering JavaScript"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="
              w-full rounded-lg border border-gray-300 px-4 py-2.5
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition text-gray-900
            "
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Description *
          </label>
          <textarea
            placeholder="Briefly describe what students will learn"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            rows={4}
            className="
              w-full rounded-lg border border-gray-300 px-4 py-2.5
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition resize-none text-gray-900
            "
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            placeholder="e.g. Web Development, Data Science"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="
              w-full rounded-lg border border-gray-300 px-4 py-2.5
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition text-gray-900
            "
          />
        </div>

        {/* Level and Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level
            </label>
            <select
              value={form.level}
              onChange={(e) =>
                setForm({ ...form, level: e.target.value })
              }
              className="
                w-full rounded-lg border border-gray-300 px-4 py-2.5
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition text-gray-900
              "
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              placeholder="e.g. 10 hours"
              value={form.duration}
              onChange={(e) =>
                setForm({ ...form, duration: e.target.value })
              }
              className="
                w-full rounded-lg border border-gray-300 px-4 py-2.5
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition text-gray-900
              "
            />
          </div>
        </div>

        {/* Learning Outcomes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Learning Outcomes (one per line)
          </label>
          <textarea
            placeholder="What students will learn...&#10;One outcome per line"
            value={form.learningOutcomes}
            onChange={(e) =>
              setForm({ ...form, learningOutcomes: e.target.value })
            }
            rows={3}
            className="
              w-full rounded-lg border border-gray-300 px-4 py-2.5
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition resize-none text-gray-900
            "
          />
        </div>

        {/* Action */}
        <button
          type="submit"
          className="
            w-full bg-indigo-600 text-white py-2.5 rounded-lg
            font-semibold hover:bg-indigo-700
            active:scale-[0.98] transition-all
          "
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;