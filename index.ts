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
});

client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
    message.reply({
      content: 'pong',
    })
  }
})

client.login(process.env.TOKEN);