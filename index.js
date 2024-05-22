require("dotenv").config();
const { Client } = require("discord.js-selfbot-v13");
const { joinVoiceChannel } = require("@discordjs/voice");
const keep_alive = require("./keep-alive.js")
const info = JSON.parse(process.env.token);
const channel_id = info.id;
function joinVc(client) {
  client.on("ready", () => {
    const channel = client.channels.cache.get(channel_id);
    console.log(client.user.username);

    joinVoiceChannel({
      channelId: channel_id,
      guildId: channel.guildId,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfMute: true,
      selfDeaf: false,
    });
  });
}

const client = new Client({ checkUpdate: false });
joinVc(client);
client.login(info.token);
