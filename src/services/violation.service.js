import axios from "axios";

import Violation from "../../../backend/models/Violation.model.js";
import { APP_NAME } from "../../shared/appVariables.shared.js";

 ;
// import { sendViolationToDiscord } from "../utils/discord-webhook.utils.js";
import User from "../../../backend/models/User.model.js";
import { getRandomTaunt } from "../utils/taunts.utils.js";
import api from "./api.js";

export const logViolationSrv = (type) => api.post("/violations/log", { type }, {withCredentials:true});

export const createViolationMessageService = async (userId, type = "missed_block",block ) => {
  const taunt = getRandomTaunt();
  try {
    const currentUser=await User.find({_id:userId})
    // console.log(currentUser[0].name);
    
    const violation = await Violation.create({
      uid:userId,
      type,
      timeBlock: block._id,
      tauntStatement: taunt,
      timestamp: new Date(),
      blockData: { ...block },
    });
// applyPointsSrv("BLOCK_MISS_PENALTY")
    //    TODO  create discord embeds and then send to
    const message = `⚠ ${currentUser[0].name} failed "${block.task}" scheduled at ${block.startTime} – ${block.endTime}\nViolation type: \`${violation.type}\``;
    const payload = {
      title: taunt,
      body: `⚠️ ${currentUser[0].name} failed "${block.task}" scheduled at ${block.startTime} – ${block.endTime}.`,
      sound: "/assets/nottifs/audio/roadrunner.mp3",
      icon: "/assets/pwa-icons/icons/icon-128x128.png",
      badge: "/assets/pwa-icons/icons/icon-48x48.png",
      vibrate: [200, 100, 200],
      // image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0eLihAg88tN1BUcMLgZGrrlgu--IhyFhHts-ptDD4dRyLwCyBMKVT-G9yp4HAF9-1IBM&usqp=CAU",
      actions: [
        {
          action: "coffee-action",
          type: "button",
          title: "Buy",
        },
        {
          action: "doughnut-action",
          type: "button",
          // type: 'text',
          title: "Drop",
        },
      ],
    };
    api.post(`/notifications/trigger`, payload);
    const webHookUrl = process.env.VITE_DISCORD_WEBHOOK_URL;

    if (!webHookUrl) {
      console.warn("webHookUrl not set");
      return;
    }

  await axios.post(webHookUrl, {
      content: message,
      // embeds: [
      //   {
      //     author: {
      //       name: APP_NAME,
      //       url: "https://jathedar.vercel.app/",
      //       icon_url: "https://jathedar.vercel.app/logo.png",
      //     },
      //     title: "Violation Detected: " + violation.type,
      //     // "url": "https://google.com/",
      //     description: message.replace("⚠️", "") + `\n\`\`\`${violation._id}\`\`\``,
      //     color: 0xff0000,
      //     // "fields": [
      //     //   {
      //     //     "name": "Text",
      //     //     "value": "More text",
      //     //     "inline": true
      //     //   },
      //     //   {
      //     //     "name": "Even more text",
      //     //     "value": "Yup",
      //     //     "inline": true
      //     //   },
      //     //   {
      //     //     "name": "Use `\"inline\": true` parameter, if you want to display fields in the same line.",
      //     //     "value": "okay..."
      //     //   },
      //     //   {
      //     //     "name": "Thanks!",
      //     //     "value": "You're welcome :wink:"
      //     //   }
      //     // ],
      //     thumbnail: {
      //       url: "https://jathedar.vercel.app/logo.png",
      //     },
      //     image: {
      //       url: "https://media1.tenor.com/m/hhaHukGx8UkAAAAd/nadda-jp-nadda.gif",
      //     },
      //     footer: {
      //       text: "Woah! Keep up the great work! 😏 " + taunt,
      //       icon_url: "https://jathedar.vercel.app/logo.png",
      //     },
      //   },
      // ],
    });
    console.log( "Violation + Taunt sent:", message);
    return violation;
  } catch (error) {
    console.log( error);
  }
};

export const getViolations = () => api.get("/violations");
export const getTodayViolationsSrv = () => api.get("/violations/today");

export const resolveViolationSrv = (id) => api.post(`/violations/${id}/resolve`);
export const flushViolations = () => api.post("/violations/flush");
