const mongoose = require('mongoose')

let obj = {


    email: {
        type: String,
        required: true
    },

    password: {

        type: String,
        required: true
    }
}

const auth = mongoose.model('auth', obj);

module.exports = auth;