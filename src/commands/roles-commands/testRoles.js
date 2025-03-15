const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { hexColors } = require('../../ultility/tools/hexColors')

const channelID = '1350393837750845481';
const roles = [
    { id: "red", label: "Red Role", roleId: "1343936784316370995" },
    { id: "blue", label: "Blue Role", roleId: "1343937001950281839" },
    { id: "green", label: "Green Role", roleId: "1343937037530824755" },
];

module.exports = {
	cooldown : 5,
	data: new SlashCommandBuilder()
		.setName('test-roles')
		.setDescription('Deploy a test roles.'),		
	
	async execute(interaction) {
        const row = new ActionRowBuilder().addComponents(
            roles.map(role =>
                new ButtonBuilder()
                    .setCustomId(`role_${role.id}`)
                    .setLabel(role.label)
                    .setStyle(ButtonStyle.Primary)
            )
        );
        
        // Create an embed
        const embed = new EmbedBuilder()
            .setTitle('🎭 Role Selection')
            .setDescription(
                'Choose a role by clicking one of the buttons below!\n\n' +
                '🔴 **Red Role** - Represents courage and strength.\n' +
                '🔵 **Blue Role** - Represents wisdom and calmness.\n' +
                '🟢 **Green Role** - Represents growth and harmony.'
            )
            .setColor(hexColors.darkGray);

        // Get the channel using the predefined ID
        const client = interaction.client;

        const channel = await client.channels.fetch(channelID).catch(() => null);

        if (!channel) {
            return interaction.reply({ content: 'Channel not found!', ephemeral: true });
        }

        // Send the embed to the stored channel
        await channel.send({ embeds: [embed], components: [row]  });

        // Reply to the interaction separately (so the user gets confirmation)
        await interaction.reply({ content: 'Role selection message sent!', ephemeral: true });
	},

    
};