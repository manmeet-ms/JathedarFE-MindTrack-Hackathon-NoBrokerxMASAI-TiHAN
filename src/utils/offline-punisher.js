import dayjs from 'dayjs'
import { triggerPunishment } from '../services/punishment.service.js'
import { getOfflineSchedule } from './sync.utils.js'

export const startOfflinePunisher = () => {
setInterval(() => {
const { blocks, ritual } = getOfflineSchedule()
const now = dayjs()

blocks.forEach(block => {
  if (block.strict && !block.completed) {
    const endTime = dayjs(`${block.date}T${block.endTime}`)
    if (now.isAfter(endTime)) {
      triggerPunishment({ type: 'missed_block', task: block.task })
    }
  }
})

if (ritual && !ritual.completed) {
  const ritualTime = dayjs(`${ritual.date}T23:59`)
  if (now.isAfter(ritualTime)) {
    triggerPunishment({ type: 'missed_ritual' })
  }
}

}, 60000) // Check every 1 min
}
const ritualDone = localStorage.getItem('ritual_checkin_' + dayjs().format('YYYY-MM-DD'))

if (!ritualDone && dayjs().isAfter(dayjs().endOf('day'))) {
triggerPunishment({ type: 'missed_ritual' })
}