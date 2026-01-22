import { API_BASE } from "../config/api";
import { getToken } from "../utils/auth";

export const getAllUsers = async () => {
  const res = await fetch(`${API_BASE}/admin/users`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};

export const getPendingInstructors = async () => {
  const res = await fetch(`${API_BASE}/admin/pending-instructors`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch pending instructors");
  }

  return res.json();
};

export const approveInstructor = async (instructorId) => {
  const res = await fetch(`${API_BASE}/admin/approve-instructor/${instructorId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to approve instructor");
  }

  return result;
};
