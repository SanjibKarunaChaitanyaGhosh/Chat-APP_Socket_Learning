import express from 'express'
import 'dotenv/config'
import { DbConnect } from './database/db.js'
import User from './models/userModels.js'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { timeStamp } from 'console'

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())

app.get("/",  (req,res) => {
    res.status(200).json({
        message:"this is your homepage......."
    })
})
app.post("/", async (req,res) => {
    const { name } = req.body
    
    // res.send(name)
    const UserName = await User.findOne({ name })

    if (!UserName) {
        const user =await User.create({
            name: name
        })
        res.status(200).json({
            message: "name saved successfully.......",
            user: user
        })
    }
    
    res.json({
        message : "user already exist"
    })
})


DbConnect()


const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods:["GET","POST"]
    }
})

io.on("connection", (socket) => {
    console.log("user connected..", socket.id)
    

    // receive And BroadCast message
    socket.on("send_message", (data) => {
        console.log(data)
        io.to(data.room).emit("receive_message", {
            message: data.message,
            name: data.name,
            timestamp: new Date()
        })
    })

    // join Chat room
    socket.on("join_room", (room) => {
        socket.join(room)
        console.log(`${socket.id} joined ${room}`)

        socket.to(room).emit("user_joined", {
            message:`${socket.id} joined the room`
        })
    })

    // discoonneting from chat room
    socket.on("disconnect", () => {
        console.log("userDisconnect",socket.id);
        
    })

})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
})