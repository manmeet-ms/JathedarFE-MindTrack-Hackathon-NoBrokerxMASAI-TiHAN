import axios from "axios";
import dayjs from "dayjs";

import TimeBlock from "../../../backend/models/Timeblock.model.js";
import User from "../../../backend/models/User.model.js";
import Violation from "../../../backend/models/Violation.model.js";
import logger from "../../../backend/utils/logger.utils.js";
import { playAlarm } from "../utils/punishment.utils.js";
import { applyPointsSrv } from "./points.service.js";
import { createViolationMessageService } from "./violation.service.js";

export const checkMissedTimeblocks = async () => {
  // logger("info", "checkMissedTimeblocks i Am being called ")
  const now = dayjs();
  const today = now.format("YYYY-MM-DD");
  const currentTime = now.format("HH:mm");
  logger("info", "today", today);

  // ✅ Get all users
  const users = await User.find();
  // logger("info", "users.length", users.length);

  for (const user of users) {
 
    const missedBlocks = await TimeBlock.find({
      uid: user._id,
      date: today,
      completed: false,
      strict: true,
      endTime: { $lt: currentTime },
    });

    logger("log", `User ${user._id} missedBlocks:`, missedBlocks.length);
    for (const block of missedBlocks) {
      const alreadyViolated = await Violation.exists({ timeBlock: block._id });
      if (alreadyViolated) continue;

      // ✅ pass user._id explicitly
      await createViolationMessageService(user._id, "missed_block", block);
      applyPointsSrv(user._id, "BLOCK_MISS_PENALTY");
      logger("log", user._id, user.name);

      logger("log", `⛔ Auto violation logged for user:${user._id} block:${block.task}`);
    }
  }
};

export const checkForPunishments = async () => {
  const res = await axios.get("/api/violations");
  const unresolved = res.data.filter((v) => !v.resolved);

  if (unresolved.length > 0) {
    triggerPunishment(unresolved[0]);
  }
};

export const acknowledgePunishment = async (violationId) => {
  await axios.post(`/api/violations/${violationId}/resolve`);
};

export const triggerPunishment = (violation) => {
  // Play alarm
  playAlarm();

  // Show fullscreen modal
  const event = new CustomEvent("PUNISHMENT_TRIGGER", { detail: violation });
  window.dispatchEvent(event);
};

// checkMissedRitual

// STREAK_BREAK_PENALTY
// VIOLATION_PENALTY
// TIMER_RESET_PENALTY
// PUNISHMENT_TRIGGER_PENALTY
