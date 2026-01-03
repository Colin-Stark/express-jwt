const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT

/* Router Imports */
const registerRouter = require('./routes/register')
const login = require('./routes/login')
const protectedRouter = require('./routes/protectedRoute')



/* Middlewares */
app.use(express.json())
app.use(cors())

/* Routes */
app.use('/register', registerRouter)
app.use('/login', login)
app.use('/protected', protectedRouter)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Express server with JWT BY COLLINS OLOKPEDJE' })
})


module.exports = app
