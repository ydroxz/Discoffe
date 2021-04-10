const {connect} = require("mongoose")
const c = require('colors')

connect(process.env.MONGO, { 
  
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then (function () {
    console.log(c.brightYellow(`[MONGOOSE] A Database foi concetada com sucesso`))
}).catch (function () {
    console.log(c.brightRed(`[MONGOOSE] A Database foi desligada por erro.`))
});