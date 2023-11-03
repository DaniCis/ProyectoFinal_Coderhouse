import{ productService} from '../services/index.js'
import productsModel from '../dao/models/products.models.js'
import { CustomError, generateErrorInfo } from '../utils/errors.js';

class ProductController{
    getProducts =async(req,res)=>{
        try{
            const {limit = 10, page = 1, sort , query} = req.query
            const filter ={}
            if (query) {
                filter.$or = [
                    { category: query },
                    { status: query === 'true' ? true : false } 
                ]
            }   
            const options = {
                limit: parseInt(limit),
                page: parseInt(page),
                sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : undefined,
                lean: true
            }
            const products = await productsModel.paginate(filter,options)
            res.send({ 
                status:"Success", 
                payload: products.docs, 
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : '',
                nextLink: products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : ''
            })
        }catch(e){
            res.status(400).send({status:"Error", error: `Failed to load products. ${e.message}`})
        }
    }

    getProductById=async(req,res)=>{
        try{
            const id = req.params.pid
            let product = await productService.getProductById(id)
            if(product) 
                res.send({ status:"Success", payload: product})
            else
                res.status(400).send({status:"Error", error: `Product with ID ${id} not found`})
        }catch(e){
            res.status(400).send({status:"Error", error: `Failed to find product. ${e.message}`})
        }
    }

    createProduct = async(req,res)=>{
        try{
            const { title, description, code, price, stock, category, thumbnails } = req.body
            if (!title || !description || !code || !price || !stock || !category){
                CustomError.createError({
                    statusCode: 401, 
                    name: "All fields are required to add a product", 
                    cause: generateErrorInfo.missingInfo(), 
                    code: 3
                })
            }
            let newProduct ={
                title,description,code,price,stock,category,thumbnails
            }
            const result = await productService.createProduct(newProduct)
            res.send({ status:"Success", payload: result})
        }catch(e){
            res.status(400).send({status:"Error", error: `Failed to add product. ${e.message}`})
        }
    }

    updateProduct = async(req,res)=>{
        try{
            const id = req.params.pid
            const { title, description, code, price, stock, category, thumbnails } = req.body
            if (!title || !description || !code || !price || !stock || !category)
                return res.status(200).send({status:"Error", error: "All fields are required to update a product"});
            let newProduct ={
                title,description,code,price,stock,category,thumbnails
            }
            const result = await productService.updateProduct(id, newProduct)
            if(result)
                res.send({ status:"Success", payload: result})
            else
                res.status(400).send({status:"Error", error: `Can't update. Product with ID ${id} not found`})
        }catch(e){
            res.status(400).send({status:"Error", error: `Failed to update products. ${e.message}`})
        }
    }

    deleteProduct = async(req,res)=>{
        try{
            const id = req.params.pid
            const result = await productService.deleteProduct(id)
            if(result)
                res.send({ status:"Success", payload: result})
            else
                res.status(400).send({status:"Error", error: `Can't delete. Product with ID ${id} not found`})
        }catch(e){
            res.status(400).send({status:"Error", error: `Failed to delete product. ${e.message}`})
        }
    }
}
export default new ProductController()