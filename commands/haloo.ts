const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('haloo')
		.setDescription('vastaa haloo'),
		// TODO: vaihda tyypitys
	async execute(interaction: any) {
		await interaction.reply('haloo');
	},
};
