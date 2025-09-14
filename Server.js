const express = require('express')
const cors = require('cors')
const app = express()
const formRoutes = require('./src/server/routes/formRoutes')

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json())

app.use('/api', formRoutes)

const port = 5000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})