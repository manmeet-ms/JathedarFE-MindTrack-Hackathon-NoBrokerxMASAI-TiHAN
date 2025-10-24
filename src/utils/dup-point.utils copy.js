// utils/pointsService.js

export const EVENT_POINTS = {
  TIMEBLOCK_COMPLETE_CREDIT: 20, // ✅
  ALL_DAILY_COMPLETE_CREDIT: 100,
  VIOLATION_RESOLVED_CREDIT: 20,
  DIARY_WRITING_CREDIT: 5,
  RITUAL_CREATED_CREDIT: 5,
  RITUAL_COMPLETE_CREDIT: 10,
  URGE_LOGGED_CREDIT: 10,
  URGE_RESISTED_CREDIT: 50,
  MOOD_LOGGED_CREDIT: 5,
  MOOD_IMPROVEMENT_CREDIT: 5,
  NEW_STREAK_CREDIT: 50,
  EXTEND_STREAK_CREDIT: 10,

  RITUAL_MISS_PENALTY: -10,
  URGE_FAILURE_PENALTY: -100,
  BLOCK_MISS_PENALTY: -40, // ✅
  STREAK_BREAK_PENALTY: -100,
  VIOLATION_PENALTY: -50, // ✅
  TIMER_RESET_PENALTY: -200, // ✅
  PUNISHMENT_TRIGGER_PENALTY: -30,
  DEFAULT: 0,
};
export const RANK_TABLE = [
  {
    rankId: 0,
    name: "Novice",
    minPoints: 1,
    emoji: "🌱",
    icon: "Sprout",
    color: "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30",
    ring: "ring-emerald-500/30",
  },
  {
    rankId: 1,
    name: "Disciple",
    minPoints: 500,
    emoji: "📘",
    icon: "BookOpenCheck",
    color: "bg-sky-500/15 text-sky-500 border border-sky-500/30",
    ring: "ring-sky-500/30",
  },
  {
    rankId: 2,
    name: "Apprentice",
    minPoints: 900,
    emoji: "🛠️",
    icon: "Wrench",
    color: "bg-blue-500/15 text-blue-500 border border-blue-500/30",
    ring: "ring-blue-500/30",
  },
  {
    rankId: 3,
    name: "Focused Worker",
    minPoints: 1300,
    emoji: "🎯",
    icon: "Target",
    color: "bg-indigo-500/15 text-indigo-500 border border-indigo-500/30",
    ring: "ring-indigo-500/30",
  },
  {
    rankId: 4,
    name: "Discipline Knight",
    minPoints: 2000,
    emoji: "🛡️",
    icon: "ShieldCheck",
    color: "bg-violet-500/15 text-violet-500 border border-violet-500/30",
    ring: "ring-violet-500/30",
  },
  {
    rankId: 5,
    name: "Self-Controller",
    minPoints: 3200,
    emoji: "🧠",
    icon: "Brain",
    color: "bg-fuchsia-500/15 text-fuchsia-500 border border-fuchsia-500/30",
    ring: "ring-fuchsia-500/30",
  },
  {
    rankId: 6,
    name: "Iron-Willed",
    minPoints: 5200,
    emoji: "🏋️",
    icon: "Dumbbell",
    color: "bg-amber-500/15 text-amber-600 border border-amber-500/30",
    ring: "ring-amber-500/30",
  },
  {
    rankId: 7,
    name: "Relentless",
    minPoints: 8200,
    emoji: "🔥",
    icon: "Flame",
    color: "bg-orange-500/15 text-orange-500 border border-orange-500/30",
    ring: "ring-orange-500/30",
  },
  {
    rankId: 8,
    name: "Discipline Master",
    minPoints: 13000,
    emoji: "👑",
    icon: "Crown",
    color: "bg-rose-500/15 text-rose-500 border border-rose-500/30",
    ring: "ring-rose-500/30",
  },
  {
    rankId: 9,
    name: "Ascendant",
    minPoints: 20000,
    emoji: "🚀",
    icon: "Rocket",
    color: "bg-slate-900 text-slate-100 border border-slate-800 dark:bg-slate-100 dark:text-slate-900",
    ring: "ring-slate-400/20",
  },
];

export function getRankUtils(userAvailablePoints) {
  let  currentRank = RANK_TABLE[0];
   let nextRank = RANK_TABLE[1];
  console.log("\n|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|");

  if (userAvailablePoints >= 0) {
    for (let i = 0; i < RANK_TABLE.length; i++) {
      currentRank = RANK_TABLE[i];

      if (userAvailablePoints > currentRank.minPoints) {
        currentRank = RANK_TABLE[i];
        currentRank.rankId !== RANK_TABLE.length ? (nextRank = RANK_TABLE[i + 1]) : (nextRank = RANK_TABLE[i]);

        console.log(currentRank.rankId,RANK_TABLE.length,currentRank.rankId !== RANK_TABLE.length);

        console.log(`#${i}`, "uP:", userAvailablePoints, "cR=", currentRank?.name, currentRank?.minPoints, "nX>", nextRank?.name, nextRank?.minPoints, (userAvailablePoints > currentRank?.minPoints)?"T":"F");

        // break;
      }
    }
  }  

  const percentageCompletiontowardsNextRank = (Math.abs(nextRank?.minPoints - userAvailablePoints) / nextRank?.minPoints) * 100;
  const ptsToNxr = Math.abs(nextRank?.minPoints-userAvailablePoints);
  console.log(
    "uP:",
    userAvailablePoints,
    "cR=",
    currentRank?.name,
    currentRank?.minPoints,
    "nX>",
    nextRank?.name,
    nextRank?.minPoints
    , `${percentageCompletiontowardsNextRank.toFixed(0)}%`,ptsToNxr
  );
  // console.log("\nx-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x\n");
  return (currentRank, nextRank);
  // for (let rank of RANK_TABLE) {
  //   // console.log(rank);

  //   if (userAvailablePoints > rank.minPoints) currentRank = rank;
  //   else break;
  // }
}
// getRankUtils(3500);
getRankUtils(1 + 3);
getRankUtils(500 + 3);
getRankUtils(900 + 3);
getRankUtils(1300 + 3);
getRankUtils(2000 + 3);
getRankUtils(3200 + 3);
getRankUtils(5200 + 3);
getRankUtils(8200 + 3);
getRankUtils(13000 + 3);
getRankUtils(20000 + 3);
getRankUtils(1 - 10);
getRankUtils(-3500);
getRankUtils(-35000);
getRankUtils(500 - 10);
getRankUtils(900 - 10);
getRankUtils(1300 - 10);
getRankUtils(2000 - 10);
getRankUtils(3200 - 10);
getRankUtils(5200 - 10);
getRankUtils(8200 - 10);
getRankUtils(13000 - 10);
getRankUtils(20000 - 10);
// export async function applyPointsUtils(userId, userAvailablePoints, eventKey) {
//   if (!EVENT_POINTS[eventKey]) throw new Error(`Unknown event: ${eventKey}`);
//   console.log(`userId ${userId}, userAvailablePoints ${userAvailablePoints}, EVENT_POINTS[eventKey] ${EVENT_POINTS[eventKey]}`);
//   //  await PointsTransaction.create({
//   //   uid: userId,
//   //   type: eventKey,
//   //   points: EVENT_POINTS[eventKey],
//   //   balanceAfter: userAvailablePoints+EVENT_POINTS[eventKey],
//   // });
// //    try {
// //        const payload = {
// //         title: `Check you laptop`,
// //         body: "If it is idle or charging from a long",
// //         vibrate: [200, 100, 200],
// //         icon: "/assets/pwa-icons/icons/icon-128x128.png",
// //         badge: "/assets/pwa-icons/icons/icon-48x48.png",

// //       };
// //    await api.post('/notifications/trigger', payload);

// //    } catch (error) {
// // console.log(error);

// //    }
//   return userAvailablePoints + EVENT_POINTS[eventKey];
// }
