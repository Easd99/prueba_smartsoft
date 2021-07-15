require('./database')
require('./redisdb')
const app = require('./app')


app.listen(app.get('port'))

console.log('Server on port ', app.get('port'))


