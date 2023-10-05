const http = require('http');
const fs = require('fs');
// function rqListener(req, res) {

// }

// http.createServer(rqListener)

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>')
        res.write('</html>')
        return res.end()
    }
    if (url === '/message') {
        const body = []
        req.on('data', (chunks) => {
            body.push(chunks)
        })
        req.on('end',() => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',message);
        })
        
        // res.writeHead(302, {})
        res.statusCode = 302 //redirection
        res.setHeader('Location', '/')
        
        return res.end()
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello from Node.js server!</h1></body>')
    res.write('</html>')
    res.end()
})


server.listen(3000, () => { console.log('server started') });