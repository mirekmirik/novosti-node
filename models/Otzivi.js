const { model, Schema } = require('mongoose')
const User = require('./User')
const moment = require('moment')

let dataNow = moment().format('MMMM Do YYYY, h:mm:ss a');

const otziviSchema = new Schema({
    desc: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: dataNow
    }
})


module.exports = model('Otzivi', otziviSchema)