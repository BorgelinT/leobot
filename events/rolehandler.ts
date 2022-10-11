// 	// get reactionmessage and add reaction collector
// 	rolesChannel.messages.fetch('983144971366461490').then(message => {
// 		// create filter for which emojis to collect
// 		const filter = (reaction, user) => {
// 			return emojinames.includes(reaction.emoji.name) && user.id !== message.author.id;
// 		};
// 		// init reaction collector
// 		const collector = message.createReactionCollector({ filter });
// 		collector.on('collect', (reaction, user) => {
// 			console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
// 			message.guild.members.fetch(user.id).then(member => {
// 				member.roles.add(roles[reaction.emoji.name]);
// 			});
// 		});
// 	});
// });

// // role remover button
// client.on('interactionCreate', interaction => {
// 	const member = interaction.member;
// 	if (!interaction.isButton()) return;
// 	interaction.deferUpdate();
// 	for (let i = 0; i < emojinames.length - 1; i++) {
// 		member.roles.remove(roles[emojinames[i]]);
// 	}
// 	return;
// });

import { Guild } from 'discord.js';