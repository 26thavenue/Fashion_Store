const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
    // console.log('Entering authMiddleware');
    const authHeader = req.headers.authorization;
    
     if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    

    if (!token) {
         return res.status(401).json({ message: 'Unauthorized' }); // Directly send the response
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        

        const user = await prisma.user.findFirst({
            where: {
                id: payload.id
            }
        });

        if (!user) {
             return res.status(401).json({ message: 'Unauthorized' }); // Directly send the response
        }

        req.user = user;
        next();

    } catch (error) {
         return res.status(403).json({ message: 'Unauthorized' }); // Directly send the response
    }
};

module.exports = authMiddleware;
