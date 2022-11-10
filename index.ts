import dotenv from 'dotenv'
dotenv.config();

import fs from 'fs';
import path from 'path'
import discord, { BaseInteraction, ChatInputCommandInteraction, Collection, CommandInteraction, Events, GatewayIntentBits, SlashCommandBuilder } from 'discord.js';

const { TOKEN } = process.env;

const client = new discord.Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		// GatewayIntentBits.GuildMembers,
	],
});

client.commands = new Collection();

/*
                                  REGISTER SLASH COMMANDS FROM COMMANDS FOLDER
*/
const commandsPath = path.join(__dirname, 'commands'); // commands absolute path
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts')); // all commands files names

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}








/*
                                  REGISTER EVENTS FROM EVENTS FOLDER
*/
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const { event } = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(TOKEN);