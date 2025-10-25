import api from "./api.js";

export const logViolationSrv = async (userId, type = "missed_block", timeBlockId) => await api.post("/violations/log", { userId, type, timeBlockId }, { withCredentials: true });
export const createViolationMessageService = async (userId, type = "missed_block", block) => await api.post("/violations/log", { userId, type, block }, { withCredentials: true });

export const getViolations = async () => await api.get("/violations");
export const getTodayViolationsSrv = async () => await api.get("/violations/today");

export const resolveViolationSrv = async (id) => await api.post(`/violations/${id}/resolve`);
export const flushViolations = async () => await api.post("/violations/flush");
