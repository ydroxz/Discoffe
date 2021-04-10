function regexEscapar(prefixo) {
	return prefixo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const prefixos = new RegExp(
	`^(<@!?828731810262286407>|${regexEscapar('c!')}|${regexEscapar(
		'c.'
	)}|cyber)\\s*`
);

const cooldown = new Set();

module.exports = (client) => {
	client.on('message', async msg => {

		var message = msg;

		if (msg.author.bot) return;

		let regexMention = new RegExp(`^<@!?${client.user.id}>$`);

		require('../../utils/QuoteFunction');
		verificarPing();
		verificarComando();
		function verificarPing() {
			if (msg.content.match(regexMention))
				return msg.quote(`:ping_pong: Olá **${msg.author.username}**`);
		}

		async function verificarComando() {
		   //Verificar se a mensagem tem algum dos prefixos da regex

			if (!prefixos.test(message.content.toLowerCase())) return;

			//Procurar prefixo usado na mensagem com regex
			let [, prefixoCerto] = message.content.toLowerCase().match(prefixos);

			//Remover o prefixo e dividir os espaços em arraia
			const argumentos = message.content
				.slice(prefixoCerto.length)
				.trim()
				.split(/ +/);

			//Pegar o nome do comando (s!ban Davi viraria apenad ban)
			const comandoNome = argumentos.shift().toLowerCase();

			//Procurar pelo nome do comando, se nao achar, procurar aliases.
			const comando =
				client.commands.get(comandoNome) ||
				client.commands.find(cmd => cmd.aliases.includes(comandoNome));

		
      
          if(!comando) return;
			//Verificar se o membro possui perms
			if (!msg.member.permissions.has(comando.permissoes.membro))
				return msg.channel.send(
					`:x: **|** ${
						msg.author
					} Você não possui permissões necessárias para executar este comando. Você precisa de: \`${comando.permissoes.membro.join(
						', '
					)}\`.`
				);

			//Verificar se o bot possui perms
			if (!msg.member.permissions.has(comando.permissoes.bot))
				return msg.channel.send(
					`:x: **|** ${
						msg.author
					} Eu não possuo permissões necessárias para executar este comando. Preciso de: \`${comando.permissoes.bot.join(
						', '
					)}\`.`
				);

			//Verificar se o usuario é dev do bot
			if (
				comando.permissoes.dono &&
				![
					'717766639260532826',
				].includes(msg.author.id)
			)
				return msg.channel.send(
					`:x: ${msg.author} **|** Você não está na lista de desenvolvedores.`
				);

			//Bora executar o comando se estiver tudo OK.
			if(prefixoCerto.includes(client.user.id)) { prefixoCerto = 'd.'
			  msg.mentions.users.delete(client.user.id)
			}
			try {
				await comando.run(client, msg, argumentos, prefixoCerto);
				/*
				webhookClient.send({
					username: client.user.username,
					avatarURL: client.user.displayAvatarURL({ dynamic: true }),
					embeds: [cmdembed]
				})
				*/
			} catch (e) {
				console.log(e);
				return msg.reply(`deu ruim.\n\`\`\`${e.toString()}\`\`\``);
			}
		}
	});
};

// - BONEE e Davi