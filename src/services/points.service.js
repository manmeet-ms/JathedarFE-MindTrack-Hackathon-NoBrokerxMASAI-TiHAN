import api from "./api.js";

export const applyPointsSrv = (eventKeyString) => api.post(`/points/apply`, { event: eventKeyString }, { withCredentials: true });

export const getPointsLedgerSrv = () => api.get("/points/ledger", { withCredentials: true });

// export const applyPointsSrv  = async (uid, eventKeyString) => {
//   const eventPoints = {
//     TIMEBLOCK_COMPLETE_CREDIT: 20, // ✅
//     ALL_DAILY_COMPLETE_CREDIT: 100,
//     NEW_STREAK_CREDIT: 50,
//     EXTEND_STREAK_CREDIT: 10,
//     DIARY_WRITING_CREDIT: 5,
//     RITUAL_COMPLETE_CREDIT: 10,
//     URGE_LOGGED_CREDIT: 10,
//     URGE_RESISTED_CREDIT: 50,
//     MOOD_LOGGED_CREDIT: 5,
//     MOOD_IMPROVEMENT_CREDIT: 5,
//     RITUAL_MISS_PENALTY: -10,
//     URGE_FAILURE_PENALTY: -100,
//     BLOCK_MISS_PENALTY: -40, // ✅
//     STREAK_BREAK_PENALTY: -100,
//     VIOLATION_PENALTY: -50,
//     TIMER_RESET_PENALTY: -60,
//     PUNISHMENT_TRIGGER_PENALTY: -15,
//     DEFAULT: 0,
//   };

//   try {

//     if (!eventPoints.hasOwnProperty(eventKeyString)) {
//       return res.status(400).json({ error: "Invalid event type" });
//     }
//     const userRes = await User.findById(uid);
//     const currentPoints = userRes.points;
//     const finalPoints = currentPoints + eventPoints[eventKeyString];
//     const updatedUserPoints = await User.findByIdAndUpdate(
//       userRes._id,
//       {
//         points: finalPoints,
//       },
//       { new: true }
//     );
//     updatedUserPoints.save();
//     console.log(`User,CurrentPoints,EventKey,EventPoints,FinalPoints
// ${userRes.name},${currentPoints},${eventKey},${eventPoints[eventKey]},${finalPoints}`);
//     await PointsTxn.create({
//       uid: userRes._id,
//       type: eventKey,
//       points: currentPoints,
//       balanceAfter: finalPoints,
//     });
//     res.status(200).json({ points: updatedUserPoints.points });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// TODO: merge these from user controller
// export const TestApplyPointsSrv  = async (req, res) => {
//   const eventArray = ["TIMEBLOCK_COMPLETE_CREDIT", "ALL_DAILY_COMPLETE_CREDIT", "NEW_STREAK_CREDIT", "EXTEND_STREAK_CREDIT", "DIARY_WRITING_CREDIT", "RITUAL_COMPLETE_CREDIT", "URGE_LOGGED_CREDIT", "URGE_RESISTED_CREDIT", "MOOD_LOGGED_CREDIT", "MOOD_IMPROVEMENT_CREDIT", "RITUAL_MISS_PENALTY", "URGE_FAILURE_PENALTY", "BLOCK_MISS_PENALTY", "STREAK_BREAK_PENALTY", "VIOLATION_PENALTY", "TIMER_RESET_PENALTY", "PUNISHMENT_TRIGGER_PENALTY", "DEFAULT"];

//   const eventPoints = {
//     TIMEBLOCK_COMPLETE_CREDIT: 20,
//     ALL_DAILY_COMPLETE_CREDIT: 100,
//     NEW_STREAK_CREDIT: 50,
//     VIOLATION_RESOLVED_CREDIT: 30,
//     EXTEND_STREAK_CREDIT: 10,
//     DIARY_WRITING_CREDIT: 5,
//     RITUAL_COMPLETE_CREDIT: 10,
//     URGE_LOGGED_CREDIT: 10,
//     URGE_RESISTED_CREDIT: 50,
//     MOOD_LOGGED_CREDIT: 5,
//     MOOD_IMPROVEMENT_CREDIT: 5,
//     RITUAL_MISS_PENALTY: -10,
//     URGE_FAILURE_PENALTY: -100,
//     BLOCK_MISS_PENALTY: -40,
//     STREAK_BREAK_PENALTY: -100,
//     VIOLATION_PENALTY: -50,
//     TIMER_RESET_PENALTY: -60,
//     PUNISHMENT_TRIGGER_PENALTY: -15,
//     DEFAULT: 0,
//   };
//   console.log("user,currentPoints,eventKey,eventPoints,finalPoint");

//   try {
//     const { entryLimit } = req.params;
//     const filePath = path.join(process.cwd(), `./backend/logs/${entryLimit}_points_test.csv`);
//     const writeStream = fs.createWriteStream(filePath, { flags: "w" });

//     // CSV header
//     writeStream.write("User,CurrentPoints,EventKey,EventPoints,FinalPoints\n");

//     for (let index = 0; index < entryLimit; index++) {
//       // const {userId}=uid
//       // console.log(uid);
//       const eventKey = eventArray[Math.floor(Math.random() * eventArray.length)];

//       const userRes = await User.findById(uid);
//       const currentPoints = userRes.points;
//       const finalPoints = currentPoints + eventPoints[eventKey];
//       const uupdatedUserPoints = await User.findByIdAndUpdate(userRes._id, {
//         points: finalPoints,
//       });
//       uupdatedUserPoints.save();
//       // console.log("user:", userRes.name, "currentPoints:", currentPoints, "| eventKey:", eventKey, "| eventPoints:", eventPoints[eventKey], "| finalPoint:", finalPoints);
//       writeStream.write(`${userRes.name},${currentPoints},${eventKey},${eventPoints[eventKey]},${finalPoints}\n`);
//       await PointsTxn.create({
//         uid: userRes._id,
//         type: eventKey,
//         points: currentPoints,
//         balanceAfter: finalPoints,
//       });
//     }
//     writeStream.end(); // close file
//     logger("info", "loop exit, CSV written");

//     res.status(200).json("OK");
//   } catch (err) {
//     logger("error", err.message);
//     res.status(400).json({ error: err.message });
//   }
// };

// export const getPointsLedgerSrv  = async (req, res) => {
//   try {
//     const entries = await PointsTxn.find({ uid: uid }).sort();
//     const totalEntries = await PointsTxn.countDocuments();
//     res.status(200).json({ totalEntries, entries });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
