import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import ProductManager from './ProductManager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

const manager = new ProductManager('../../data/productos.json')

export default class CartManager {
    
    constructor(path){
        this.path = path
        this.carts = []
    }

    getCarts = async()=>{
        const archivo = path.join(__dirname, this.path)
        if(fs.existsSync(archivo)){
            const datos = await fs.promises.readFile(archivo,'utf-8')
            this.carts = JSON.parse(datos)
            return this.carts
        }else{
            console.log('ERROR: File does not exists.')
        }
    }
    
    getCartById = async(id)=>{
        this.carts = await this.getCarts()
        const found = this.carts.find(cart => cart.id === id)
        if(found)
            return found
        else{
            return null     
        }
    }

    createCart = async()=>{
        let id = 0
        this.carts = await this.getCarts()
        if(this.carts.length === 0 )
            id = 1
        else
            id = this.carts[this.carts.length -1].id + 1
        
        const newCart = {
            id: id,
            products: []
        };
        this.carts.push(newCart)
        const archivo = path.join(__dirname, this.path)
        await fs.promises.writeFile(archivo, JSON.stringify(this.carts,null,'\t'))
        return newCart;
    }

    addProductToCart = async(cartId, productId)=>{
        const cart = await this.getCartById(cartId)
        if(cart){
            const validProductId = await manager.getProductById(productId)
            if(validProductId){
                const existingProduct = cart.products.find(product => product.id === productId)
                if (existingProduct) {
                    existingProduct.quantity += 1
                } else {
                    const newProduct = {
                        id: productId,
                        quantity: 1
                    };
                    cart.products.push(newProduct);
                }
                const archivo = path.join(__dirname, this.path)
                await fs.promises.writeFile(archivo, JSON.stringify(this.carts,null,'\t'))
            }else{
                console.log(`Product ${productId} not found`)
                return null
            }
        }else{
            console.log(`Cart ${cartId} does not exist`)
            return null
        }
    }
}