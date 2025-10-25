import api from "./api.js";

export const registerUser = async (userData) => {
  // Logic for registering a user
};

export const loginUser = async (credentials) => {
  // Logic for logging in a user
};

export const verifyUser = async (token) => {
  // Logic for verifying a user
};

export const resetPassword = async (email) => {
  // Logic for resetting a user's password
};

// TODO: fix this
export const getUserSrv = (id) => api.get(`/users/${id}`, { withCredentials: true });
export const updateUserSrv = (data) => api.put(`/users/update`, data, { withCredentials: true });

export const getHourlyCheckinsSrv = () => api.get("/users/hourly-checkins", { withCredentials: true });
export const createHourlyCheckinSrv = (data) => api.post("/users/hourly-checkins/create", data, { withCredentials: true });
export const updateHourlyCheckinSrv = (id, data) => api.put(`/users/hourly-checkins/${id}`, data, { withCredentials: true });

export const deleteHourlyCheckinSrv = (id) => api.delete(`/users/hourly-checkins/${id}`, { withCredentials: true });

export const flushUsers = () => api.post("/users/flush");
