import dotenv from 'dotenv';
dotenv.config();

import { REST, Routes } from 'discord.js';
import { Command } from './interfaces/command';
import getFiles from './helpers/file-reader';

const { TOKEN, GUILD_ID, CLIENT_ID } = process.env;

(async () => {
  const rest = new REST({ version: '10' }).setToken(TOKEN || '');

  const commands: any[] = [];

  const commandFiles = getFiles('./commands');

  for (const file of commandFiles) {
    const command: Command = await import(file);
    commands.push(command.data.toJSON());
  }

  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID || '', GUILD_ID || ''),
      { body: commands }
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error: any) {
    // And of course, make sure you catch and log any errors!
    console.log(error['rawError']['errors']);
  }
})();
