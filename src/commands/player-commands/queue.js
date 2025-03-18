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
			const embed = new EmbedBuilder()
				.setColor(hexColors.gold)
				.setTitle('Queue Info')
				.setDescription('The server does not have active player!');
			return interaction.reply({ embeds: [embed] });
		}

		// Get the current song if there is an exist player section
		const currentTrack = queue.currentTrack;
		// If there is no track
		if (!currentTrack) {
			const embed = new EmbedBuilder()
				.setColor(hexColors.gold)
				.setTitle('Queue Info')
				.setDescription('No track in the queue');
			return interaction.reply({ embeds: [embed] });
		}

		try {
			const upcomingTrack = queue.tracks.data.slice(0, 5);
			const totalTracks = queue.tracks.data.length;

			const trackMap = upcomingTrack.map(
				(track, index) =>
					`${index + 1}. ${track.title} - ${track.author} - ${track.duration}`,
			);

			// Pretty sure I will forget how this work since am cooking this shit when am high so here is the explaination :))
			// The reduce in the first reduce, exam: "4:30" => "4", "30" => [4:30] then do the reduce like normal
			// The second work in the same way but the initial value is not set to 0 so it will take take the first value in
			// array to calculate
			// The queue is missing the current playing track so need to add one more to make sure it display correct
			const totalQueueDurationSeconds =
        queue.tracks.data.reduce((acc, t) => {
        	const [min, sec] = t.duration.split(':').map(Number);
        	return acc + (min * 60 + sec);
        }, 0) +
        currentTrack.duration
        	.split(':')
        	.map(Number)
        	.reduce((m, s) => m * 60 + s);

			queueDuration = formatTime(totalQueueDurationSeconds);

			const embed = new EmbedBuilder()
				.setColor(hexColors.gold)
				.setTitle('Queue Info')
				.addFields(
					{ name: '🎶 Now Playing:', value: `${currentTrack.title}` },
					{ name: '⏳ Duration', value: currentTrack.duration, inline: false }, // Unique line
					{
						name: '📜 Total Tracks',
						value: `${totalTracks + 1}`,
						inline: true,
					},
					{
						name: '⏳ Total Queue Duration',
						value: queueDuration,
						inline: true,
					}, // Same line as Total Tracks
					{ name: '\u200B', value: '\u200B', inline: false }, // Spacer line
					{
						name: '🎶 Next Tracks:',
						value:
              trackMap.length > 0
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
