

// checkMissedRitual

export const evaluatePunishmentsSrv=async ()=> await api.get("/punishments/evaluate-punishments")
export const checkMissedTimeblocksSrv=async ()=> await api.get("/punishments/check-missed-timeblocks")
export const checkForPunishmentsSrv=async ()=> await api.get("/punishments/check-for-punishments")
export const triggerPunishmentSrv=async ()=> await api.get("/punishments/trigger-punishment")
export const acknowledgePunishmentSrv=async (violationId)=>  await api.post(`/api/violations/${violationId}/resolve`);

// STREAK_BREAK_PENALTY
// VIOLATION_PENALTY
// TIMER_RESET_PENALTY
// PUNISHMENT_TRIGGER_PENALTY
