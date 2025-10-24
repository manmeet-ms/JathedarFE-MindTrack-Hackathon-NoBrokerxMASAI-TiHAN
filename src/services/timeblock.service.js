// Frontend: calls that API endpoint	Fetches data or triggers actions

import api from "./api.js";

export const initTimeBlocksSrv = (data) => api.post("/timeblocks/init", data);

export const createTimeBlock = (data) => api.post("/timeblocks", data);

export const getTodayBlocks = () => api.get("/timeblocks/today");

export const completeBlock = (id) => api.post(`/timeblocks/${id}/complete`);

export const flushBlocks = () => api.post(`/timeblocks/flush`);
