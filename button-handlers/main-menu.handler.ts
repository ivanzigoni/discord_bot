import { ButtonInteraction } from 'discord.js';

export default async function mainMenuHandler(interaction: ButtonInteraction) {
  const { customId } = interaction;

  if (customId === 'button1') {
    await interaction.reply({
      content: 'você clicou no botão 1',
      ephemeral: true,
    });
  } else if (customId === 'button2') {
    await interaction.reply({
      content: 'você clicou no botão 2',
      ephemeral: true,
    });
  } else if (customId === 'button3') {
    await interaction.reply({
      content: 'você clicou no botão 3',
      ephemeral: true,
    });
  }
}
