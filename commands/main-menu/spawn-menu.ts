import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  Collection,
  ComponentType,
  SlashCommandBuilder,
} from 'discord.js';
import mainMenuHandler from '../../button-handlers/main-menu.handler';

const data = new SlashCommandBuilder()
  .setName('spawn-menu')
  .setDescription('spawns components');

async function execute(interaction: ChatInputCommandInteraction) {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('button1')
      .setLabel('Backend')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('button2')
      .setLabel('Frontend')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('button3')
      .setLabel('QA')
      .setStyle(ButtonStyle.Primary)
  );

  const message = await interaction.reply({
    content: 'Qual é a sua stack?',
    ephemeral: true,
    components: [row],
  });

  message
    .createMessageComponentCollector({
      componentType: ComponentType.Button,
    })
    .on('collect', async (...args) => {
      const interaction = [...args][0];
      await mainMenuHandler(interaction);
    });
}

export { data, execute };
