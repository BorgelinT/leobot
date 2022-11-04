import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest"
import { readdirSync } from "fs";
import { join } from "path";
import { Command, SlashCommand } from "../types";
import { token, clientId } from "../config.json"

module.exports = (client : Client) => {
    const slashCommands : SlashCommandBuilder[] = []

    let slashCommandsDir = join(__dirname,"../commands")

    readdirSync(slashCommandsDir).forEach(file => {
        if (!file.endsWith(".ts")) return;
        let command : SlashCommand = require(`${slashCommandsDir}/${file}`).default
        console.log(command.command.name);
        slashCommands.push(command.command)
    })

    const rest = new REST({version: "10"}).setToken(token);

    rest.put(Routes.applicationCommands(clientId), {
        body: slashCommands.map(command => command.toJSON())
    })
    .then((data : any) => {
        console.log('data.length: ' + data.length);
        console.log(slashCommands);
    }).catch(e => {
        console.log(e)
    })
}