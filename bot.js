import { Client, GatewayIntentBits } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//console.log(process.env.token);
const env = JSON.parse(process.env.TOKEN);
client.on("ready", () => {
  const channel = client.channels.cache.get(env.channel_id);
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });
  console.log("ready");
});

client.login(env.token);
