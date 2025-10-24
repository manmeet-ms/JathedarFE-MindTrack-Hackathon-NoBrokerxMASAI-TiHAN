import api from "./api.js";

export const getTimersSrv = () => {
  return api.get("/timers/get");
};
export const resetTimerSrv = (timerId) => {
  return api.put(`/timers/reset/${timerId}`);
};
export const createTimerSrv = (data) => {
  return api.post("/timers/create", data);
};
export const initializeTimersSrv = (data) => {
  return api.post("/timers/create", data);
};
export const updateTimerSrv = (timerId) => {
  return api.put(`/timers/update/${timerId}`);
};
export const deleteTimerSrv = (timerId) => {
  return api.delete(`/timers/delete/${timerId}`); 
};
