const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url)
}

mongoose.connection.on('error', error => {
    console.log(error)
}) 

mongoose.connection.on('disconnected', () => console.log('Server disconnected from MongoDB'))

module.exports = connectDB;
