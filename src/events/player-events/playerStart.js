const { GuildQueueEvent } = require('discord-player');
const { EmbedBuilder } = require('discord.js');
const { hexColors } = require('../../ultility/tools/hexColors');
const { formatTime } = require('../../ultility/tools/timeFormat');
module.exports = {
	name: GuildQueueEvent.PlayerStart,
	async execute(queue, track) {
		const { channel, finishEvent } = queue.metadata;

		// If the flags not raised then raised the flags
		if (!finishEvent) {
			queue.metadata = {
				...queue.metadata,
				finishEvent: true,
			};
		}

		const upcomingTrack = queue.tracks.data.slice(0, 5);
		const totalTracks = queue.tracks.data.length;

		// eslint-disable-next-line no-shadow
		const trackMap = upcomingTrack.map((track, index) => `${index + 1}. ${track.title} - ${track.author} - ${track.duration}`);


		const totalQueueDurationSeconds = queue.tracks.data.reduce((acc, t) => {
			const [min, sec] = t.duration.split(':').map(Number);
			return acc + (min * 60 + sec);
		}, 0);

		queueDuration = formatTime(totalQueueDurationSeconds);

		const embed = new EmbedBuilder()
			.setColor(hexColors.lightBlue)
			.setTitle(`🎶 Now Playing: ${track.title}`)
			.setURL(track.url)
			.setAuthor({ name: track.author, iconURL: track.thumbnail })
			.setDescription(track.description || 'No description available.')
			.addFields(
				{ name: '⏳ Duration', value: track.duration, inline: false }, // Unique line
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
			.setThumbnail(track.thumbnail)
			.setFooter({ text: 'Enjoy your music! 🎧' });

		await channel.send({ embeds: [embed] });

	},
};

