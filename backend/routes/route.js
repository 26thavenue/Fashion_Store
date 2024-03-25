const express = require('express')

const router = express.Router()

const authRouter = require('./authRoute')
const productRouter = require('./productRoute')
const cartRouter = require('./cartRoute')
const contactRouter = require('./contactRoute')
const feedbackRouter = require('./feedbackRoute')
const  userRouter = require('./userRoute')
const orderRouter = require('./orderRoute')

router.get('/', (req, res) => {
    res.json('Inside the api route...')
})

router.use('/auth', authRouter)
router.use('/products', productRouter)
router.use('/cart', cartRouter)
router.use('/contact', contactRouter)
router.use('/feedback', feedbackRouter)
router.use('/user', userRouter)
router.use('/order', orderRouter)



module.exports = router