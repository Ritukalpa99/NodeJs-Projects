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
        console.log(err);
    })
    // localStorage.setItem({'user' : userName})
    res.redirect('/')
})

app.get('/', (req,res) => {
    res.send('<h1>Welcome</h1>')
})
app.listen(3000);