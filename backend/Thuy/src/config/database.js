const mongoose = require("mongoose")
const dotenv = require("dotenv")
const { resolve } = require("path")
//================================
dotenv.config({
  path: resolve(__dirname, "../../../../.env"),
})

const url1 = process.env.DB_URL1
const url = process.env.DB_URL

//================================
const options = {
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
}
async function connect() {
  try {
    await mongoose.connect(url || "")
    console.log("Success Connected")
  } catch (error) {
    console.log(error)
  }
}
module.exports = { connect }
