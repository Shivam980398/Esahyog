import { api } from "./apiClient";

export const authApi = {
  login: (payload) => api.post("/api/auth/login", payload),
  signup: (payload) => api.post("/api/auth/signup", payload),
  verifyOtp: (payload) => api.post("/api/auth/verify-otp", payload),
  updateProfile: (payload) => api.put("/api/citizen/profile", payload),
  updateIdentity: (payload) => api.put("/api/citizen/identity", payload),
  forgotPassword: (payload) => api.post("/api/auth/forgot-password", payload),
  verifyResetOtp: (payload) => api.post("/api/auth/verify-reset-otp", payload),

  resetPassword: (payload) => api.post("/api/auth/reset-password", payload),
};
