import { api } from "../../../services/apiClient";

export const complaintsApi = {
  create: (data) => api.post("/complaints/create", data),

  getMine: () => api.get("/api/complaints/my-complaints"),

  withdraw: (id) => api.patch(`/complaints/withdraw/${id}`),

  getAdminComplaints: () => api.get("/complaints/admin/all"),

  getAdminStats: () => api.get("/complaints/admin/stats"),

  getOfficers: (department) =>
    api.get("/complaints/admin/officers", {
      params: department ? { department } : {},
    }),

  assignComplaint: (complaintId, officerId) =>
    api.patch(`/complaints/admin/${complaintId}/assign`, {
      officerId,
    }),

  updatePriority: (complaintId, priority) =>
    api.patch(`/complaints/admin/${complaintId}/priority`, {
      priority,
    }),

  updateStatus: (complaintId, status) =>
    api.patch(`/complaints/admin/${complaintId}/status`, {
      status,
    }),

  getById: (id) => api.get(`/complaints/${id}`),
};
