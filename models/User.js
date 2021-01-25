const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otziviId: {
        type: Schema.Types.ObjectId,
        ref: 'Otzivi',
    }
})


module.exports = model('User', userSchema)