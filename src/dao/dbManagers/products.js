import productsModel from '../models/products.models.js'

export default class Products{

    constructor(){
        //console.log('Trabajando con productos en mongoDB')
    }

    getProducts = async() => {
        let products = await productsModel.find().lean()
        return products;
    }

    getProductById = async(id) => {
        let product = await productsModel.findOne({_id: id})
        return product;
    }

    createProduct = async (product) => {
        let result = await productsModel.create(product)
        return result
    }

    updateProduct = async (id, product) => {
        let result = []
        const exist = await this.getProductById(id)
        if(exist)
            result = await productsModel.updateOne({_id: id}, product)
        else
            result = false
        return result
    }

    deleteProduct = async (id) => {
        let result = []
        const exist = await this.getProductById(id)
        if (exist.owner != 'Admin') email = exist.owner
        if(exist){
            await transport.sendMail({
                from: 'danicis99@gmail.com',
                to: email,
                subject: `Producto ${exist.title} eliminado`,
                html: `
                <div style="background-color: black; color: green; display: flex; flex-direction: column; justify-content: center;  align-items: center;">
                <h1>Se ha borrado tu producto ${exist.title}</h1>
                </div>
                `
            })
            result = await productsModel.deleteOne({_id: id})
        }else
            result = false
        return result
    }

}