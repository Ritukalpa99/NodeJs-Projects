const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')


const app = express();

app.use(bodyParser.urlencoded({extended : false}))

app.get('/login',(req,res) => {
    res.send('<form action="/user-details" method="POST"><input type="text" name="name"><button type="submit">Add Product</button></form>')
})

app.post('/user-details', (req,res) => {
    const userName = req.body.name
    console.log(userName);
    fs.appendFile('./message.txt', `${userName}\n`, (err) => {
        // console.log(err);
    })
    // localStorage.setItem({'user' : userName})
    res.redirect('/')
})

app.post('/chat-message', (req,res) => {
    const chat = req.body.message
    fs.appendFile('./message.txt', `${chat}\n`, (err) => {
        // console.log(err);
    })
    res.redirect('/')
})

app.get('/', (req,res) => {
    fs.readFile('./message.txt',"utf-8", (err,data) => {
        if(err) throw err;
        const text = data + '<form action="/chat-message" method="POST"><input type="text" name="message"><button type="submit">send</button></form>'
        // res.send(data)
        res.send(text)
    })
})
app.listen(3000);