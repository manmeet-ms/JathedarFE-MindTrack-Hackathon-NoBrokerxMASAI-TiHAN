

// checkMissedRitual

export const evaluatePunishmentsSrv=async ()=> await api.get("/punishments/evaluatePunishments")
export const checkMissedTimeblocksSrv=async ()=> await api.get("/punishments/checkMissedTimeblocks")
export const checkForPunishmentsSrv=async ()=> await api.get("/punishments/checkForPunishments")
export const triggerPunishmentSrv=async ()=> await api.get("/punishments/triggerPunishment")
export const acknowledgePunishmentSrv=async (violationId)=>  await api.post(`/api/violations/${violationId}/resolve`);

// STREAK_BREAK_PENALTY
// VIOLATION_PENALTY
// TIMER_RESET_PENALTY
// PUNISHMENT_TRIGGER_PENALTY
