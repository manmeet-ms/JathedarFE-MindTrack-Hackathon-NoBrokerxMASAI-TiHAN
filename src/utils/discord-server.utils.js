// import { Client, GatewayIntentBits } from "discord.js";
// import "dotenv/config";

// export const client = new Client({
//   intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
// });

// const discordBotToken = process.env.DISCORD_JATHEDAR_BOT_TOKEN;

// if (!discordBotToken) {
//   console.error("❌ Discord bot token missing! Check your .env file.");
//   process.exit(1);
// }

// client.once("ready", () => {
//   console.log(`✅ Logged in as ${client.user.tag}`);
// });

// client.login(discordBotToken);

// export async function sendMessageInDiscordChannel(channelId, payload) {
//   try {
//     const channel = await client.channels.fetch(channelId);

//     if (!channel) {
//       console.error("❌ Channel not found:", channelId);
//       return;
//     }

//     await channel.send(payload);
//     // console.log(`📨 Sent message to channel ${channelId}`);
//   } catch (err) {
//     console.error("Error sending message:", err);
//   }
// }
 