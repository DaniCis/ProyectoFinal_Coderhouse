export default class TicketsRepository{
    constructor(dao) {
        this.dao = dao;
    }

    getTicketById(tid){
        return this.dao.getTicketById(tid)
    }

    getTickets(){
        return this.dao.getTickets()
    }
    
    createTicket(ticket){
        return this.dao.createTicket(ticket)
    }

    deleteTicket(ticketId){
        return this.dao.deleteTicket(ticketId)
    }
}