const connection = require("./databases/connection");


const express = require('express')
const routerSalon = express.Router()

routerSalon.get('/cookies/:idEdificio/:nombreEdificio',(req,res)=>{
    const id = req.params.idEdificio
    const nombreEdificio = req.params.nombreEdificio
    res.cookie('IdEdificio',id)
    res.cookie('nombreEdificio',nombreEdificio)
    res.redirect('/salon')
})

routerSalon.get('/',(req,res)=>{
    const cookie = req.cookies
    connection.query('SELECT * FROM salon WHERE id_edificio = "'+cookie.IdEdificio+'"',(error,results)=>{
        if(error){
            throw error;
        }else{
            const cookie = req.cookies
            res.render('salon',{results:results, cookie:cookie})
        }
    })
})

routerSalon.get('/save/:nombreSalon/:capacidad/:planta',(req,res)=>{
    const nombreSalon = req.params.nombreSalon;
    const capacidad = req.params.capacidad;
    const planta = req.params.planta;
    const cookie =  req.cookies;

    // Asegúrate de escapar los valores para evitar inyecciones de SQL
    connection.query('INSERT INTO salon SET id_edificio = ?, nombreSalon = ?, capacidad = ?, planta = ?', 
    [cookie.IdEdificio, nombreSalon, capacidad, planta], 
    (error, results) => {
        if(error){
            console.log(error);
        } else {
            res.redirect('/salon');
        }
    });
});

routerSalon.get('/update/:id/:nombreSalon/:capacidad/:planta', (req, res) => {
    const id_salon = req.params.id;
    const nombreSalon = req.params.nombreSalon;
    const capacidad = req.params.capacidad;
    const planta = req.params.planta

    connection.query(
        'UPDATE salon SET nombreSalon = ?, capacidad = ?, planta = ? WHERE id_salon = ?',
        [nombreSalon, capacidad, planta, id_salon],
        (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/salon');
            }
        }
    );
});

routerSalon.get('/delete/:id',(req,res)=>{
    const id = req.params.id
    const cookie = req.cookies
    connection.query('SELECT * FROM recurso WHERE id_salon = ?',[id],(error,results)=>{
        if(error){
            throw error
        }else{
            if(results.length === 0){
                connection.query('DELETE FROM salon WHERE id_salon = ?',[id],(error,results)=>{
                    if(error){
                        throw error
                    }else{
                        res.redirect('/salon')
                    }
                })
            }else{
                
                connection.query('SELECT * FROM salon WHERE id_edificio = "'+cookie.IdEdificio+'"',(error,results)=>{
                    if(error){
                        throw error;
                    }else{
                        
                        res.render('salon',{
                            alert: true,
                            alertTittle: "Error",
                            alertMessage: "Antes debe eliminar todo el contenido dentro del elemento",
                            alertIcon: "error",
                            showConfirmButton: false,
                            timer:2000,
                            ruta: 'salon',
                            cookie:cookie,
                            results:results
                        })

                    }
                })
            }
        }
    })
    
    
    
})


module.exports = routerSalon