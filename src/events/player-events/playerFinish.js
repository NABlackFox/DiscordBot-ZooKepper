const { GuildQueueEvent } = require('discord-player');
const { EmbedBuilder } = require('discord.js');
const { hexColors } = require('../../ultility/tools/hexColors');

module.exports = {
	name: GuildQueueEvent.PlayerFinish,
	async execute(queue, track) {
		const { channel, finishEvent } = queue.metadata;

		// Return if the flags is not raised
		if (!finishEvent){
			return;
		}
		const upcomingTrack = queue.tracks.data.slice(0, 5);
		const totalTracks = queue.tracks.data.length;

		// eslint-disable-next-line no-shadow
		const trackMap = upcomingTrack.map((track, index) => `${index + 1}. ${track.title} - ${track.author} - ${track.duration}`);
		const embed = new EmbedBuilder()
			.setColor(hexColors.red)
			.setTitle('⏹ Track Finished')
			.setDescription(`The track **${track.title}** has finished playing.`)
			.setThumbnail(track.thumbnail)
			.addFields(
				{ name: '🎶 Next Tracks: ', value: trackMap.length > 0
					? trackMap.join('\n') + (totalTracks > 5 ? `\n\n${totalTracks - 5}+ more tracks` : '')
					: 'No upcoming tracks.',
				inline: true,
				},
			);

		await channel.send({ embeds: [embed] });
	},
};

