import { createHash } from "../utils/bycript.js";
import{ userService } from '../services/index.js'

class UserController{

    getUsers = async (req, res) => {
        try {
            let users = await userService.getUsers() 
            res.send({ status:"Success", payload: users})
        } catch (error) {
            res.status(400).send({status:"Error", error: `Failed to get users. ${error.message}`})
        }
    }

    getUserById = async (req, res) => {
        try {
            const id = req.params.uid
            let user = await userService.getUserById(id) 
            if(user === null)
                res.send({ status:"Success", payload: 'User not found'})
            else
                res.send({ status:"Success", payload: user})
        } catch (error) {
            res.status(400).send({status:"Error", error: `Failed to get users. ${error.message}`})
        }
    }

    createUser = async (req, res) => {
        try {
            let user = req.body;
            const newUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: createHash(user.password),
            };
            let result = await userService.createUser(newUser); 
            res.send({ status:"Success", payload: result})
        } catch (error) {
            res.status(400).send({status:"Error", error: `Failed to add user. ${error.message}`})
        }
    }

    updateUser = async (req, res) => {
        try {
            const { uid } = req.params;
            const user = req.body;

            let userToReplace = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password ? createHash(user.password) : undefined,
            }

            let result = await userService.updateUser(uid, userToReplace);
            res.send({ status:"Success", payload: result})
        } catch (error) {
            res.status(400).send({status:"Error", error: `Failed to update user. ${error.message}`})
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { uid } = req.params
            let result = await userService.deleteUser(uid)
            res.sendSuccess(result)
        } catch (error) {
            res.status(400).send({status:"Error", error: `Failed to delete user. ${error.message}`})
        }
    }

    deleteInactiveUsers = async (req, res) => {
        try {
            let result = await userService.deleteInactiveUsers()
            res.sendSuccess(result)
        } catch (error) {
            res.status(400).send({status:"Error", error: `Failed to delete inactive users. ${error.message}`})
        }
    }

    swapUserRole = async(req,res)=>{
        try{
            const { uid } = req.params
            let result = await userService.swapRole(uid)
            res.sendSuccess(result)
        }catch (error) {
            res.status(400).send({status:"Error", error: `Failed to swap user role. ${error.message}`})
        }
    }

    linkRecovery = async(req,res)=>{
        try{
            let result = await userService.recovery()
            res.sendSuccess(result)
        }catch (error) {
            res.status(400).send({status:"Error", error: `Failed to show link recovery. ${error.message}`})
        }
    }

    recoverPass = async(req,res)=>{
        try{
            let result = await userService.recoveryPassword()
            res.sendSuccess(result)
        }catch (error) {
            res.status(400).send({status:"Error", error: `Failed to recover password. ${error.message}`})
        }
    }

    getUserDocuments = (req, res) => {      
        try {
            let isLogin
            let user
            if (!req.user) {
                isLogin = false;
                user = {};
            } else {
                isLogin = true
                user = req.user;
            }
            res.render('documents', {isLogin, user})
        } catch(error) {
            console.log(error)
            res.render('error')
        }
    }
    
}
export default new UserController()