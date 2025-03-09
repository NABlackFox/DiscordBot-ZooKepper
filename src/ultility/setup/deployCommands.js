require('dotenv').config();
const { colors } = require('../tools/textFormat');

const { REST, Routes } = require('discord.js');

module.exports = {
	async deploy(isGlobal) {
		console.log(colors.blue + '[INFO] Deploy Commands!' + colors.reset);

		const clientId = process.env.CLIENT_ID;
		const guildId = process.env.GUILD_ID;
		const token = process.env.TOKEN;

		const fs = require('node:fs');
		const path = require('node:path');

		const commands = [];
		// Grab all the command folders from the commands directory you created earlier
		const foldersPath = path.join(__dirname, '../../commands');
		const commandFolders = fs.readdirSync(foldersPath);

		for (const folder of commandFolders) {
			// Grab all the command files from the commands directory you created
			const commandsPath = path.join(foldersPath, folder);
			const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
			// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
			for (const file of commandFiles) {
				const filePath = path.join(commandsPath, file);
				const command = require(filePath);
				if ('data' in command && 'execute' in command) {
					commands.push(command.data.toJSON());
				}
				else {
					console.log(colors.yellow + `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.` + colors.reset);
				}
			}
		}

		// Construct and prepare an instance of the REST module
		const rest = new REST().setToken(token);

		// Deploy commands
		try {
			if (isGlobal) {
				console.log('DEPLOY COMMANDS TO ALL GUILDS');
				console.log(`Started refreshing ${commands.length} application (/) commands.`);
				// The put method use to register the slash commands to the server
				const data = await rest.put(Routes.applicationCommands(clientId), { body: commands });
				console.log(`Successfully reloaded ${data.length} application (/) commands.`);
				console.log(colors.blue + '[INFO] Deploy Commands Finished!' + colors.reset);
				return;
			}

			console.log(`Started refreshing ${commands.length} application (/) commands.`);
			// The put method use to register the slash commands to the server
			const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
			console.log(colors.blue + '[INFO] Deploy Commands Finished!' + colors.reset);
		}
		catch (error) {
			console.error(error);
		}
	},
};
