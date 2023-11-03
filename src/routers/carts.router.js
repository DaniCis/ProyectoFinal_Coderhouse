import {Router} from 'express'
import CartsController from '../controllers/carts.controller.js'
import { isUser } from "../middlewares/isUser.js";

const router = Router ()

router.get('/', CartsController.getCarts)
router.post('/', CartsController.createCart)
router.get('/:cid', CartsController.getCartById)
router.put('/cid', CartsController.updateCart)
router.delete('/:cid',isUser,CartsController.deleteAllProductsInCart)
router.post('/:cid/products/:pid', isUser,CartsController.addProductToCart)
router.put('/:cid/products/:pid',isUser,CartsController.updateQuantity)
router.delete('/:cid/products/:pid',isUser,CartsController.deleteProductInCart)
router.post('/:cid/purchase', CartsController.purchaseCart);

export default router