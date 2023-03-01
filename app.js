const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const apiRouter = require('./routes/api')

require('dotenv').config()
const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI
const MONGO_ATLAS_URI = process.env.MONGO_ATLAS_URI
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.set('strictQuery', true);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB connected: ${conn.connection.host}`)
        app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

connectDB()

app.use(apiRouter)

app.use((err, req, res, next) => {
    if (err.message.substring(0, 4) === 'Cast') {
        res.json("That model or make doesn't exist.")
    } else {
        res.json(err.message)
    }
})


