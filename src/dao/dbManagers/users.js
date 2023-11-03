import { createHash } from '../../utils/bycript.js';
import usersModel from '../models/users.models.js'
import nodemailer from 'nodemailer'

export default class Users{

    constructor(){
        //console.log('Trabajando con usuarios en mongoDB')
    }

    getUsers= async() => {
        let users = await usersModel.find().lean()
        return users;
    }

    getUserById = async(id) => {
        let user = await usersModel.findOne({_id: id})
        return user;
    }

    getUserByEmail = async (email) => {
        let user = await usersModel.findOne({ email: email })
        return user
    }

    getUserByEmailAndPass = async (email, password) => {
        let user = usersModel.findOne({ email: email, password: password })
        return user
    }

    createUser = async (user) => {
        let result = await usersModel.create(user)
        return result
    }

    updateUser = async (id, user) => {
        let result = []
        const exist = await this.getUserById(id)
        if(exist)
            result = await usersModel.updateOne({_id: id}, user)
        else
            result = false
        return result
    }

    updateUserbyEmail = async (email, user) => {
        let result = []
        const exist = await this.getUserByEmail(email)
        if(exist)
            result = await usersModel.updateOne({email: email}, user)
        else
            result = false
        return result
    }

    deleteUser = async (id) => {
        let result = []
        const exist = await this.getUserById(id)
        if(exist)
            result = await usersModel.deleteOne({_id: id})
        else
            result = false
        return result
    }

    deleteInactiveUsers = async () =>{
        try {
            const idleTimeAllowed = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            const deletedUsers = await this.model.find({ last_connection: { $lt: idleTimeAllowed } });
            await usersModel.deleteMany({ last_connection: { $lt: idleTimeAllowed } });

            for (const user of deletedUsers) {
                const mailOptions = {
                    from: 'Ecommerce',
                    to: user.email,
                    subject: 'Se ha eliminado tu cuenta debido a inactividad',
                    html: `
                    <div style="background-color: black; color: green; display: flex; flex-direction: column; justify-content: center;  align-items: center;">
                    <h2>Tu cuenta ha sido eliminada!</h2>
                    </div>`
                }
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.MAILING_USER,
                        pass: process.env.MAILING_PASSWORD,
                        authMethod: 'LOGIN',
                    },
                })

                await transporter.sendMail(mailOptions);
            }   
            return true
        } catch (error) {
            req.logger.error("El mail del usuario no es válido");
            return false
        }
    }

    swapRole = async(id)=>{
        let result=[]
        const user = await this.getUserById(id)
        if (user.role === "user"){
            user.role = "premium"
            result = await usersModel.updateUserbyEmail.editOne(user.email, user)
            return result
        }
        if (user.role === "premium"){
            user.role = "user"
            result = await usersModel.updateUserbyEmail.editOne(user.email, user)
            return result
        }
    }

    recovery = async(req,res,next)=>{
        try {
            const {email} = req.body;
            req.logger.debug("Pre nodemailer")
            try {
                transport.sendMail({from: 'danicis99@gmail.com',
                to: email,
                subject: 'Reestablece tu contraseña',
                html: `
                <div style="background-color: black; color: green; display: flex; flex-direction: column; justify-content: center;  align-items: center;">
                    <h3>Para reestablecer tu contraseña haz click <a href="http://localhost:8080/resetPassword">aqui</a></h3>
                </div>
                `});
            } catch (error) {
                return res.send({status: "error", message: "El email es inválido"})
            }
            res.send({status: "Ok", message: "email enviado"});
        } catch (error) {
            next(error)
        }
    }

    resetPassword = async(req,res)=>{
        const {email,password} = req.body;
        if(!email||!password)
            return res.status(400).send({ status:"error", error:"Valores incompletos"})
        const user = await usersModel.findOne({email})
        if(!user) 
            return res.status(404).send({status:"error",error:"Usuario no encontrado"})
        const newHashedPassword = createHash(password)
        await usersModel.updateOne({_id: user._id}, {$set: {password:newHashedPassword}})
        res.send({ status:"success", message:"Contraseña restaurada"})
    }
}