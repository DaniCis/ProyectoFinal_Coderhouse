import { Router } from "express";
import cartsController from '../controllers/carts.controller.js'
import messagesController from '../controllers/messages.controller.js'
import productsModel from "../dao/models/products.models.js";
import mongoose from "mongoose";
import { generateProducts } from "../utils/fakerProducts.js";
import usersControllers from "../controllers/users.controllers.js";
import { userService } from "../services/index.js";

const router = Router()

router.get('/products', async (req,res) => {
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
        const user = req.session.user
        if (user) {
            const products = await productsModel.paginate(filter,options)
            res.render('products',{     
                user: user,
                products: products.docs, 
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.hasPrevPage ? `http://localhost:8080/products?page=${products.prevPage}` : '',
                nextLink: products.hasNextPage ? `http://localhost:8080/products?page=${products.nextPage}` : ''
            })
        } else {
            res.redirect('/');
        }
})
  
router.get('/carts/:cid', async(req,res) => {
    try{
        const id  = req.params.cid
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(400).send('ID de carrito no válido')
        let cart = await cartsController.getCartById(id)
        if (!cart || cart.length === 0) 
            return res.status(404).send('Carrito no encontrado')
        if(cart.products.length === 0)
            return res.status(404).send('Carrito vacio')
            const data = {
                products: cart.products.map((product) => ({
                    quantity: product.quantity,
                    title: product._id.title,
                    description: product._id.description,
                    price: product._id.price,
                })),
            }
        res.render('carts', {data})
    }catch(e){
        console.error(e)
    }
})

router.get("/chat", async(req, res) => {
    let messages = await messagesController.getMessages()
	res.render("chat", {messages})
})

router.get("/register", (req, res) => {
    res.render("register")
})
  
router.get("/", (req, res) => {
    res.render("login")
})
  
router.get("/profile", (req, res) => {
    if (req.session.user) {
        res.render("profile", {
            user: req.session.user,
        })
    } else 
        res.redirect('/')
})

router.get('/resetPassword',(req,res)=>{
    res.render('resetPassword')
})

router.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(!err){
            res.redirect('/')
        }
        else res.send({status:'error', message: 'Problema al cerrar sesion'})
    })
})

router.get('/mockProducts',(req,res)=>{
    let products = []
    for (let i = 0; i < 100; i++) {
        products.push(generateProducts())
    }
    res.send({ status: "success", payload: products });
})


router.get('/viewUsers',async (req,res)=>{
    let users = await userService.getUsers() 
    if(users !== null)
        res.render("viewUsers", users)
})
export default router;