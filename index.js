import "dotenv/config";
import { Client } from "discord.js-selfbot-v13";
import { joinVoiceChannel } from "@discordjs/voice";
import yn from "yn";
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

    let voiceConnection = joinVoiceChannel({
      channelId: channelId,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfMute,
      selfDeaf,
    });

    const stateHandler = (old_state, new_state) => {
      console.log(old_state.status, new_state.status);
      if (new_state.status === "ready") {
        console.log(
          `${client.user.username} has successfully connected to ${channel.name} on ${guild.name} server`,
        );
      }
      if (new_state.status === "disconnected") {
        console.log(
          `${client.user.username} has disconnected from ${channel.name} vc on ${guild.name} server`,
        );
      }
      if (
        !voiceState ||
        !voiceState.channelId ||
        new_state.status === "disconnected"
      ) {
        voiceConnection = joinVoiceChannel({
          channelId: channelId,
          guildId: guild.id,
          adapterCreator: guild.voiceAdapterCreator,
          selfMute,
          selfDeaf,
        });
      }
    };

    const errorHandler = (err) => {
      console.error("Voice connection error:", err);
    };
    voiceConnection.on("stateChange", (old_state, new_state) =>
      stateHandler(old_state, new_state),
    );

    voiceConnection.on("error", (err) => errorHandler(err));
  } catch (error) {
    console.error("Join vc function error:", error);
  }
}
const client = new Client({ checkUpdate: false });

client.once("ready", () => {
  console.log(client.user.username, "is ready");
  joinVc(client);
});

client.login(token);
