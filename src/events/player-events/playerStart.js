const { GuildQueueEvent } = require('discord-player');

module.exports = {
    name: GuildQueueEvent.PlayerStart,
    async execute(queue, track){
        const { channel } = queue.metadata;
        console.log('Player start');
        try {
            await channel.send(`Now playing: ${track.title}`); 
        } catch (error) {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command! Player Event', flags: MessageFlags.Ephemeral });
            }
            else {
                await interaction.reply({ content: 'There was an error while executing this command! Player Event', flags: MessageFlags.Ephemeral });
            }
            console.error(error);
        }
        // Send a message to the channel
        
    }
}