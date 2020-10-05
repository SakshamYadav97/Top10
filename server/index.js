const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')

const { User } = require('./model/user')
const { auth } = require('./middleware/auth')

mongoose.connect(config.mongoURI,
    { useNewUrlParser: true }).then(() => { console.log('Connected') })
    .catch((error) => { console.log(error) })

app.get('/', (req, res) => {
    res.send('hello!!')
})


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())


app.get('/api/user/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    })
})


app.post('/api/users/register', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(200).json({ success: true, user })
    }).catch((err) => {
        res.status(400).json({ success: false, err })
    })
})


app.post('/api/users/login', (req, res) => {

    //find the email
    User.findOne({ email: req.body.email }, (err, userInfo) => {
        if (!userInfo) {
            return res.status(404).json({
                loginSucces: false,
                message: 'User not found'
            })
        }

        //compare password
        userInfo.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(400).json({
                    loginSucces: false,
                    message: 'Incorrect password'
                })
            }
        })

        //generate token
        userInfo.generateToken((err, user) => {
            if (err) return res.status(400).send(err)
            res.cookie("x_auth", user.token).status(200).json({ loginSucces: true, userInfo })
        })
    })
})


app.get('/api/user/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })
})


app.listen(5000)