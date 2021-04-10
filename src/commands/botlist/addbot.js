module.exports = class AddbotCommand {
  constructor(){
    return {
      permissoes: {
        membro: [], //Permissoes que o usuario necessita
        bot: [], //Permissoes que o bot necessita
        dono: false //Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'addbot',
        categoria: '🤖 Botlist',
        desc: 'Adiciona um bot na botlist'
      },
    aliases: ['add', 'adicionar', 'enviar', 'adicionarbot', 'enviarbot'],
    run: this.run
    }
  }
  
  async run(client, message, args, prefixo) {
    const addbot = new Set();
    const respostas = {};
    message.author.send('a').catch((e) => {
      message.quote(`:x: ${message.author} **|** Abra suas mensagens diretas para poder adicionar um bot`)
    }).then(a => a.delete())
    
    message.quote(`:white_check_mark: ${message.author} **|** Olhe suas mensagens privadas`).then(m => {
      
      const embed1 = new (require("discord.js")).MessageEmbed()
   .setTitle(`🤖 Adicionar Bot`)
   .setDescription(`> Qual o id do seu bot?`)
   .setFooter(`Você tem 1 minuto para responder cada questão`, message.guild.iconURL())
   .setColor('BLUE')

   message.author.send(message.author, embed1).then(p1 => {
     const col = message.author.dmChannel.createMessageCollector(m => m.author.id == message.author.id, {
       max: 1,
       time: 60000,
       errors: ["time"]
     })
     
     col.on('collect', async coll => {
       col.stop()
       respostas.id = coll.content
       
       const bot = await client.users.fetch(coll.content).catch((e) => {
         message.author.send(`:x: ${message.author} **|** O ID Fornecido não é de um usuário válido.`)
       })
       respostas.tag = bot.tag
       if(!bot.bot) return message.author.send(`:x: ${message.author} **|** O ID Fornecido não é de um bot`)
       
       const embed2 = new (require('discord.js')).MessageEmbed()
       .setTitle('🤖 Adicionar Bot')
       .setDescription(`> Qual o prefixo do seu bot?`)
       .addField(`📋 Informações do Bot:`, `**:white_check_mark: TAG:** ${bot.tag}\n**:white_check_mark: ID:** ${bot.id}`)
       .setColor('BLUE')
       message.author.send(message.author, embed2)
     
     const col2 = message.author.dmChannel.createMessageCollector(m => m.author.id == message.author.id, {
       max: 1,
       time: 60000,
       errors: ["time"]
     });
     
     col2.on('collect', async coll2 => {
       col2.stop()
       respostas.prefixo = coll2.content
       const embed3 = new (require('discord.js')).MessageEmbed()
       .setTitle('🤖 Adicionar Bot')
       .setDescription(`> Insira uma descrição curta sobre o bot, mínimo 50 caracteres, máximo 300`)
       .addField(`📋 Informações do Bot:`, `:white_check_mark: **TAG:** ${respostas.tag}\n:white_check_mark: **ID:** ${respostas.id}\n:white_check_mark: **Prefixo:** ${respostas.prefixo}`)
       .setColor('BLUE')
       message.author.send(message.author, embed3)
       const col3 = message.author.dmChannel.createMessageCollector(m => m.author.id == message.author.id, {
         max: 1,
         time: 60000,
         errors: ["time"]
       })
       
       col3.on('collect', coll => {
         respostas.descc = coll.content
         col3.stop()
         if(args.length < 50) return message.author.send(`:x: ${message.author} **|** A descrição precisa ter mais de 50 caracteres.`)
         const embed4 = new (require('discord.js')).MessageEmbed()
         .setTitle('🤖 Adicionar Bot')
         .setDescription('> Envie uma descrição detalhada sobre seu bot mínimo 300 caracteres')
         .addField(`📋 Informações do Bot:`, `:white_check_mark: **TAG:** ${respostas.tag}\n:white_check_mark: **ID:** ${respostas.id}\n:white_check_mark: **Prefixo:** ${respostas.prefixo}\n:white_check_mark: **Descrição Curta:** ${respostas.descc}`)
       .setColor('BLUE')
       message.author.send(embed4)
         
       });
     });
     });
   });
   });
 };
}
//ADG