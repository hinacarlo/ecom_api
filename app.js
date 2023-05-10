require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const morgan = require('morgan')
const connectDB = require('./db/connect')


const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req,res) => {
    res.send('e-commerce api')
})

app.use(notFound)
app.use(errorHandler)


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

