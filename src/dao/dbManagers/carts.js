import cartsModel from '../models/carts.models.js'
import productsModel from '../models/products.models.js'

export default class Carts{

    constructor(){
        //console.log('Trabajando con carritos en mongoDB')
    }

    getCarts = async() => {
        const carts = await cartsModel.find({}).populate({
            path: "products",
            populate: { path: "_id", model: "products" },
          }).lean()
        return carts;
    }

    getCartById = async(id) => {
        let cart = await cartsModel.findOne({_id: id}).populate({
            path: "products",
            populate: { path: "_id", model: "products" },
        }).lean()
        return cart;
    }

    createCart = async (cart) => {
        let result = await cartsModel.create(cart)
        return result
    }

    addProductToCart = async (cartId,productId) => {
        let result = []
        const cart = await this.getById(cartId)
        if(cart){
            const validProduct = await productsModel.find({_id: productId })
            if(validProduct.length > 0){
                const existingProductIndex = cart.products.findIndex((product) => product._id._id.valueOf() === productId)
                if (existingProductIndex !== -1) 
                    cart.products[existingProductIndex].quantity += 1
                else {
                    const newProduct = { _id: productId, quantity: 1 }
                    cart.products.push(newProduct)
                }
                result = await cartsModel.updateOne({ _id: cartId }, { $set: { products: cart.products } })
            }else
                result = false
        }
        else
            result = false
        return result
    }

    updateCart = async (cartId, products) => {
        let result = []
        const exist = await this.getCartById(cartId)
        if(exist){
            result = await cartsModel.findByIdAndUpdate( cartId, {
                products: products,
            })
        }else
            result = false
        return result
    }

    updateQuantity = async (cartId, productId, cantidad) => {
        let result = []
        const cart = await this.getCartById(cartId)
        if(cart){
            const productIndex = cart.products.findIndex(product => product._id._id.valueOf() === productId)
            if (productIndex === -1) 
                return result = false
            cart.products[productIndex].quantity = cantidad
            result = await cartsModel.updateOne({ _id: cartId}, { $set: cart })
        }else
            result = false
        return result
    }

    deleteProductInCart = async (cartId, productId)=>{
        let result = []
        const cart = await this.getCartById(cartId)
        if(cart){
            const productIndex = cart.products.findIndex(product => product._id._id.valueOf() === productId)
            if (productIndex === -1) 
                return result = false
            cart.products.splice(productIndex, 1)
            result = await cartsModel.updateOne({ _id: cartId}, { $set: cart });
        }else
            result = false
        return result
    }

    deleteAllProductsInCart = async (id) => {
        let result = []
        const cart = await this.getCartById(id)
        if(cart){
            result = await cartsModel.updateOne({ _id: id }, { $set: { products: [] } })
        }            
        else
            result = false
        return result
    }
}