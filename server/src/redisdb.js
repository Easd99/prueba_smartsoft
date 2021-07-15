const { createClient } = require('then-redis')

const client = createClient({
    port: 6379,
    host: "localhost"
});
// client.select(1)
client.on('error', (err) => {
    console.error("Ha ocurrido un error", err)
})
client.on('ready', () => {
    console.info(`[  DB  ]  *** Conected :)`)
})



module.exports = client