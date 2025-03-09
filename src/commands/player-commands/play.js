const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
	isPlayer: true,
	// Define the play command
	data: new SlashCommandBuilder()
		.setName('play') // Command name
		.setDescription('Play a song in a voice channel') // Command description
		.addStringOption(
			(option) =>
				option
					.setName('song') // Option name
					.setDescription('The song to play') // Option description
					.setRequired(true), // Make the option required
		),

	async execute(interaction) {
		// Get the player instance and song query
		const player = useMainPlayer();
		const query = interaction.options.getString('song', true);

		// Get the voice channel of the user and check permissions
		const voiceChannel = interaction.member.voice.channel;

		await interaction.deferReply();
		if (!voiceChannel) {
			return interaction.editReply(
				'You need to be in a voice channel to play music!',
			);
		}

		if (
			interaction.guild.members.me.voice.channel &&
            interaction.guild.members.me.voice.channel !== voiceChannel
		) {
			return interaction.editReply(
				'I am already playing in a different voice channel!',
			);
		}

		if (
			!voiceChannel
				.permissionsFor(interaction.guild.members.me)
				.has(PermissionsBitField.Flags.Connect)
		) {
			return interaction.editReply(
				'I do not have permission to join your voice channel!',
			);
		}

		if (
			!voiceChannel
				.permissionsFor(interaction.guild.members.me)
				.has(PermissionsBitField.Flags.Speak)
		) {
			return interaction.editReply(
				'I do not have permission to speak in your voice channel!',
			);
		}

		try {
			// Play the song in the voice channel
			const result = await player.play(voiceChannel, query, {
				nodeOptions: {
				  metadata: { channel: interaction.channel }, // Store text channel as metadata on the queue
				},
			  });

			  // Reply to the user that the song has been added to the queue
			  return interaction.editReply(
				`${result.track.title} has been added to the queue!`,
			  );


		}
		catch (error) {
			// Handle any errors that occur
			console.error(error);
			return interaction.editReply('An error occurred while playing the song!');
		}
	},
};