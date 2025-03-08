const fs = require('node:fs');
const path = require('node:path');
const { colors } = require('../tools/textFormat');

module.exports = {
	async load(client, player) {
		console.log(colors.blue + '[INFO] Loading Command Handlers!' + colors.reset);

		const foldersPath = path.join(__dirname, '../../events');
		const eventsFolder = fs.readdirSync(foldersPath);

		for (const folder of eventsFolder){
			const eventPath = path.join(foldersPath, folder);
			const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));
			for (const file of eventFiles) {
				const filePath = path.join(eventPath, file);
				const event = require(filePath);

				console.log(folder);
				if (folder == 'client-events'){
					if (event.once) {
						// using callback function
						client.once(event.name, (...args) => event.execute(...args));
					}
					else {
						client.on(event.name, (...args) => event.execute(...args));
					}
				} else {
					player.on(event.name, (...args) => event.execute(...args));
				}
			}
		}
		console.log(colors.blue + '[INFO] Loading Command Handlers Finished!' + colors.reset);
	},
};