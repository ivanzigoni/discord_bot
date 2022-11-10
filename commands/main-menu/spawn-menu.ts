import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("spawn-menu")
  .setDescription("spawns components")

async function execute(interaction: ChatInputCommandInteraction) {
  const row = new ActionRowBuilder<ButtonBuilder>()
  .addComponents(
    new ButtonBuilder()
      .setCustomId('button1')
      .setLabel('Click me!')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('button2')
      .setLabel('Click me!')
      .setStyle(ButtonStyle.Primary),
  );

  await interaction.reply({ content: 'I think you should,', components: [row] });
}

export {
  data,
  execute,
}