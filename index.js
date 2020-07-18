const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://saksham:Saksham@123@cluster0.o4rhl.mongodb.net/<dbname>?retryWrites=true&w=majority',
    { useNewUrlParser: true }).then(() => { console.log('Connected') })
    .catch((error) => { console.log(error) })

app.get('/', (req, res) => {
    res.send('hello!!')
})

app.listen(5000)