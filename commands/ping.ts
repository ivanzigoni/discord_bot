import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with pong! lol');

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply('SOLTA O SAMPLE DE GUITARRA');
}

export { data, execute };
