const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI



const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("database connection established")
    }).catch((error) => {
        console.log("database connection error", error)
    })

}



module.exports = dbConnect