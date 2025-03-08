const { GuildQueueEvent } = require('discord-player');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: GuildQueueEvent.PlayerFinish,
	async execute(queue, track) {
		const { channel } = queue.metadata;

		const embed = new EmbedBuilder()
			.setColor(0xFF0000)
			.setTitle('⏹ Track Finished')
			.setDescription(`The track **${track.title}** has finished playing.`)
			.setThumbnail(track.thumbnail)
			.setFooter({ text: 'Queueing up the next song... 🎶' });

		await channel.send({ embeds: [embed] });
	},
};

