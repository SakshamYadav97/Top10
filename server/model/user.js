const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 25
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})


userSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)

                user.password = hash
                next()
            })
        })

    } else {
        next()
    }
})


userSchema.methods.comparePassword = function (plainPassword, callBackFunction) {
    const user = this;

    bcrypt.compare(plainPassword, user.password, function (err, isMatch) {
        if (err) {
            return callBackFunction(err, null)
        }

        callBackFunction(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret')

    user.token = token
    user.save((err, user) => {
        if (err) return cb(err);
        cb(null, user)
    })
}


userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, 'secret', function (err, decode) {
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return createImageBitmap(err);

            cb(null, user)
        })
    })
}


const User = mongoose.model('User', userSchema)

module.exports = { User }