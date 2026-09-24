import { getAuth } from "firebase-admin/auth"
import { app } from "../config/firebase.js"
import User from "../models/user.model.js"


const login = async (req, res) => {
    try {
        const { token } = req.body
        const decoded = await getAuth(app).verifyIdToken(token)

        // checking if User UID already Exists 
        let user = await User.findOne({ firebaseUid: decoded.uid })

        if(!user) { 
            // If user doesn't exist, create a new user
            user = await User.create({
                firebaseUid: decoded.uid,
                email: decoded.email,
                name: decoded.displayName,
                avatar: decoded.photoURL,

            })  
            
        }
        const sessionId = crypto.randomUUID()

        res.cookie("session", sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        })
        
        return res.status(200).json({message: "User logged in successfully", user})
        
            
    } catch (error) {
        return res.status(500).json({message: `Login error: ${error.message}`})
    }
}


export { login }