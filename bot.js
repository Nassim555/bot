import { Client, GatewayIntentBits } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(
  "MTA0NDcwMTYzMDg5NDk2NDg1Ng.G34ZkA.NEwIK64Pu0GZyylJFn2Cl5Mya-c8wJ2MSsXGK4",
);
client.on("ready", async () => {
  const channel = await client.channels.cache.get("1171082008131276892");
  const connection = joinVoiceChannel({
    channelId: "1171082008131276892",
    guildId: "861924870220152832",
    adapterCreator: channel.guild.voiceAdapterCreator,
  });
  console.log("ready to rock", channel);
});
