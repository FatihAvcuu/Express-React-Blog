var express = require('express');
var app = express();
var path = require('path');
var leon = require('./leon');
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//check database folder
leon();

app.get('/', (req, res) => {
    res.send('Database Working');
})

app.post('/auth', (req, res) => {
    let name = req.query.name;
    let pw = req.query.pw;
    leon.Auth(name, pw, (auth, user) => {
        res.send(JSON.stringify(user));
    });
})

app.post('/createuser', (req, res) => {
    let name = req.query.name;
    let pw = req.query.pw;
    let email = req.query.email;
    leon.CreateUser(name, email, pw, (auth, user) => {
        res.send(JSON.stringify(user));
    });
})

app.post('/api/addblog', (req, res) => {
    const { title, banner, description, md, uid, name } = req.body;
    leon.CreateBlog(title, banner, description, md, uid, name, (stt, ret) => {
        res.status(stt).send(ret);
    })
})

app.get('/api/getblog', (req, res) => {
    leon.Getblog((stt, ret) => {
        res.status(stt).send(ret);
    })
})

app.get('/api/blog', (req, res) => {
    let blogId = req.query.id;
    leon.GetblogId(blogId, (stt, ret) => {
        res.status(stt).send(ret);
    })
})

app.delete('/api/blog', (req, res) => {
    const { id, uid, name } = req.body;
    leon.DeleteBlog(id, uid, name, (stt, ret) => {
        res.status(stt).send(ret);
    })
})

app.put('/api/blog', (req, res) => {
    const { id, uid, name, title, banner, description, md } = req.body;
    leon.UpdateBlog(title, banner, description, md, uid, name,id, (stt, ret) => {
        res.status(stt).send(ret);
    })
})


app.listen(process.env.PORT || 8000)