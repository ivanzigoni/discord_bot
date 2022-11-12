import {
  BaseInteraction,
  ButtonInteraction,
  ChatInputCommandInteraction,
  Events,
} from 'discord.js';
import { Command } from '../interfaces/command';

async function chatInputCommand(interaction: ChatInputCommandInteraction) {
  const command: Command = interaction.client.commands.get(
    interaction.commandName
  );

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing ${interaction.commandName}`);
    console.error(error);
  }
}

async function buttonCommand(interaction: ButtonInteraction) {
  const command: Command = interaction.client.commands.get(
    interaction.customId
  );

  if (!command) {
    console.error(`No command matching ${interaction.customId} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing ${interaction.customId}`);
    console.error(error);
  }
}

export const event = {
  name: Events.InteractionCreate,
  async execute(interaction: BaseInteraction) {
    if (interaction.isChatInputCommand()) {
      await chatInputCommand(interaction);
      return;
    } else if (interaction.isButton()) {
      return;
      // handled by collector
      // await buttonCommand(interaction);
    } else return;
  },
};
