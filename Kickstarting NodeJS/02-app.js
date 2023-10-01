const http = require('http');

// function rqListener(req, res) {
     
// }

// http.createServer(rqListener)

const server = http.createServer((req,res) => {
    console.log(req.url, req.method, req.headers);
})


server.listen(3000, () => {console.log('server started')});