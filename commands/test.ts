import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder } from "discord.js"
import { SlashCommand } from "../types";

// en tiiä toimiiko tämä, komentoijen rekistöinti vie aikaa
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("test")
    .setDescription("a")
    ,
    execute: interaction => {
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`a`)
                .setColor('#fff')
            ]
        })
    },
    cooldown: 10
}

export default command