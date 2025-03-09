const { GuildQueueEvent } = require('discord-player');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: GuildQueueEvent.PlayerFinish,
	async execute(queue, track) {
		const { channel } = queue.metadata;
		const upcomingTrack = queue.tracks.data.slice(0, 5);

		const trackMap = upcomingTrack.map((track, index) => `${index + 1}. ${track.title} - ${track.author} - ${track.duration}`)
		const embed = new EmbedBuilder()
			.setColor(0xFF0000)
			.setTitle('⏹ Track Finished')
			.setDescription(`The track **${track.title}** has finished playing.`)
			.setThumbnail(track.thumbnail)
			.addFields(
				{ name: '🎶 Next Tracks: ', value: trackMap.join('\n') || 'No upcoming tracks.', inline: true },
			)
			.setFooter({ text: 'Queueing up the next song... 🎶' });

		await channel.send({ embeds: [embed] });
	},
};

