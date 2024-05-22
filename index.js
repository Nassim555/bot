require("dotenv").config();
const { Client } = require("discord.js-selfbot-v13");
const { joinVoiceChannel } = require("@discordjs/voice");

const channel_id = process.env.id;

function joinVc(client) {
  client.on("ready", () => {
    const channel = client.channels.cache.get(channel_id);
    console.log(client.user.username);

    joinVoiceChannel({
      channelId: channel_id,
      guildId: channel.guildId,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
  });
}

const client = new Client({ checkUpdate: false });
joinVc(client);
client.login(process.env.token);
