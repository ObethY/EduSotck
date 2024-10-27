const connection = require("./databases/connection");


const express = require('express')
const routerRecurso = express.Router()

routerRecurso.get('/',(req,res)=>{
    const cookie = req.cookies
    connection.query('SELECT * FROM recurso WHERE id_salon = "'+cookie.IdSalon+'"',(error,results)=>{
        if(error){
            throw error;
        }else{
            const cookie = req.cookies
            res.render('recurso',{results:results, cookie:cookie})
        }
    })
})

routerRecurso.get('/cookies/:idSalon/:nombreSalon',(req,res)=>{
    const id_salon = req.params.idSalon
    const nombreSalon = req.params.nombreSalon
    res.cookie('IdSalon',id_salon)
    res.cookie('nombreSalon',nombreSalon)
    res.redirect('/recurso')
})

routerRecurso.get('/save/:nombre/:color/:marca/:estado/:precio/:serial/:posicion/:descripcion',(req,res)=>{
    const nombreRecurso = req.params.nombre
    const color = req.params.color
    const marca = req.params.marca
    const estado = req.params.estado
    const precio = req.params.precio
    const serial = req.params.serial
    const posicion = req.params.posicion
    const descripcion = req.params.descripcion
    const cookies = req.cookies
    const id_salon = cookies.IdSalon
    const id_usuario = cookies.IdUsuario
    const nombreUsuario = cookies.nombreUsuario
    const tipo = "Alta"
    const observaciones = "Se realiza el alta de un nuevo recurso"

    const fecha = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
    const hora = new Date().toLocaleTimeString(); // Formato HH:MM:SS
   
    connection.query('INSERT INTO recurso SET id_salon = ?, nombre = ?, color = ?, marca = ?,estado = ?,'+
    'precio = ?, serial = ?, posicion = ?, descripcion = ?', 
    [id_salon,nombreRecurso,color,marca,estado,precio,serial,posicion,descripcion], 
    (error, results) => {
        if(error){
            console.log(error);
        } else {
            const id_recurso = results.insertId;
            connection.query('INSERT INTO movimiento SET id_recurso = ?, id_usuario = ?, nombreRecurso = ?, nombreUsuario = ?,'+
            'tipo = ?, fecha = ?, hora = ?, observaciones = ?', 
            [id_recurso, id_usuario,nombreRecurso,nombreUsuario, tipo,fecha,hora, observaciones], 
            (error, results) => {
                if(error){
                    console.log(error);
                } else {
                    res.redirect('/recurso');
                }
            });
        }
    });
})

routerRecurso.get('/delete/:id/:nombre', (req, res) => {
    
    const id_recurso = req.params.id;
    const nombreRecurso = req.params.nombre;
    const cookies = req.cookies;
    const id_usuario = cookies.IdUsuario;
    const nombreUsuario = cookies.nombreUsuario;
    const tipo = "Baja";
    const observaciones = "Se realiza la baja de un recurso recurso";

    const fecha = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
    const hora = new Date().toLocaleTimeString(); // Formato HH:MM:SS

    // Eliminamos el recurso de la tabla `recurso`
    connection.query('DELETE FROM recurso WHERE id_recurso = ?', [id_recurso], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            // Insertamos el movimiento independientemente de si la eliminación del recurso fue exitosa o no
            connection.query('INSERT INTO movimiento SET id_recurso = ?, id_usuario = ?, nombreRecurso = ?, nombreUsuario = ?, tipo = ?, fecha = ?, hora = ?, observaciones = ?', 
            [id_recurso, id_usuario, nombreRecurso, nombreUsuario, tipo, fecha, hora, observaciones], 
            (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    res.redirect('/recurso');
                }
            });
        }
    }); 
});

routerRecurso.get('/edit/:id/:nombre/:color/:marca/:estado/:precio/:serial/:posicion/:descripcion',(req,res)=>{
    const id_recurso = req.params.id
    const nombreRecurso = req.params.nombre
    const color = req.params.color
    const marca = req.params.marca
    const estado = req.params.estado
    const precio = req.params.precio
    const serial = req.params.serial
    const posicion = req.params.posicion
    const descripcion = req.params.descripcion
    const cookies = req.cookies
    const id_salon = cookies.IdSalon
    const id_usuario = cookies.IdUsuario
    const nombreUsuario = cookies.nombreUsuario
    const tipo = "Alta"
    const observaciones = "Se realiza el alta de un nuevo recurso"

    const fecha = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
    const hora = new Date().toLocaleTimeString(); // Formato HH:MM:SS
   
    connection.query('UPDATE recurso SET id_salon = ?, nombre = ?, color = ?, marca = ?, estado = ?, ' +
        'precio = ?, serial = ?, posicion = ?, descripcion = ? WHERE id_recurso = ?',
    [id_salon, nombreRecurso, color, marca, estado, precio, serial, posicion, descripcion, id_recurso], 
        (error, results) => {
            if (error) {
                console.log(error)
            } else {
                res.redirect('/recurso')
            }
        }
    );
})

module.exports = routerRecurso