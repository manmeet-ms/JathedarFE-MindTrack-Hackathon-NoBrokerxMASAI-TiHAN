import api from "./api.js";

export const getChronosSrv = () => {
  return api.get("/chronos/get");
};
export const resetChronosSrv = (id) => {
  return api.put(`/chronos/reset/${id}`);
};
export const createChronosSrv = (data) => {
  return api.post("/chronos/create", data);
};
export const initializeChronosSrv = (data) => {
  return api.post("/chronos/create", data);
};
export const updateChronosSrv = (id) => {
  return api.put(`/chronos/update/${id}`);
};
export const deleteChronosSrv = (id) => {
  return api.delete(`/chronos/delete/${id}`); 
};
