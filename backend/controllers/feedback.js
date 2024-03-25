const {PrismaClient} = require('@prisma/client')


const prisma = new PrismaClient();



 const createFeedback = async (req, res) => {
    const {email, name, message } = req.body

    if(!email || !name || !message){
        return res.json({message:'Invalid feeback !!!!'}).status(400)
    }

    try {
         await prisma.feedback.create({
            data:{
                email,
                name,
                message
            }
        })
        return res.json({message:'Feedback created successfully'}).status(201)
    } catch (error) {
        console.log(error)
        return res.json({message:'Error creating feedback'}).status(500)
    }
}

const getAllFeedbacks = async (req, res) => {
    const feedbacks = await prisma.feedback.findMany()
    if(!feedbacks){
        return res.json({message:'No feedbacks found'}).status(404)
    }
    return res.json(feedbacks)
}

module.exports = {
    createFeedback,
    getAllFeedbacks
};