const connect = require("../databases/connection")

exports.save = (req,res)=>{
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const rol = req.body.rol
    const contrasenia = req.body.contrasenia
    const matricula = req.body.matricula
    const correo = req.body.email
    const ventana = req.body.ventana 

    connect.query('INSERT INTO usuario SET ?',{nombre:nombre,apellido:apellido,rol:rol,contrasenia:contrasenia,
    matricula:matricula,correo:correo},(error,results)=>{
        if(error){
            console.log(error)
        }else{
            if (ventana == "si") {
                res.redirect('/usuario')   
            } else {
                res.redirect('/')
            }
        }
    })
} 

exports.update = (req,res)=>{
    const id_usuario = req.body.id_usuario
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const rol = req.body.rol
    const contrasenia = req.body.contrasenia
    const matricula = req.body.matricula
    const correo = req.body.email
    
    connect.query('UPDATE usuario SET ? WHERE id_usuario = ?',[{nombre:nombre,apellido:apellido,rol:rol,contrasenia:contrasenia,
        matricula:matricula,correo:correo},id_usuario],(error,results)=>{
        if(error){
            console.log(error)
            
        }else{
            res.redirect('/usuario')
            
        }
    })
    
} 