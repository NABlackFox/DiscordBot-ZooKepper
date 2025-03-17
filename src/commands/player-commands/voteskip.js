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
    const queue = useQueue();

    const minVoteCount = interaction.member.voice.channel.members.size;

    const skipToTrack = queue.tracks.data[0];
    const currentTrack = useQueue().currentTrack;
    const queueSize = queue.tracks.data.length;

    const { memberid, voteCount } = queue.metadata;

    function displayEmbeddedMessage() {
      const embed = new EmbedBuilder()
        .setColor(hexColors.gold)
        .setTitle("Queue Info")
        .setThumbnail(currentTrack.thumbnail)
        .addFields({
          name: `⏯ Skipping: ${currentTrack.title}`,
          value: `${currentTrack.title} ➡️ ${
            skipToTrack ? skipToTrack.title : "End of track"
          }`,
          inline: true,
        });

      interaction.reply({ embeds: [embed] });
    }

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

    // Can't skip last song
    if (queueSize == 1) {
      const embed = new EmbedBuilder()
        .setColor(hexColors.gold)
        .setTitle("Queue Info")
        .addFields({
          value: "You can't skip the last song >:(",
          inline: true,
        });

      return interaction.reply({ embeds: [embed] });
    }

    // If the owner of the song use the skip command
    // it will force skip
    if (memberid == interaction.member.user.id) {
      queue.metadata = {
        ...queue.metadata,
        finishEvent: false,
      };
      queue.node.skip();
      displayEmbeddedMessage();
      return;
    }

    // Set the flags to prevent finish event to emit
    queue.metadata = {
      ...queue.metadata,
      finishEvent: false,
      voteCount: voteCount + 1,
    };

    const embed = new EmbedBuilder()
      .setColor(hexColors.gold)
      .setTitle("Vote skip started")
      .setAuthor({
        name: `${interaction.member.user.globalName} wants to skip`,
      })
      .addFields({
        name: `⏯ Skipping: ${currentTrack.title}`,
        value: `${voteCount} out of ${minVoteCount}`,
        inline: true,
      });

    interaction.reply({ embeds: [embed] });

    if (voteCount == minVoteCount) {
      queue.node.skip();
      displayEmbeddedMessage();
    }
  },
};
