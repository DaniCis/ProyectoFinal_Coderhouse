import mongoose from "mongoose";

const ticketsCollection = 'tickets'
const ticketsSchema = mongoose.Schema({
    code: {
      type: String,
      unique: true
    },
    amount:{
      type:Number,
      required: true
    },
    purchase_datetime: {
      type: String,
      required:true
    },
    purchaser: {
      type:String,
      required:true
    },
  })
  
  const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema)
  export default ticketsModel;