import api from './api'

export const checkInRitual = (vow) => api.post('/rituals/check-in', { vow })
export const hourlyCheckInRitual = (vow) => api.post('/rituals/check-in', { vow })

export const getTodayRitual = () => api.get('/rituals/today')
export const flushRituals = () => api.post('/rituals/flush')