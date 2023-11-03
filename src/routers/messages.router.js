import {Router} from 'express'
import MessagesController from '../controllers/messages.controller.js'
import { isUser } from "../middlewares/isUser.js";

const router = Router ()

router.get('/', MessagesController.getMessages)
router.post('/', isUser,MessagesController.createMessage)

export default router