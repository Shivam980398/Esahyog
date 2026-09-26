import { api } from "./apiClient";

export const adminApi = {
  getComplaintStats: () => api.get("/api/complaints/admin/stats"),

  getComplaints: () => api.get("/api/complaints/admin/all"),

  getEmergencies: () => api.get("/api/emergencies/admin/all"),

  addOfficer: (payload) =>
    api.post("/api/complaints/admin/add-officer", payload),

  getOfficers: (department) =>
    api.get(
      department
        ? `/api/complaints/admin/officers?department=${encodeURIComponent(
            department,
          )}`
        : "/api/complaints/admin/officers",
    ),

  assignComplaint: (complaintId, officerId) =>
    api.patch(`/api/complaints/admin/${complaintId}/assign`, {
      officerId,
    }),

  updateComplaintPriority: (complaintId, priority) =>
    api.patch(`/api/complaints/admin/${complaintId}/priority`, {
      priority,
    }),

  updateComplaintStatus: (complaintId, status) =>
    api.patch(`/api/complaints/admin/${complaintId}/status`, {
      status,
    }),
};
