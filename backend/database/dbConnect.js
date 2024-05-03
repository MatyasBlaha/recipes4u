const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect(){
    //connect to the database
    mongoose.connect(
        process.env.MONGODB_URL,
        {
        }
    ).then(() => {
        console.log('successfully connected to MongoDB')
    }).catch((err) => {
        console.log(`error connecting to MongoDB: ${err}`)
    })
}

module.exports = dbConnect;