import { API_BASE_URL } from "../config/env";
import { getAuthToken } from "../features/auth/authStorage";

const buildUrl = (endpoint) =>
  endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;

export const apiClient = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    ...(options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(buildUrl(endpoint), {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object" && data?.message
        ? data.message
        : "Request failed";
    throw new Error(message);
  }

  return data;
};

export const api = {
  get: (endpoint, options) =>
    apiClient(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options = {}) =>
    apiClient(endpoint, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  put: (endpoint, body, options = {}) =>
    apiClient(endpoint, {
      ...options,
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  patch: (endpoint, body, options = {}) =>
    apiClient(endpoint, {
      ...options,
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  delete: (endpoint, options) =>
    apiClient(endpoint, { ...options, method: "DELETE" }),
};
