
const {PrismaClient} = require('@prisma/client')


const prisma = new PrismaClient();

const createContact = async (req, res) => {
    const {email, name, message } = req.body

    if(!email || !name || !message){
        return res.json({message:'Invalid feeback !!!!'}).status(400)
    }

    try {
         await prisma.contact.create({
            data:{
                email,
                name,
                message
            }
        })
        return res.json({message:'Your message has been received'}).status(201)
    } catch (error) {
        console.log(error)
        return res.json({message:'Error creating contact form'}).status(500)
    }
}

const getAllContactDetails = async (req, res) => {
    const allContact = await prisma.contact.findMany()
    if(!allContact){
        return res.json({message:'No messages'}).status(404)
    }
    return res.json(allContact).status(200)
}


module.exports = {
    createContact,
    getAllContactDetails
};