import { ticketService }from '../services/index.js'

class TicketController{
    getTickets = async (req,res) =>{
        try{
            const result = await ticketService.getTickets()
            res.send({ status:"success", payload: result})
        }catch(e){
            res.status(400).send({status:"Error", error: `Failed to load tickets. ${e.message}`})
        }
    }
    getTicketById = async (req,res) =>{
        try{
            const tid = req.params.cid
            const result = await ticketService.getTicketById(tid)
            res.send({ status:"success", payload: result})
        }catch(e){
            res.status(400).send({status:"Error", error: `Failed to load ticket. ${e.message}`})
        }
    }

    createTicket = async(req,res)=>{
        try{
            const {ticket}= req.body
            const result = await ticketService.createTicket(ticket)
            res.send({ status:"success", payload: result})
        }catch(e){
            res.status(400).send({status:"Error", error: `Failed to create ticket. ${e.message}`})
        }
    }
    deleteTicket = async (req,res) =>{
        try{
            const tid = req.params.cid
            const result = await ticketService.deleteTicket(tid)
            res.send({ status:"success", payload: result})
        }catch(e){
            res.status(400).send({status:"Error", error: `Failed to delete ticket. ${e.message}`})
        }
    }
}
export default new TicketController()