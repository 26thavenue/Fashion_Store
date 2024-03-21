const express = require('express')

const router = express.Router()

const authRouter = require('./authRoute')

router.get('/', (req, res) => {
    res.json('Inside the api route...')
})

router.use('/auth', authRouter)

module.exports = router