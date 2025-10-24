import api from "./api.js";

export const gTailscaleDevicesSrv = async () => {
  return await api.get("/external/tailscale/devices");
};
export const gDiscordThreadMessagesSrv = async (threadId) => {
  return await api.get(`/external/discord/thread/${threadId}`) ;
};
export const gDiscordChannelMessagesSrv = async (channelId) => {
  return await api.get(`/external/discord/channel/${channelId}`) ;
};
export const gDiscordSingleMessageSrv = async (channelId, messageId) => {
  return await api.get(`/external/discord/channel/${channelId}/message/${messageId}`) ;
};
export const gDollarRateSrv = async () => {
  return await api.get("/external/dollar-rate");
};

// import api from "./api.js";

// const token = import.meta.env.VITE_DISCORD_BOT_TOKEN;
// // const token = process.env.VITE_DISCORD_BOT_TOKEN;
// const baseUrl = "https://discord.com/api/v10";

// export const gTailscaleDevicesService = async  () => {
//   await api.get("/e/tailscale/devices");
// };

// export const gDiscordThreadMessagesSrv = async (threadId) => {
//   try {
//     const result = await axios.get(`${baseUrl}/channels/${threadId}/messages`, {
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*",
//         Authorization: `Bot ${token}`,
//       },
//     });
//     logger("log",result.data);
//     return result.data;
//   } catch (error) {
//     console.error(error.message);
//     return error;
//   }
// };
// export const gDiscordSingleMessageSrv = async (req, res) => {
//   try {
//     res.send("result.data");
//   } catch (error) {
//     logger("error",error);
//   }
// };
// export const gDiscordChannelMessagesSrv = async (req, res) => {
//   try {
//     res.send("result.data");
//   } catch (error) {
//     logger("error",error);
//   }
// };

// export const gDollarRateService = async  () => {
//   await api.get("/e/dollar-rate");
// };

// // backend/utils/discordWebhook.js
// import axios from 'axios';

// // const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL || process.env.VITE_DISCORD_WEBHOOK_URL;
// // const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1398373872822259804/a1Pw-Q_uNJzUGtnYNVIOIu6lJKZmrTAYQmSSq8ThRupDXny_MNdl3VYvWsyTyE2_buAF";
// const KNOWLEDGEBASE_SERVER_NOTIFICATIONS_CHANNEL=1148275606635696208
// const webHookUrl="https://discord.com/api/webhooks/1398373872822259804/a1Pw-Q_uNJzUGtnYNVIOIu6lJKZmrTAYQmSSq8ThRupDXny_MNdl3VYvWsyTyE2_buAF"
// export const sendViolationToDiscord = async (message) => {
//   if (!webHookUrl) {
//     console.warn("webHookUrl not set");
//     return;
//   }

//   try {
//     await axios.post(webHookUrl, {
//       content: message,
//        "embeds": [
//     {
//       "author": {
//         "name": "Birdie♫",
//         "url": "https://www.reddit.com/r/cats/",
//         "icon_url": "https://i.imgur.com/R66g1Pe.jpg"
//       },
//       "title": "Title",
//       "url": "https://google.com/",
//       "description": "Text message. You can use Markdown here. *Italic* **bold** __underline__ ~~strikeout~~ [hyperlink](https://google.com) `code`",
//       "color": 15258703,
//       "fields": [
//         {
//           "name": "Text",
//           "value": "More text",
//           "inline": true
//         },
//         {
//           "name": "Even more text",
//           "value": "Yup",
//           "inline": true
//         },
//         {
//           "name": "Use `\"inline\": true` parameter, if you want to display fields in the same line.",
//           "value": "okay..."
//         },
//         {
//           "name": "Thanks!",
//           "value": "You're welcome :wink:"
//         }
//       ],
//       "thumbnail": {
//         "url": "https://upload.wikimedia.org/wikipedia/commons/3/38/4-Nature-Wallpapers-2014-1_ukaavUI.jpg"
//       },
//       "image": {
//         "url": "https://upload.wikimedia.org/wikipedia/commons/5/5a/A_picture_from_China_every_day_108.jpg"
//       },
//       "footer": {
//         "text": "Woah! So cool! :smirk:",
//         "icon_url": "https://i.imgur.com/fKL31aD.jpg"
//       }
//     }]
//     });
//   } catch (err) {
//     console.error("Failed to send Discord webhook:", err.message);
//   }
// };
