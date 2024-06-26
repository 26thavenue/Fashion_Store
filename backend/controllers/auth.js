const {PrismaClient} = require('@prisma/client')
const {hashSync, compareSync, compare} = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


dotenv.config();


const prisma = new PrismaClient();

const login = async(req, res) => {

    try {

        const {email,password} = req.body

        if(!email || !password){
            return res.json({message: 'Please fill all the required fields'}).status(400)
        }
        
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(!user){
            
            return res.json({message: 'Invalid password'}).status(400)
        }
        
        const isPasswordMatch = await compare(password,user.hashedPassword)

        if(!isPasswordMatch){
            
            return res.json({message: 'Invalid password'}).status(403)
            // throw new Error('Invalid password')
        }

        const secret = process.env.JWT_SECRET

        const token = jwt.sign({id: user.id}, secret)

        return res.json({user,token})
        
    } catch (error) {
        console.log(error)
    }
    
}


const signUp = async(req, res) => {
    const {email,password,name} = req.body

    if(!email || !password || !name){
        
        return res.json({message: 'Please fill all the required fields'}).status(400)
    }

    const checkForDuplicateEmail = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    
    if(checkForDuplicateEmail){
        return res.json({message: 'Email already exists'}).status(400)
    }

    const user = await prisma.user.create({
        data: {
            email: email,
            hashedPassword: hashSync(password,10),
            name: name
        }
    })
    return res.json(user)
}

 const me = async(req, res) => {
    return res.json(req.user)
}

const logOut = async(req, res) => {
    return res.json({message: 'Logged out'})
}
module.exports = {
  login,
  signUp,
  me
};