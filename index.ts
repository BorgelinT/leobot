import { Intents, Client } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new Client({
	intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.on('ready', () => {
  console.log('Client ready')
  const testGuildId = '928618312487829534';
  const testGuild = client.guilds.cache.get(testGuildId);
  let commands;

  if (testGuild) {
    commands = testGuild.commands;
  } else {
    commands = client.application?.commands;
  }

  commands?.create({
    name: 'ping',
    description: 'replies with pong',
  })
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName, options } = interaction;

  if (commandName === 'ping') {
    interaction.reply({
      content: 'pong',
      ephemeral: true, // only shown to command user
    })
  }
})

client.login(process.env.TOKEN);