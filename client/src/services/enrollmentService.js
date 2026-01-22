import { API_BASE } from "../config/api";
import { getToken } from "../utils/auth";

export const enrollInCourse = async (courseId) => {
  const res = await fetch(`${API_BASE}/enrollments/${courseId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to enroll in course");
  }

  return result;
};

export const getMyEnrollments = async () => {
  const res = await fetch(`${API_BASE}/enrollments/my-courses`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch enrollments");
  }

  return res.json();
};

export const checkEnrollment = async (courseId) => {
  const res = await fetch(`${API_BASE}/enrollments/check/${courseId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    return false;
  }

  return res.json();
};
