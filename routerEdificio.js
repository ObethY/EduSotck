const connection = require("./databases/connection");


const express = require('express')
const routerEdificio = express.Router()

routerEdificio.get('/',(req,res)=>{
    const cookie = req.cookies
    connection.query('SELECT * FROM edificio WHERE id_instituto = "'+cookie.IdInstituto+'"',(error,results)=>{
        if(error){
            throw error;
        }else{
            const cookie = req.cookies
            res.render('edificio',{results:results, cookie:cookie})
        }
    })
})

routerEdificio.get('/cookies/:id/:nombre',(req,res)=>{
    const id = req.params.id
    const nombreInstituto = req.params.nombre
    res.cookie('IdInstituto',id)
    res.cookie('nombreInstituto',nombreInstituto)
    res.redirect('/edificio')
})

routerEdificio.get('/save/:nombreEdificio/:planta',(req,res)=>{
    const nombreEdificio = req.params.nombreEdificio
    const planta = req.params.planta
    const cookie =  req.cookies

    connection.query('INSERT INTO edificio SET nombreEdificio = "'+nombreEdificio+
    '" , noPlantas = "'+planta+'",id_instituto = "'+cookie.IdInstituto+'"',(error,results)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect('/edificio')
        }
    })
})

routerEdificio.get('/delete/:id',(req,res)=>{

    const id = req.params.id
    const cookie = req.cookies
    connection.query('SELECT * FROM salon WHERE id_edificio = ?',[id],(error,results)=>{
        if(error){
            throw error
        }else{
            if(results.length === 0){
                connection.query('DELETE FROM edificio WHERE id_edificio = ?',[id],(error,results)=>{
                    if(error){
                        throw error
                    }else{
                        res.redirect('/edificio')
                    }
                })
            }else{
                
                connection.query('SELECT * FROM edificio WHERE id_instituto = "'+cookie.IdInstituto+'"',(error,results)=>{
                    if(error){
                        throw error;
                    }else{
                        
                        res.render('edificio',{
                            alert: true,
                            alertTittle: "Error",
                            alertMessage: "Antes debe eliminar todo el contenido dentro del elemento",
                            alertIcon: "error",
                            showConfirmButton: false,
                            timer:2000,
                            ruta: 'edificio',
                            cookie:cookie,
                            results:results
                        })

                    }
                })
            }
        }
    })

 
    
})

routerEdificio.get('/update/:id/:nombreEdificio/:noPlantas', (req, res) => {
    const id_edificio = req.params.id;
    const nombreEdificio = req.params.nombreEdificio;
    const noPlantas = req.params.noPlantas;

    connection.query(
        'UPDATE edificio SET nombreEdificio = ?, noPlantas = ? WHERE id_edificio = ?',
        [nombreEdificio, noPlantas, id_edificio],
        (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/edificio');
            }
        }
    );
});

module.exports = routerEdificio