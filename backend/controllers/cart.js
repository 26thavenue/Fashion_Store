
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();


 const addItemToCart = async(req, res) => {
    const userId = req.user.id
    // console.log(userId)
    if(!userId){
        return res.json({message:'You are not logged in'}).status(404)
    }
    const {productId, quantity} = req.body
   if(!productId || !quantity || !userId){
        return res.json({message:'Invalid request'})
    }

    const product = await prisma.products.findFirst({
        where: {
            id: productId
        }
    });

    if(!product){
        return res.json({message:'Product not found'})
    }

    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });
    if(!user){
        return res.json({message:'User not found'}).status(404)
    }

    try {
        const newCart = await prisma.cartItems.create({
            data: {
                quantity: quantity,
                userId: userId,
                productId: productId
            }
        })
        return res.json(newCart)
    } catch (error) {
        
    }
}

 const deleteItemFromCart = async(req, res) => {
    const user = req.user
    if(!user){
        return res.json({message:'User not found'}).status(404)
    }
    const item = await prisma.cartItems.findFirst({
        where: {
            AND: [
                { id: req.params.id },
                { userId: user.id } 
            ]
        }
    })
    await prisma.cartItems.delete({
        where: {
            id: req.params.id
        }
    })
    return res.json({message:'Item deleted'}).status(200)
}

 const deleteAllUserCart = async(req, res) => {
    const user = req.user
    if(!user){
        return res.json({message:'User not found'}).status(404)
    }
    await prisma.cartItems.deleteMany({
        where: {
            userId: user.id
        }
    })
    return res.json({message:'Item deleted'}).status(200)
}

const changeQuantity = async(req, res) => {
    const user = req.user
    const {quantity} = req.body
    if(!quantity){
        return res.json({message:'Invalid request'}).status(400)
    }

    await prisma.cartItems.update({
        where: {
            id: req.params.id,
            userId: user?.id
        },
        data: {
            quantity: quantity
        }
    })
    return res.json({message:'Quantity updated'}).status(200)
}

const getUserCart = async(req, res) => {
    const user = req.user
    if(!user){
        return res.json({message:'You are not logged in'}).status(404)
    }
    const checkUser = await prisma.user.findFirst({
        where: {
            id: user.id
        },
        
    })
    if(!checkUser){
        return res.json({message:'User not found'}).status(404)
    }

    const cart = await prisma.cartItems.findMany({
        where: {
            userId: user.id
        },
        include: {
            product: true
        }
    })

    if(!cart){
        return res.json({message:'Cart is empty'}).status(200)
    }
    return res.json(cart).status(200)
}

 const getACartItem = async (req, res) =>{
    const user = req.user
    if(!user){
        return res.json({message:'You are not logged in'}).status(404)
    }
    const checkUser = await prisma.user.findFirstOrThrow({
        where: {
            id: user.id
        },
        
    })
    if(!checkUser){
        return res.json({message:'User not found'}).status(404)
    }

    const cart = await prisma.cartItems.findFirst({
        where: {
            id: req.params.id
        },
        include: {
            product: true
        }
    })

    if(!cart){
        return res.json({message:'No such cart Item'}).status(200)
    }
    return res.json(cart).status(200)
}

module.exports = {
  addItemToCart,
  deleteItemFromCart,
  changeQuantity,
  getUserCart,
  getACartItem,
  deleteAllUserCart
};