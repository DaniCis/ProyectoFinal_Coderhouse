import {Router} from 'express'
import UsersController from '../controllers/users.controllers.js'

const router = Router ()

router.get('/', UsersController.getUsers)
router.get('/:uid', UsersController.getUserById)
router.post('/', UsersController.createUser)
router.put('/uid', UsersController.updateUser)
router.delete('/:uid',UsersController.deleteUser)
router.delete('/', UsersController.deleteInactiveUsers)
router.post('/premium/:uid',UsersController.swapUserRole)
router.get('/documents', UsersController.getUserDocuments)

export default router