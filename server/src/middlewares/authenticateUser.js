// middleware/authenticateUser.js
import jwt from 'jsonwebtoken';
import User from '../models/schema.js'; // Adjust the path as necessary

const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });

        req.user = user; // ⬅️ attach user to request
        next(); // ⬅️ move to the next middleware/controller
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

export default authenticateUser;
