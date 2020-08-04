const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')

const { User } = require('./model/user')

mongoose.connect(config.mongoURI,
    { useNewUrlParser: true }).then(() => { console.log('Connected') })
    .catch((error) => { console.log(error) })

app.get('/', (req, res) => {
    res.send('hello!!')
})


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())


app.get('/', (req, res) => {
    res.json({ "hello~": "saksham" })
})


app.post('/api/users/register', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(200).json({ success: true, user })
    }).catch((err) => {
        res.status(400).json({ success: false, err })
    })
})


app.listen(5000)