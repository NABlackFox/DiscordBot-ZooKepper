const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
const { hexColors } = require("../../ultility/tools/hexColors");

module.exports = {
  isPlayer: true,
  // Define the play command
  data: new SlashCommandBuilder()
    .setName("voteskip") // Command name
    .setDescription("Skip the current song"),

  async execute(interaction) {
    // Get the queue

    let minVoteCount = interaction.member.voice.channel.members.size;
    let currVoteCount = 0;

    const queue = useQueue();

    if (!queue) {
      const embed = new EmbedBuilder()
        .setColor(hexColors.gold)
        .setTitle("Queue Info")
        .setDescription("The server does not have active player!");
      return interaction.reply({ embeds: [embed] });
    }

    if (!queue.isPlaying()) {
      const embed = new EmbedBuilder()
        .setColor(hexColors.gold)
        .setTitle("Queue Info")
        .setDescription("There is no playing track!");
      return interaction.reply({ embeds: [embed] });
    }

    // send the message
    const embed = new EmbedBuilder()
      .setColor(hexColors.gold)
      .setTitle("Queue Info")
      .setThumbnail(currentTrack.thumbnail)
      .addFields({
        name: `⏯ Skipping: ${skipAmount} tracks`,
        value: `${currentTrack.title} ➡️ ${skipToTrack.title} `,
        inline: true,
      });

    interaction.reply({ embeds: [embed] });
  },
};
