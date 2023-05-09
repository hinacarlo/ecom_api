const express = require('express')
const connectDB = require('./db/connect')

const app = express()

require('dotenv').config()


const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

start()

