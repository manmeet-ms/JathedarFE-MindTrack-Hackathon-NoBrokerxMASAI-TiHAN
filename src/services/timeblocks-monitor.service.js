// import dayjs from 'dayjs';

// import TimeBlock from '../../../backend/models/timeblock.model.js';
// import Violation from '../../../backend/models/violation.model.js';

// export async function checkMissedTimeblocks() {
// const now = dayjs().format("HH:mm");
// const today = dayjs().format("YYYY-MM-DD");

// const blocks = await TimeBlock.find({
// date: today,
// completed: false,
// endTime: { $lt: now }
// });

// for (const block of blocks) {
// // already punished? skip
// if (block.violationLogged) continue;

// logger("log",`Missed block detected: ${block.task}`);

// // Example: log a violation
// await Violation.create({
//   timeblockId: block._id,
//   timestamp: new Date(),
//   type: 'missed_block',
// });

// // mark it so we don’t re-trigger
// await TimeBlock.findByIdAndUpdate(block._id, { violationLogged: true });

// }
// }