module.exports = (client) => {
  require('colors')
  client.on('ready', () => {
    console.log(`[DISCOFFE] Estou Online | ${client.users.cache.size} Membros [${client.ws.ping}ms]`.green)
    var interval = setInterval(function() {
    client.user.setActivity(`DisCofee • ${client.users.cache.size} Membros [${client.ws.ping}ms]`)
    }, 10000)
})
}