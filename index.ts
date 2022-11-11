import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import discord, { Collection, GatewayIntentBits } from 'discord.js';
import getFiles from './helpers/file-reader';

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
(async () => {
  const commandFiles = getFiles('./commands');

  for (const file of commandFiles) {
    const command = await import(file);

    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${file} is missing a required "data" or "execute" property.`
      );
    }
  }
})();

/*
                                  REGISTER EVENTS FROM EVENTS FOLDER
*/
(async () => {
  const eventsPath = path.join(__dirname, 'events');
  const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.ts'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const { event } = await import(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
})();

client.login(TOKEN);
