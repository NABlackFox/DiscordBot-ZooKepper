const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useTimeline, useQueue } = require('discord-player');

module.exports = {
	isPlayer: true,
	// Define the play command
	data: new SlashCommandBuilder()
		.setName('pause') // Command name
		.setDescription('Pause the current song'),

	execute(interaction) {
		// Get the time line
		const timeline = useTimeline();

		if (!timeline) {
			const embed = new EmbedBuilder().setColor(0xFFFF00).setTitle('Queue Info').setDescription('The server does not have active player!');
			return interaction.reply({ embeds: [embed] });
		}

		// state of the pause
		isPause = timeline.paused;

		// pause or resume
		isPause ? timeline.resume() : timeline.pause();

		const currentTrack = useQueue().currentTrack;

		// send the message
		const embed = new EmbedBuilder()
			.setColor(0xFFFF00)
			.setTitle('Queue Info')
			.setThumbnail(currentTrack.thumbnail)
			.addFields(
				{ name: isPause ? '❚❚ Resume: ' : '▶ Pause:', value: currentTrack.title, inline: true },
			);

		interaction.reply({ embeds: [embed] });
	},
};