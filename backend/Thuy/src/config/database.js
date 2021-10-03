const mongoose = require('mongoose');
//================================
const url1 = "mongodb+srv://socket_io:thuy1234@cluster0.uhkg4.mongodb.net/socket_io?retryWrites=true&w=majority";
const url = "mongodb+srv://socket_io:thuy1234@cluster0.uhkg4.mongodb.net/socket_io?retryWrites=true&w=majority"

//================================
const options = {
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};
async function connect(){
    try {
        await mongoose.connect(url);
        console.log('Success Connected');
    } catch (error) {
        console.log(error);
    }
}
module.exports ={connect};
