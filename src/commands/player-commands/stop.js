const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { hexColors } = require('../../ultility/tools/hexColors');

module.exports = {
	isPlayer: true,
	// Define the play command
	data: new SlashCommandBuilder()
		.setName('stop') // Command name
		.setDescription('Stop the player'),

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

		// stop the player
		queue.node.stop(true);

		// send the message
		const embed = new EmbedBuilder()
			.setColor(hexColors.red)
			.setTitle('⏹ Music Stopped')
			.setThumbnail('https://i.imgur.com/O3DHIA5.png') // Optional: Add a stopping-related icon
			.setDescription('The player has been **stopped** and the queue has been **cleared**.')
			.addFields(
				{ name: '🎶 Queue Status', value: 'All tracks have been removed.', inline: false },
				{ name: '🔇 Player Status', value: 'Disconnected from the voice channel.', inline: false },
			)
			.setFooter({ text: 'Use /play to start a new session.' });

		interaction.reply({ embeds: [embed] });
	},
};