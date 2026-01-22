import { useEffect, useState } from "react";
import { getPendingInstructors, getAllUsers, approveInstructor } from "../services/adminService";
import { FaUsers, FaUserCheck, FaUserClock, FaCheckCircle, FaTimesCircle, FaShieldAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const [pendingInstructors, setPendingInstructors] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [pending, users] = await Promise.all([
        getPendingInstructors(),
        getAllUsers(),
      ]);
      setPendingInstructors(pending);
      setAllUsers(users);
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (instructorId) => {
    try {
      await approveInstructor(instructorId);
      await loadData();
      alert("Instructor approved successfully!");
    } catch (err) {
      alert(err.message || "Failed to approve instructor");
    }
  };

  const stats = {
    totalUsers: allUsers.length,
    totalInstructors: allUsers.filter((u) => u.role === "instructor").length,
    approvedInstructors: allUsers.filter((u) => u.role === "instructor" && u.isApproved).length,
    pendingInstructors: pendingInstructors.length,
    totalStudents: allUsers.filter((u) => u.role === "student").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage users and platform settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <FaUsers className="text-3xl text-indigo-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
              <FaUsers className="text-3xl text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Instructors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalInstructors}</p>
              </div>
              <FaUserCheck className="text-3xl text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approvedInstructors}</p>
              </div>
              <FaCheckCircle className="text-3xl text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingInstructors}</p>
              </div>
              <FaUserClock className="text-3xl text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("pending")}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "pending"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Pending Instructors ({pendingInstructors.length})
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "users"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All Users ({allUsers.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Pending Instructors Tab */}
            {activeTab === "pending" && (
              <div>
                {pendingInstructors.length === 0 ? (
                  <div className="text-center py-12">
                    <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-900">All instructors approved!</p>
                    <p className="text-gray-600">No pending instructor approvals</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingInstructors.map((instructor) => (
                      <div
                        key={instructor._id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
                            {instructor.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{instructor.name}</p>
                            <p className="text-sm text-gray-600">{instructor.email}</p>
                            <p className="text-xs text-yellow-600 mt-1">Pending Approval</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleApprove(instructor._id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                          <FaCheckCircle />
                          Approve
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* All Users Tab */}
            {activeTab === "users" && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
                              {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800 capitalize">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.role === "instructor" ? (
                            user.isApproved ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Approved
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Pending
                              </span>
                            )
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Active
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;