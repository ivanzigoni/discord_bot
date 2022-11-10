import { ButtonInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
  data: SlashCommandBuilder,
  execute:  (interaction: ChatInputCommandInteraction | ButtonInteraction) => Promise<void>
}