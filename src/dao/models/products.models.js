import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products'
const productsSchema = mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  description: {
    type:String,
    required: true
  },
  code: {
    type: String,
    unique: true,
    required: true
  },
  price:{
    type:Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true,
  },
  stock: {
    type:Number,
    required:true
  },
  category: {
    type:String,
    required: true
  },
  owner: {
    type: String,
    default: "Admin"
  },
  thumbnails: Array,
})

productsSchema.plugin(mongoosePaginate)
const productsModel = mongoose.model(productsCollection, productsSchema)
export default productsModel;