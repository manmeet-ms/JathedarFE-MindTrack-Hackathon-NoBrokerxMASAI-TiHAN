
export const saveScheduleOffline = (blocks, ritual) => {
localStorage.setItem('offline_timeblocks', JSON.stringify(blocks))
localStorage.setItem('offline_ritual', JSON.stringify(ritual))
}

export const getOfflineSchedule = () => {
return {
blocks: JSON.parse(localStorage.getItem('offline_timeblocks')) || [],
ritual: JSON.parse(localStorage.getItem('offline_ritual')) || null,
}
}