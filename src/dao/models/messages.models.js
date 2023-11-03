import mongoose from "mongoose";

const messagesCollection = 'messages'
const messagesSchema = mongoose.Schema({
    user: String,
    message: String,
})

const messagesModel = mongoose.model(messagesCollection,messagesSchema)
export default messagesModel;