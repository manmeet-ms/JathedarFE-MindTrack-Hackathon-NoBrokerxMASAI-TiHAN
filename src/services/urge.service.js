import api from "./api.js";

export const logUrgeService = async (data) => {
  return await api.post("/urges/log-urge", data, { withCredentials: true });
};

export const getUrgesService = async () => await api.get(`/urges/`, { withCredentials: true });
