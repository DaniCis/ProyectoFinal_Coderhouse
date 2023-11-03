import {Router} from "express"
import passport from "passport";
import userController from '../controllers//users.controllers.js'

const router= Router();

router.post('/resetPassword',userController.recoverPass)
router.post('/recover',userController.linkRecovery)

router.post('/register',
    passport.authenticate('register',{
        passReqToCallback: true,
        session: false,
        failureRedirect:'/failRegister',
        failureMessage: true,
    }),async(req,res)=>{
    res.send({status:"success",message:"Usuario registrado", payload: req.user})
})

router.get('/failRegister',async(req,res)=>{
    res.send({status:'error',error:"Registro fallido"})
})

router.post('/',
    passport.authenticate('login',{
        passReqToCallback: true,
        session: false,
        failureRedirect:'/failLogin',
        failureMessage: true,
    }),async(req,res)=>{
    res.send({status:"success",message:"Usuario iniciado"})
})

router.get('/failLogin',async(req,res)=>{
    res.send({status:'error',error:"Inicio de sesión fallido"})
})

router.get('/github',passport.authenticate('github',{scope:['user:email']}))

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/failLogin' }), (req, res) => {
  req.session.user = req.user;
  res.redirect('/products');
});

export default router;  