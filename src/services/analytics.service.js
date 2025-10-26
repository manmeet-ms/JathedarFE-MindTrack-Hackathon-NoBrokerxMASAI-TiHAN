// import { sendMessageInDiscordChannel } from "../utils/discord-server.utils.js";
import api from "./api.js";

export const leaderboardUsersSrv = async () =>await api.get(`/analytics/leaderboard`, { withCredentials: true });
export const getStreaksSrv = async () => await api.get(`/analytics/streaks`, { withCredentials: true });
export const getCalendarActivitySrv = async () => await api.get(`/analytics/calendar-activity`, { withCredentials: true });
export const getMoodSrv = async () => await api.get(`/analytics/mood-tracker`, { withCredentials: true });
