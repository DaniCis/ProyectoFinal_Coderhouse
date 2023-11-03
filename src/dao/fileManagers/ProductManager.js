import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class ProductManager {

    constructor(path){
        this.path = path
        this.products = []
    }

    getProducts = async()=>{    
        const archivo = path.join(__dirname, this.path)
        if(fs.existsSync(archivo)){
            const datos = await fs.promises.readFile(archivo,'utf-8')
            this.products = JSON.parse(datos)
            return this.products
        }else{
            console.log('ERROR: File does not exists.')
        }
    }

    getProductById = async (id) => {
        this.products = await this.getProducts()
        const found = this.products.find(product => product.id === id)
        if(found)
            return found
        else{
            return null
        }
    }

    addProduct = async(producto) => {
        if (!producto.title || !producto.description || !producto.price || !producto.status || !producto.code || !producto.stock || !producto.category){
            console.log("ERROR: All fields are required")
            return null
        }
        this.products = await this.getProducts()
        if(this.products.length === 0 )
            producto.id = 1
        else
            producto.id = this.products[this.products.length -1].id + 1
        const existingCode = this.products.find(product => product.code === producto.code)
        if (existingCode) {
            console.log(`ERROR: Code ${producto.code} is already in use`)
            return null
        }
        this.products.push(producto)
        const archivo = path.join(__dirname, this.path)
        await fs.promises.writeFile(archivo, JSON.stringify(this.products,null,'\t'))
    }

    updateProduct = async(id, producto) =>{
        this.products = await this.getProducts()
        const index = this.products.findIndex((p) => p.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...producto };
            const archivo = path.join(__dirname, this.path)
            await fs.promises.writeFile(archivo, JSON.stringify(this.products,null,'\t'))
        }else{
            console.log(`ERROR: Not Found. Can't update product with Id: ${id}`)
            return null
        }
    }

    deleteProduct = async (id) => {
        const exist = await this.getProductById(id)
        if(exist){
            this.products = await this.getProducts()
            const temp = this.products.filter(item => item.id !== id)
            this.products = temp
    
            const archivo = path.join(__dirname, this.path)
            await fs.promises.writeFile(archivo, JSON.stringify(this.products,null,'\t'))
        }else{
            return nul
        }
    }
}