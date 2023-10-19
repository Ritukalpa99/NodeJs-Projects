const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')


const app = express();

app.use(bodyParser.urlencoded({extended : false}))

app.get('/login',(req,res) => {
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/user-details" method="POST"><input id="username" type="text" name="username"><button type="submit">Add Product</button></form>')
})

app.post('/user-details', (req,res) => {
    const userName = req.body.username
    fs.appendFile('./message.txt', `${userName} Logged in\n`, (err) => { 
        if(err) console.log(err);
    })
    
    res.redirect('/')
})

app.post('/chat-message', (req,res) => {
    const chat = req.body.message
    const uname = req.body.username
    fs.appendFile('./message.txt', `${uname}: ${chat}\n`, (err) => {
        if(err)throw err;
    })
    res.redirect('/')
})

app.get('/', (req,res) => {
    fs.readFile('./message.txt',"utf-8", (err,data) => {
        if(err) throw err;
        const text = data + '<form action="/chat-message" onsubmit="document.getElementById(`username`).value = localStorage.getItem(`username`);" method="POST"><input type="text" name="message"><input type="text" name="username" id="username"><button type="submit">send</button></form>'
        res.send(text)
    })
})
app.listen(3000);