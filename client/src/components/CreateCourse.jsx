import { useState } from "react";
import { createCourse } from "../services/courseService";

const CreateCourse = ({ onCreated }) => {
  const [form, setForm] = useState({ title: "", description: "" });

  const submit = async (e) => {
    e.preventDefault();
    await createCourse(form);
    setForm({ title: "", description: "" });
    onCreated();
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

      <form onSubmit={submit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Title
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
              transition
            "
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Description
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
              transition resize-none
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