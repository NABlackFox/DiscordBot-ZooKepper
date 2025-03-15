const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown : 5,
	data: new SlashCommandBuilder()
		.setName('set-role-channel')
		.setDescription('Set the channel for roles option.')
		.addStringOption(option => option
			.setName('channel-id')
			.setDescription('channel ID').setRequired(true)),
		
		
	
	async execute(interaction) {
		const channel = interaction.options.getString('channel-id');
	},
};