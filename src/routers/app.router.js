import { Router } from 'express'
import usersRouter from './users.router.js'
import productsRouter from './products.router.js'
import messagesRouter from './messages.router.js'
import cartsRouter from './carts.router.js'
import viewRouter from './views.router.js'
import sessionRouter from './sessions.router.js'

const router = Router ()

router.use('/api/users', usersRouter)
router.use('/api/products',productsRouter)
router.use('/api/messages',messagesRouter)
router.use('/api/carts',cartsRouter)
router.use('/',viewRouter)
router.use('/api/session', sessionRouter)

export default router