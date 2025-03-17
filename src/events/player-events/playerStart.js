const { GuildQueueEvent } = require("discord-player");
const { EmbedBuilder } = require("discord.js");
const { hexColors } = require("../../ultility/tools/hexColors");

module.exports = {
  name: GuildQueueEvent.PlayerStart,
  async execute(queue, track) {
    const { channel, finishEvent, memberName } = queue.metadata;
    // If the flags not raised then raised the flags
    if (!finishEvent) {
      queue.metadata = {
        ...queue.metadata,
        finishEvent: true,
      };
    }

    const embed = new EmbedBuilder()
      .setColor(hexColors.lightBlue)
      .setTitle(`🎶 Now Playing: ${track.title}`)
      .setURL(track.url)
      .setAuthor({ name: track.author, iconURL: track.thumbnail })
      .setDescription(track.description || "No description available.")
      .setThumbnail(track.thumbnail)
      .addFields(
        { name: "⏳ Duration", value: track.duration, inline: true },
        { name: "Added by", value: `${memberName}` }
      )
      .setFooter({ text: "Enjoy your music! 🎧" });

    await channel.send({ embeds: [embed] });
  },
};
