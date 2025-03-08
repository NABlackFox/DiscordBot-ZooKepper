// Require for dotenv
require('dotenv').config();

// Require necessary discord.js classes

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player } = require('discord-player');
const { DefaultExtractors } = require('@discord-player/extractor');

const register = require('./ultility/setup/deployCommands');
const commandLoader = require('./ultility/setup/loadCommands');
const eventLoader = require('./ultility/setup/loadEvents');

const token = process.env.TOKEN;

// Create new client
const client = new Client ({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildVoiceStates,
],
});

// Create client command
client.commands = new Collection;

// Create client coolsdown
// Structure of the cooldowns: <key(command name) - value(A: Collection)>
// A's Structure: <key(user ID) - value(timestap when invoke the command)>
client.cooldowns = new Collection;

const player = new Player(client);

async function setUp() {
	await register.deploy();
	await commandLoader.load(client);
	await eventLoader.load(client, player);
	await player.extractors.loadMulti(DefaultExtractors);
	await client.login(token);
}

setUp();