const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
	isPlayer: true,
	// Define the play command
	data: new SlashCommandBuilder()
		.setName('skip') // Command name
		.setDescription('Skip the current song'),

	execute(interaction) {
		// Get the queue
        const queue = useQueue();

		if (!queue) {
			const embed = new EmbedBuilder().setColor(0xFFFF00).setTitle('Queue Info').setDescription('The server does not have active player!');
			return interaction.reply({ embeds: [embed] });
		}

        if (!queue.isPlaying()) {
			const embed = new EmbedBuilder().setColor(0xFFFF00).setTitle('Queue Info').setDescription('There is no playing track!');
			return interaction.reply({ embeds: [embed] });
		}

		// skip the track
        const currentTrack = useQueue().currentTrack;
        queue.node.skip();

		// send the message
		const embed = new EmbedBuilder()
			.setColor(0xFFFF00)
			.setTitle('Queue Info')
			.setThumbnail(currentTrack.thumbnail)
			.addFields(
				{ name: '⏯ Skipping: ', value: currentTrack.title, inline: true },
			);

		interaction.reply({ embeds: [embed] });
	},
};