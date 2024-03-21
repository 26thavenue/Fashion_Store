const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./routes/route')

dotenv.config()

const app = express()

app.use(express.json())

app.use(morgan('tiny'))

app.use(cors())

app.use('/api', router)


const PORT = process.env.PORT || 3300

app.get('/', (req, res) => {
    res.json('API is running...')
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})