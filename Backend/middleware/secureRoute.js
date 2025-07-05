import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const secureRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message:  "Not authorized" });
        }
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        if (!verified) {
            return res.status(403).json({ message: "Invalid token" });
        }
        const user = await User.findById(verified.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export default secureRoute;
