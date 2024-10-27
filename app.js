const express = require('express')

//USo de plantillas de ejs
const app = express()
app.set('view engine','ejs')

//Se invoca a dotnv para el conrtol de las varibales de entorno
const dotnv = require('dotenv')
const cookieParser = require('cookie-parser')
const Swal = require('sweetalert2')
app.use(cookieParser())
dotnv.config({path:'./env/.env'})

//Decalramos que trabajaremos con datos tipo JSON para evitar problemas de datos
app.use(express.urlencoded({extended:true}))
app.use(express(express.json))

//Direcciones de uso estatica
app.use('/resourses', express.static('static'))
app.use('/resourses',express.static(__dirname+'/static'))

//Direcciones de uso de ventanas
app.use('/',require('./router'))
app.use('/instituto',require('./routerInstituto'))
app.use('/edificio',require('./routerEdificio'))
app.use('/salon',require('./routerSalon'))
app.use('/recurso',require('./routerRecurso'))
app.use('/movimiento',require('./routerMovimiento'))

app.listen(3000,function(){
    console.log("Servidor creado http://localhost:3000")
})
