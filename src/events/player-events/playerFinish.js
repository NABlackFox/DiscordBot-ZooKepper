const { GuildQueueEvent } = require('discord-player');
const { EmbedBuilder } = require('discord.js');
const { hexColors } = require('../../ultility/tools/hexColors');

module.exports = {
	name: GuildQueueEvent.PlayerFinish,
	async execute(queue, track) {
		const { channel, finishEvent } = queue.metadata;

		// Return if the flags is not raised
		if (!finishEvent) {
			return;
		}

		const embed = new EmbedBuilder()
			.setColor(hexColors.red)
			.setTitle('⏹ Track Finished')
			.setDescription(`The track **${track.title}** has finished playing.`)
			.setThumbnail(track.thumbnail)
			.setFooter({ text: 'Queuing the next track' });

		await channel.send({ embeds: [embed] });
	},
};

