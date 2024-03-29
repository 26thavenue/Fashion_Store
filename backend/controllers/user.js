const {PrismaClient} = require('@prisma/client')
const {hashSync, compareSync} = require('bcrypt')


const prisma = new PrismaClient();

const getAllUsers = async(req, res) => {
    try {
        const users = await prisma.user.findMany()
        return res.json(users).status(200)
    } catch (error) {
        console.log(error);
    }
}

const getOneUser = async(req, res) => {
    const {id} = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {id: id}
        })
        return res.json(user).status(200)
    } catch (error) {
        console.log(error);
    }
}

 const updateUser = async(req, res) =>{
    const userId = req.user?.id;
    const { oldPassword,password} = req.body;

    if(!userId){
        return res.json({message:'User not found'}).status(404)
    }
    if( !password || !oldPassword){
        return res.json({message:'Old Password is required'}).status(404)
    }

    

    const user = await prisma.user.findFirst({
        where: {id:userId}
    })

    if(!user){
        return res.json({message:'User not found'}).status(404)
    }

    
   

    try {
        const isPasswordValid = compareSync(oldPassword, user.hashedPassword);

        if(!isPasswordValid){
            return res.json({message:'Old password is incorrect'}).status(400)
        }

         if (compareSync(password, user.hashedPassword)) {
            return res.json({ message: 'New password must be different from the old one' }).status(400);
        }
        
        const updatedUser = await prisma.user.update({
            where: {id:userId },
            data: {
                hashedPassword: hashSync(password,10),
            }
        })
        return res.json(updatedUser).status(200)
    } catch (error) {
        console.log(error)
        return res.json({message:'Error updating user'}).status(500)
    }

   
}

module.exports = {
    getAllUsers,
    getOneUser,
    updateUser
};