const http = require('http');

const routes = require('./routes')
// function rqListener(req, res) {

// }

// http.createServer(rqListener)

const server = http.createServer(routes)


server.listen(3000, () => { console.log('server started') });