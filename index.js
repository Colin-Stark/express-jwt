const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT

app.get('/', (req, res) => {
    console.log('Express server with JWT BY COLLINS OLOKPEDJE')
    res.status(200).json({ message: 'Express server with JWT BY COLLINS OLOKPEDJE' })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

module.exports = app
