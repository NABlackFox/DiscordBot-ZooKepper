const { SlashCommandBuilder, EmbedBuilder, Collection } = require("discord.js");
const { useQueue } = require("discord-player");
const { hexColors } = require("../../ultility/tools/hexColors");

let votedMembersCollection = new Collection();

module.exports = {
  isPlayer: true,
  // Define the play command
  data: new SlashCommandBuilder()
    .setName("voteskip") // Command name
    .setDescription("Skip the current song"),

  async execute(interaction) {
    // Get the queue
    const queue = useQueue();

    // Only half need to agree
    const minVoteCount = Math.ceil(
      interaction.member.voice.channel.members.size / 2
    );

    const memberid = interaction.member.user.id;
    const memberName = interaction.member.user.globalName;

    const voiceChannel = interaction.member.voice.channel;

    let votedMemberId = votedMembersCollection.get(interaction.guildId);
    if (!votedMemberId) {
      votedMembersCollection.set(interaction.guildId, new Set());
      votedMemberId = votedMembersCollection.get(interaction.guildId);
    }

    if (votedMemberId.has(memberid)) {
      return interaction.reply("You already voted!");
    }

    votedMemberId.add(memberid);

    totalVoteCount = votedMemberId.size;

    if (!voiceChannel) {
      return interaction.editReply(
        "You need to be in a voice channel to play music!"
      );
    }

    if (
      interaction.guild.members.me.voice.channel &&
      interaction.guild.members.me.voice.channel !== voiceChannel
    ) {
      return interaction.editReply("Can't skip someone else's song!");
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

    const skipToTrack = queue.tracks.data[0];
    const currentTrack = queue.currentTrack;
    const queueSize = queue.tracks.data.length;

    const embed = new EmbedBuilder()
      .setColor(hexColors.gold)
      .setTitle("Queue Info")
      .setThumbnail(currentTrack.thumbnail)
      .addFields({
        name: `⏯ Skipping: ${currentTrack.title}`,
        value: `${currentTrack.title} ➡️ ${
          skipToTrack ? skipToTrack.title : "End of track"
        }`,
        name: "Voted started by",
        value: `${memberName}`,
        value: `${totalVoteCount} out of ${minVoteCount}`,
        inline: true,
      });

    interaction.reply({ embeds: [embed] });

    // // Can't skip last song
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

    // // Set the flags to prevent finish event to emit
    queue.metadata = {
      ...queue.metadata,
      finishEvent: false,
    };

    if (totalVoteCount == minVoteCount) {
      queue.node.skip();
      votedMemberId.clear();
    }
  },
};
