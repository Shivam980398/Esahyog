import { api } from "./apiClient";

export const departmentsApi = {
  getDepartments: () => api.get("/api/departments"),
  getDepartmentDashboard: (key) => api.get(`/api/departments/${key}/dashboard`),
  getWaterZoneStatus: () => api.get("/api/water/zone-status"),
};
