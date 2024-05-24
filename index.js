import "dotenv/config";
import { Client } from "discord.js-selfbot-v13";
import { joinVoiceChannel } from "@discordjs/voice";
import yn from "yn";
import "./keep_alive.js"
const token = process.env.TOKEN;
const channelId = process.env.VC_ID;
const selfMute = yn(process.env.SELF_MUTE, { default: false });
const selfDeaf = yn(process.env.SELF_DEAF, { default: false });

function joinVc(client) {
  try {
    const channel = client.channels.cache.get(channelId);
    const guild = channel.guild;
    const member = guild.members.cache.get(client.user.id);

    if (!channel) {
      console.error(`Invalid channel id : ${channel.id}`);
      return;
    }

    if (channel.type !== "GUILD_VOICE") {
      console.error(`${channel.name} is not a vocie channel`);
      return;
    }

    if (!member) {
      console.error(
        `${client.user.username} is not a member of ${guild.name} server!`,
      );
      return;
    }
    const voiceState = guild.voiceStates.cache.get(member.id);

    if (!voiceState || voiceState.channelId !== channel.id) {
      const voiceConnection = joinVoiceChannel({
        channelId: channelId,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfMute,
        selfDeaf,
      });

      voiceConnection.once("stateChange", (old_state, new_state) => {
        if (new_state.status === "ready") {
          console.log(
            `${client.user.username} has successfully connected to ${channel.name} on ${guild.name} server`,
          );
          if (new_state.status === "disconnected") {
            console.log(
              `${client.user.username} has disconnected from ${channel.name} vc on ${guild.name} server`,
            );
          }
        }
      });

      voiceConnection.once("error", (err) => {
        console.error("Voice connection error:", err);
      });
    }
  } catch (error) {
    console.error("Join vc function error:", error);
  }
}
const client = new Client({ checkUpdate: false });

client.once("ready", () => {
  console.log(client.user.username, "is ready");
  joinVc(client);
  setInterval(joinVc, 5000, client);
});
client.login(token);
