import mongoose from "mongoose";

const cartsCollection = 'carts'
const cartsSchema = mongoose.Schema({
    products:{
        type:[
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'products'
                },
                quantity: {
                    type: Number,
                    default: 0,
                },
            }
        ],
        default:[]
    }
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema)
export default cartsModel;