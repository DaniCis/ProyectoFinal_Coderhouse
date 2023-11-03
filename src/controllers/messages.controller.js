import {messageService }from '../services/index.js'

class MessageController{
    
    getMessages = async (req,res) =>{
        try{
            const result = await messageService.getMessages()
            res.send({ status:"success", payload: result})
        }catch(e){
            console.log(e)
            //res.status(400).send({status:"Error", error: `Failed to load messages. ${e.message}`})
        }
    }
    getMessageById = async (req,res) =>{
        try{
            const id = req.params.pid
            const result = await messageService.getMessageById(id)
            res.send({ status:"success", payload: result})
        }catch(e){
            console.log(e)
            //res.status(400).send({status:"Error", error: `Failed to load messages. ${e.message}`})
        }
    }

    createMessage = async(req,res)=>{
        try{
            const {message }= req.body
            const result = await messageService.createMessage(message)
            res.send({ status:"success", payload: result})
        }catch(e){
            console.log(e)
            //res.status(400).send({status:"Error", error: `Failed to add messages. ${e.message}`})
        }
    }
}

export default new MessageController()