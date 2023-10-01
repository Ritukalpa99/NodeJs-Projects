const http = require('http');

// function rqListener(req, res) {

// }

// http.createServer(rqListener)

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello from Node.js server!</h1></body>')
    res.write('</html>')
})


server.listen(3000, () => { console.log('server started') });