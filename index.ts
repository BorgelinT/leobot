import { GatewayIntentBits, Partials, Client, Constants, Collection, GuildMember, APIInteractionGuildMember, GuildMemberRoleManager, ChannelType, TextChannel, MessageReaction, Interaction, CommandInteraction, ButtonInteraction } from 'discord.js'
import { readdirSync } from "fs";
import { join } from "path";
import { emojis, roles, token, testServerId, guildId, channelId } from './config.json';
import { SlashCommand } from './types';
// import rolehandler from '/events';

export const client = new Client({
	intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent
  ],
	partials: [ Partials.Message, Partials.Channel, Partials.Reaction],
});

const rolenames = Object.keys(roles);
const emojinames = Object.keys(emojis);

const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
    require(`${handlersDir}/${handler}`)(client)
})

let message!: any;

client.on('ready', () => {
  console.log('Kirjauduttu sisään käyttäjänä ' + client.user?.tag);
  // etsi serveri komentojen testaamista varten
  const guild = client.guilds.cache.get(guildId);

  if (guild) guild.slashCommands = new Collection<string, SlashCommand>();
  client.slashCommands = new Collection<string, SlashCommand>()


  // etsi roolikanava
  const channel = client.channels.cache.get(channelId);
  if (channel == null) return;
  // type guard
  if (!((channel): channel is TextChannel => channel.type === ChannelType.GuildText)(channel)) return;
  message = channel.messages.fetch('983144971366461490').then(message => {
    // create filter for which emojis to collect
    const filter: any = (reaction: MessageReaction, user: GuildMember) => {
        return emojinames.includes(reaction.emoji.name!) && user.id !== message.author.id;
    };
    // init reaction collector

    const collector = message.createReactionCollector({ filter });
    console.log('Aloitetaan reaktioiden kuuntelu ...')
      collector.on('collect', (reaction, user) => {
        console.log(`Saatiin reaktio ${reaction.emoji.name} käyttäjältä ${user.tag}`);
        if (reaction.emoji.name == null) return;
        let emojiname = reaction.emoji.name;
        message.guild.members.fetch(user.id).then(member => {
          if (emojinames.includes(emojiname)) {
            let roleid = roles[emojiname];
            console.log(roleid);

            console.log(`lisätään käyttäjälle ${user.tag} rooli ${roleid}`);
            member.roles.add(roleid);
            
          }
        });
      });
  })
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    console.log('command')
    handleCommand(interaction);
  }
  if (interaction.isButton()) {
    handleButton(interaction);
  }
 
})

function handleCommand(interaction: CommandInteraction) {
  const { commandName, options } = interaction;
  if (commandName === 'ping') {
    interaction.reply({
      content: 'pong',
      ephemeral: true, // only shown to command user
    })
  }
}

function handleButton(interaction: ButtonInteraction) {
  if (!interaction.member) return;
    const member: GuildMember | APIInteractionGuildMember = interaction.member;
    if (!member) return;
    if (!interaction.isButton()) return;
    interaction.deferUpdate();
    let rolesmanager = interaction.member.roles as GuildMemberRoleManager;
    for (let i = 0; i < emojinames.length; i++) {
      rolesmanager.remove(roles[emojinames[i]]);
    }
    return;
}

client.login(token);