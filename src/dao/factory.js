import CONFIG from "../config/config.js"
import mongoose from 'mongoose';

const{ DATASOURCE, MONGO_URI } = CONFIG

export let users, carts, products, tickets, messages, connection;

switch (DATASOURCE) {
    case "MONGO":
        connection = mongoose.connect(MONGO_URI);
        const {default: usersMongo} = await import('./dbManagers/users.js')
        const {default: cartsMongo} = await import('./dbManagers/carts.js')
        const {default: productsMongo} = await import('./dbManagers/products.js')
        const {default: ticketsMongo} = await import('./dbManagers/tickets.js')
        const {default: messagesMongo} = await import('./dbManagers/messages.js')
        users = usersMongo;
        carts = cartsMongo;
        products = productsMongo;
        tickets = ticketsMongo;
        messages = messagesMongo;
        break;
    case "MEMORY":
        const {default: cartsMemory} = await import('./fileManagers/CartManager.js')
        const {default: productsMemory} = await import('./fileManagers/ProductManager.js')
        carts = cartsMemory;
        products = productsMemory;
        break;
}