const args = process.argv.slice(2); // Get command-line arguments
const isGlobal = args.includes("--global-deploy");

// Require for dotenv
const { config } = require("dotenv");
config();

// Require necessary discord.js classes

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { Player } = require("discord-player");
const { YoutubeiExtractor } = require("discord-player-youtubei");

const register = require("./ultility/setup/deployCommands");
const commandLoader = require("./ultility/setup/loadCommands");
const eventLoader = require("./ultility/setup/loadEvents");
const database = require("./ultility/setup/databaseConnect");

token = process.env.TOKEN;

// Create new client
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

// Create client command
client.commands = new Collection();

// Create client coolsdown
// Structure of the cooldowns: <key(command name) - value(A: Collection)>
// A's Structure: <key(user ID) - value(timestap when invoke the command)>
client.cooldowns = new Collection();

const player = new Player(client, {
  skipFFmpeg: false,
  connectionTimeout: 30000,
});

async function setUp() {
  await register.deploy(isGlobal);
  await commandLoader.load(client);
  await eventLoader.load(client, player);
  await player.extractors.register(YoutubeiExtractor);
  // mongoClinet = await database.connect();
  await client.login(token);
}

setUp();
