// TODO: implement it 
import { Howl } from 'howler'

let alarmSound

export const playAlarm = () => {
alarmSound = new Howl({
src: ['/assets/audio/alarm.mp3'],
loop: true,
volume: 1.0,
})
alarmSound.play()
}

export const stopAlarm = () => {
if (alarmSound) {
alarmSound.stop()
}
}