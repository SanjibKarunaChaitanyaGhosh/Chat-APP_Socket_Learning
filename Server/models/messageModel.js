import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps : true
})

const Messages = new mongoose.model("Messages", "messageSchema")

export default Messages