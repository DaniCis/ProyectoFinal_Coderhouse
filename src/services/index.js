import { users, carts, products, tickets, messages } from '../dao/factory.js'
import productRepository from '../dao/repository/products.repository.js'
import userRepository from '../dao/repository/users.repository.js'
import cartRepository from '../dao/repository/carts.repository.js'
import messageRepository from '../dao/repository/messages.repository.js'
import ticketRepository from '../dao/repository/tickets.repository.js'

export const userService = new userRepository(new users())
export const productService = new productRepository(new products())
export const cartService = new cartRepository(new carts())
export const messageService = new messageRepository(new messages())
export const ticketService= new ticketRepository(new tickets())
