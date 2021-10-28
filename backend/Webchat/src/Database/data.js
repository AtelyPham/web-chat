
const mongoose = require('mongoose');
const URL = "mongodb+srv://vanthang559:0353880152Thang@socketdb.djpab.mongodb.net/message-database?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('Connected database from mongodb');
        })
    }catch(error){console.log("Connect Failed");};
}
module.exports = { connect }
