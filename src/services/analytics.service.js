import User from "../../../backend/models/User.model.js";
// import { sendMessageInDiscordChannel } from "../utils/discord-server.utils.js";
import api from "./api.js";

export const leaderboardUsersSrv = () => api.get(`/analytics/leaderboard`, { withCredentials: true });
export const leaderboardUsersCronSrvSendDC = async () => {
  const dcembedsuserlist = [""];
  let payload = {
    content: "",
    embeds: [
      {
        author: {
          name: "Jathedar",
          url: "https://jathedar.vercel.app/",
          // icon_url: "https://jathedar.vercel.app/logo.png",
        },
        title: "Weekly Leaderboard",
        // "url": "https://google.com/",
        description: "",
        color: 0xffd700,

        // thumbnail: {
        //     url: "https://jathedar.vercel.app/logo.png",
        //   },
        //   image: {
        //     url: "https://media1.tenor.com/m/hhaHukGx8UkAAAAd/nadda-jp-nadda.gif",
        //   },
        footer: {
          text: "Our top performers this week 🙌 ",
          // icon_url: "https://jathedar.vercel.app/logo.png",
        },
      },
    ],
  };
  const leaderboardUsers = await User.find().sort({ points: -1 }).limit(10);
  leaderboardUsers.map((item, idx) => {
    let medal = "";
    switch (idx) {
      case 0:
        medal = "🥇";
        break;

      case 1:
        medal = "🥈";
        break;

      case 2:
        medal = "🥉";

        break;

      default:
        medal = '⚡️';
        break;
    }

    dcembedsuserlist.push(`${medal} ${item.points} - **${item.name}**  `);
  });
  payload.embeds[0].description = dcembedsuserlist.toString().replaceAll(",", "\n- ") + "\n@everyone";

  // sendMessageInDiscordChannel("1412432577595183244", payload);
};
