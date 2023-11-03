import {Router} from 'express'
import productsController from '../controllers/products.controller.js'
import {userRole} from '../middlewares/userRole.js'

const router = Router ()

router.get('/', productsController.getProducts)
router.get('/:pid', productsController.getProductById)
router.post('/', userRole,productsController.createProduct)
router.put('/:pid',userRole, productsController.updateProduct)
router.delete('/:pid', userRole,productsController.deleteProduct)

export default router