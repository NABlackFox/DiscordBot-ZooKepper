const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { hexColors } = require('../../ultility/tools/hexColors');
const { formatTime } = require('../../ultility/tools/timeFormat');
const { useQueue } = require('discord-player');

module.exports = {
	isPlayer: true,
	// Define the play command
	data: new SlashCommandBuilder()
		.setName('queue') // Command name
		.setDescription('Display queue information'), // Command description

	async execute(interaction) {
		// Get the queue
		const queue = useQueue();

		if (!queue) {
			const embed = new EmbedBuilder().setColor(hexColors.gold).setTitle('Queue Info').setDescription('The server does not have active player!');
			return interaction.reply({ embeds: [embed] });
		}

		// Get the current song if there is an exist player section
		const currentTrack = queue.currentTrack;

		// If there is no track
		if (!currentTrack) {
			const embed = new EmbedBuilder().setColor(hexColors.gold).setTitle('Queue Info').setDescription('No track in the queue');
			return interaction.reply({ embeds: [embed] });
		}

		try {
			const upcomingTrack = queue.tracks.data.slice(0, 5);
			const totalTracks = queue.tracks.data.length;


			const trackMap = upcomingTrack.map((track, index) => `${index + 1}. ${track.title} - ${track.author} - ${track.duration}`);


			const totalQueueDurationSeconds = queue.tracks.data.reduce((acc, t) => {
				const [min, sec] = t.duration.split(':').map(Number);
				return acc + (min * 60 + sec);
			}, 0);

			queueDuration = formatTime(totalQueueDurationSeconds);

			const embed = new EmbedBuilder()
				.setColor(hexColors.gold)
				.setTitle('Queue Info')
				.addFields(
					{ name: `🎶 Now Playing:`, value: `${currentTrack.title}` },
					{ name: '⏳ Duration', value: currentTrack.duration, inline: false }, // Unique line
					{ name: '📜 Total Tracks', value: `${totalTracks + 1}`, inline: true },
					{ name: '⏳ Total Queue Duration', value: queueDuration, inline: true }, // Same line as Total Tracks
					{ name: '\u200B', value: '\u200B', inline: false }, // Spacer line
					{
						name: '🎶 Next Tracks:',
						value: trackMap.length > 0
							? trackMap.join('\n') + (totalTracks > 5 ? '\n\n .....' : '')
							: 'No upcoming tracks.',
						inline: false,
					},
				)
				.setThumbnail(currentTrack.thumbnail)
				.setFooter({ text: 'Enjoy your music! 🎧' });

			await interaction.reply({ embeds: [embed] });
		}
		catch (error) {
			console.error(error);
		}
	},
};