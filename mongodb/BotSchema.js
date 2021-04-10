const mongoose = require('mongoose')
let BotSchema = new mongoose.Schema({
    ID: Number,
    Owner: Number,
    Votes: Number,
    Descc: String,
    Descl: String,
    Tag: String,
})
module.exports = mongoose.model("bots", BotSchema)