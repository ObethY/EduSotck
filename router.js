const connection = require("./databases/connection");

const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
            res.render('index')
})

router.get('/crearCuenta',(req,res)=>{
    res.render('crearCuenta')
})

router.get('/sesion',(req,res)=>{
    res.render('sesion')
})

router.get('/usuario',(req,res)=>{
    connection.query('SELECT * FROM usuario',(error,results)=>{
        if(error){
            throw error;
        }else{
            const cookie = req.cookies
            res.render('usuario',{results:results, cookie:cookie})
        }
    })
})

router.get('/delete/:id',(req,res)=>{
    const id = req.params.id
    connection.query('DELETE FROM usuario WHERE id_usuario = ?',[id],(error,results)=>{
        if(error){
            throw error
        }else{
            res.redirect('/usuario')
        }
    })
})

router.post('/validar',(req,res)=>{
    const matricula = req.body.matricula;
    const contrasenia = req.body.contrasenia
    connection.query('SELECT * FROM usuario WHERE matricula = ? AND contrasenia = ?', [matricula, contrasenia],
    (error,results)=>{
        if(error){
            throw error;
        }else{
            if(results.length === 0){
               
                res.render('sesion',{
                    alert: true,
                    alertTittle: "Error",
                    alertMessage: "Error en usuario y/o contraseña",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer:1800,
                    ruta: 'sesion'
                })

            }else{
                res.cookie('nombreUsuario',results[0].nombre)
                res.cookie('IdUsuario',results[0].id_usuario)
                res.cookie('rol',results[0].rol)
                res.redirect('/instituto')
            }
        }
    })
})


router.get('/salir',(req,res)=>{
    res.clearCookie('nombreUsuario')
    res.clearCookie('IdUsuario')
    res.clearCookie('rol')
    res.clearCookie('nombreInstituto')
    res.clearCookie('IdInstituto')
    res.clearCookie('IdEdificio')
    res.clearCookie('IdSalon')
    res.clearCookie('nombreEdificio')
    res.clearCookie('nombreSalon')
    res.redirect('/')
})

const crudUsuario = require('./controllers/crudUsuario')
router.post('/registarUsuario', crudUsuario.save)
router.post('/editarUsuario', crudUsuario.update)

module.exports = router