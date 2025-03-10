const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { hexColors } = require('../../ultility/tools/hexColors');

module.exports = {
	isPlayer: true,
	// Define the play command
	data: new SlashCommandBuilder()
		.setName('skip') // Command name
		.setDescription('Skip the current song')
		.addIntegerOption(option => option.setName('amount').setDescription('amount of tracks want to skip').setMinValue(1)),

	async execute(interaction) {
		// Get the queue
		const queue = useQueue();

		if (!queue) {
			const embed = new EmbedBuilder().setColor(hexColors.gold).setTitle('Queue Info').setDescription('The server does not have active player!');
			return interaction.reply({ embeds: [embed] });
		}

		if (!queue.isPlaying()) {
			const embed = new EmbedBuilder().setColor(hexColors.gold).setTitle('Queue Info').setDescription('There is no playing track!');
			return interaction.reply({ embeds: [embed] });
		}

		// Get the number of songs to skip (default to 1 if not specified)
		const skipAmount = interaction.options.getInteger('amount') || 1;
		const queueSize = queue.tracks.data.length;

		// Prevent skipping more than available tracks
		if (skipAmount > queueSize) {
			const embed = new EmbedBuilder()
				.setColor(hexColors.red)
				.setTitle('Queue Info')
				.setDescription(`❌ You cannot skip more than ${queueSize} songs!`);
			return interaction.reply({ embeds: [embed] });
		}

		const skipToTrack = queue.tracks.data[skipAmount];
		// skip the track
		const currentTrack = useQueue().currentTrack;
		
		// Set the flags to prevent finish event to emit
		queue.metadata = {
			...queue.metadata,
			finishEvent: false,
		}

		queue.node.skipTo(skipToTrack);

		// send the message
		const embed = new EmbedBuilder()
			.setColor(hexColors.gold)
			.setTitle('Queue Info')
			.setThumbnail(currentTrack.thumbnail)
			.addFields(
				{ name: `⏯ Skipping: ${skipAmount} tracks`, value: `${currentTrack.title} ➡️ ${skipToTrack.title} `, inline: true },
			);

		interaction.reply({ embeds: [embed] });
	},
};