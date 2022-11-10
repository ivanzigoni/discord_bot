import { ButtonInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("button1")
  .setDescription("Replies with pong! lol")

async function execute(interaction: ButtonInteraction) {
  await interaction.reply("SOLTA O SAMPLE DE GUITARRA")
}

export {
  data,
  execute,
}