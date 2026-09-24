import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.route.js"

dotenv.config()

const port = process.env.PORT 

const app = express()

app.use(express.json())
app.use("/", authRoutes)

app.get("/", (req, res) => {
    res.json({message: "Hello from Auth"})
})

//Connecting to DB 
await connectDB()


app.listen(port, ()=> {
    console.log(`Auth is running on port ${port}`)
})

