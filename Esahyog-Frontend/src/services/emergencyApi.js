import { api } from "./apiClient";

export const emergencyApi = {
  create: (payload) => api.post("/api/emergencies/create", payload),

  getMine: () => api.get("/api/emergencies/my"),

  updateStatus: (id, status) =>
    api.patch(`/api/emergencies/admin/${id}/status`, {
      status,
    }),
};
