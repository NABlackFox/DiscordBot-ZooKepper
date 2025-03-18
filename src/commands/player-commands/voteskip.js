const { SlashCommandBuilder, EmbedBuilder, Collection, MessageFlags } = require('discord.js');
const { useQueue } = require('discord-player');
const { hexColors } = require('../../ultility/tools/hexColors');

const votedMembersCollection = new Collection();

module.exports = {
	isPlayer: true,
	// Define the play command
	data: new SlashCommandBuilder()
		.setName('voteskip') // Command name
		.setDescription('Skip the current song'),

	async execute(interaction) {
		const voiceChannel = interaction.member.voice.channel;

		// If not in voice channel
		if (!voiceChannel) {
			return interaction.reply({ content: 'You need to be in a voice channel to skip!', flags: MessageFlags.Ephemeral });
		}

		// If not in the same voice channel as bot
		if (interaction.guild.members.me.voice.channel &&
        interaction.guild.members.me.voice.channel !== voiceChannel) {
			return interaction.reply({ content: 'You need to be in the current playing voice channel to skip!', flags: MessageFlags.Ephemeral });
		}

		const queue = useQueue();

		// If there is no active section
		if (!queue) {
			const embed = new EmbedBuilder()
				.setColor(hexColors.gold)
				.setTitle('Queue Info')
				.setDescription('The server does not have active player!');
			return interaction.reply({ embeds: [embed] });
		}

		// If the queue is empty
		if (!queue.isPlaying()) {
			const embed = new EmbedBuilder()
				.setColor(hexColors.gold)
				.setTitle('Queue Info')
				.setDescription('There is no playing track!');
			return interaction.reply({ embeds: [embed] });
		}

		// Get minimum vote so skip
		const minVoteCount = Math.ceil(
			interaction.member.voice.channel.members.size / 2,
		);

		const memberid = interaction.member.user.id;
		const memberName = interaction.member.user.globalName;

		let votedMemberIds = votedMembersCollection.get(interaction.guildId);

		// If there is no set of voted member ids for current guild
		if (!votedMemberIds) {
			votedMembersCollection.set(interaction.guildId, new Set());
			votedMemberIds = votedMembersCollection.get(interaction.guildId);
		}

		// If the member is already voted
		if (votedMemberIds.has(memberid)) {
			return interaction.reply({ content: 'You already voted!', flags: MessageFlags.Ephemeral });
		}

		// Add the member id to the set
		votedMemberIds.add(memberid);

		// Get the current vote
		totalVoteCount = votedMemberIds.size;

		// If not enough vote then return to wait
		if (totalVoteCount < minVoteCount) {
			return;
		}

		const queueSize = queue.tracks.data.length;
		const skipToTrack = queue.tracks.data[0]; // the next track object
		const currentTrack = queue.currentTrack;

		const embed = new EmbedBuilder()
			.setColor(hexColors.gold)
			.setTitle('Queue Info')
			.setThumbnail(currentTrack.thumbnail)
			.addFields(
				{
					name: `⏯ Skipping: ${currentTrack.title}`,
					value: `${currentTrack.title} ➡️ ${skipToTrack ? skipToTrack.title : 'End of track'}`,
				},
				{
					name: 'Vote started by',
					value: `${memberName}`,
					inline: true,
				},
				{
					name: 'Votes',
					value: `${totalVoteCount} out of ${minVoteCount}`,
					inline: true,
				},
			);

		if (queueSize == 0) {
			queue.node.stop();
			votedMemberIds.clear(); // Clear the voted member ids set
		  return interaction.reply({ embeds: [embed] });
		}

		// Set the flags to prevent finish event to emit
		queue.metadata = {
			...queue.metadata,
			finishEvent: false,
		};

		queue.node.skip(); // Skip track
		votedMemberIds.clear(); // Clear the voted member ids set

		interaction.reply({ embeds: [embed] });
	},
};
