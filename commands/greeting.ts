import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('greeting')
  .setDescription('customized greeting')
  .addStringOption((option) => {
    return option
      .setName('falatu')
      .setDescription('greeting numero um')
      .setChoices({ name: 'consagrado', value: 'consagrado' }, { name: 'patrão', value: 'patrão' });
  })
  .addStringOption((option) => {
    return option
      .setName('coé')
      .setDescription('greeting numero dois')
      .setChoices({ name: 'consagrado', value: 'consagrado' }, { name: 'patrão', value: 'patrão' });
  });
// .addStringOption(option => {
//   return option.setName('bão').setDescription("greeting numero tres")
// })

async function execute(interaction: ChatInputCommandInteraction) {
  const option1 = interaction.options.get('coé');
  const option2 = interaction.options.get('falatu');

  const replyString = option1
    ? `${option1!.name}, meu ${option1!.value}`
    : `${option2!.name}, meu ${option2!.value}`;

  await interaction.reply(replyString);
}

export { data, execute };
