const { Schema, model } = require('mongoose')
const moment = require('moment')

let dataNow = moment().format('MMMM Do YYYY, h:mm:ss a');


const createSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    imgDownload: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    date: {
        type: String,
        default: dataNow
    }

})


module.exports = model('Create', createSchema)