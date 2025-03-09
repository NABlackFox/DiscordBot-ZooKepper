const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
	isPlayer: true,
	// Define the play command
	data: new SlashCommandBuilder()
		.setName('nowplaying') // Command name
		.setDescription('Display currently playing song'),

	execute(interaction) {
		// Get the queue
		const queue = useQueue();

		if (!queue) {
			const embed = new EmbedBuilder().setColor(0xFF0000).setTitle('Queue Info').setDescription('The server does not have active player!');
			return interaction.reply({ embeds: [embed] });
		}

		// Get the current song if there is an exist player section
		const currentTrack = queue.currentTrack;

		// If there is no track
		if (!currentTrack) {
			const embed = new EmbedBuilder().setColor(0xFF0000).setTitle('Queue Info').setDescription('No track in the queue');
			return interaction.reply({ embeds: [embed] });
		}

		// return the current playing track information
		const embed = new EmbedBuilder()
			.setColor(0xFF0000)
			.setTitle('Queue Info')
			.setThumbnail(currentTrack.thumbnail)
			.addFields(
				{ name: '🎶 Now Playing: ', value: currentTrack.title, inline: true },
			)
			.setFooter({ text: 'Enjoy your music! 🎧' });

		interaction.reply({ embeds: [embed] });
	},
};