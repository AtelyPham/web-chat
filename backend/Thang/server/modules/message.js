const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    // id: {
    //     type: number,
    // },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Msg = mongoose.model('msg',msgSchema);
module.exports = Msg;