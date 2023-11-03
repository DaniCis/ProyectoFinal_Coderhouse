import express from "express"
import mongoose from "mongoose"
import CONFIG from "./config/config.js"
import cors from 'cors'
import { Server } from "socket.io"
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from 'express-handlebars'
import passport from "passport";
import initPassport from "./config/passport.config.js"
import messagesController from './controllers/messages.controller.js';
import appRouter from './routers/app.router.js'
import { fileURLToPath } from "url";
import { dirname } from "path";
import errorHandler from './middlewares/error.middleware.js';
import { addLogger } from './utils/logger.js';
import swaggerUiExpress from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const{ PORT, MONGO_URI } = CONFIG
const app= express();
const httpServer = app.listen(PORT,()=>console.log(`Server up in ${PORT}`))
const io = new Server(httpServer)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views')
app.set('view engine','handlebars');
app.use(express.static(__dirname + "/public"));

mongoose.set('strictQuery',false)
mongoose.connect(MONGO_URI)
.then(()=>{
  console.log("Connect DB")
})
.catch((error)=>{
  console.log("Failed to connect DB")
  throw error
})

app.use(addLogger)
const ejemploError = 'Este es un error de ejemplo'
app.get("/loggerTest", (req, res) => {
  req.logger.fatal('Se produjo un error crítico. La aplicación se cerrará.')
  req.logger.error('Error al procesar la solicitud:', ejemploError)
  req.logger.warning('Advertencia: La capacidad del sistema está casi al límite.')
  req.logger.info(`Se ha recibido una solicitud ${req.method} en la ruta ${req.url}.`)
  req.logger.http(`Solicitud ${req.method} recibida en la ruta ${req.url}.`,  req.body );
  req.logger.debug(`Variable X ejemplo:', ${new Date().toLocaleTimeString()}`)
  res.send("Test Logger ejecutandose")
})

app.use(session({
  store: MongoStore.create({
    mongoUrl:MONGO_URI,
    ttl:3600
  }),
  secret:"12345abcd",
  resave:false,
  saveUninitialized:false
}))

initPassport();
app.use(passport.session({
  secret:"SecretCoders"
}));

app.use(passport.initialize())
app.use ('/' ,appRouter)
app.use(errorHandler)


const messages=[];
io.on('connection',socket=>{
  socket.on('message', data=>{
    messages.push(data)
    io.emit('messageLogs',messages)
    messagesController.createMessage(data)
  })
})

const swaggerOptions={
  definition:{
    openapi: '3.0.0',
    info:{
      title:' Documentacion de las APIs',
      description: ' Información de rutas para productos y carritos de compras',
      version: '1.0.0',
      contact:{
        name: "Daniela Cisneros",
        url:'https://github.com/DaniCis'
      }
    }
  },
  apis:[`./docs/*.yaml`]
}
const spec = swaggerJsdoc(swaggerOptions)
app.use('/apidocs',swaggerUiExpress.serve,swaggerUiExpress.setup(spec))
