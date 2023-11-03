import ticketsModel from '../models/tickets.models.js'

export default class Tickets{

    constructor(){
        //console.log('Trabajando con tickets en mongoDB')
    }

    getTickets = async() => {
        let tickets = await ticketsModel.find().lean()
        return tickets;
    }

    getTicketById = async(id) => {
        let ticket = await ticketsModel.findOne({_id: id})
        return ticket;
    }

    createTicket = async (ticket) => {
        let result = await ticketsModel.create(ticket)
        return result
    }

    deleteTicket = async (id) => {
        let result = []
        const exist = await this.getTicketById(id)
        if(exist)
            result = await ticketsModel.deleteOne({_id: id})
        else
            result = false
        return result
    }

}