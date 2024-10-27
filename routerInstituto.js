const connection = require("./databases/connection");


const express = require('express')
const routerInstituto = express.Router()


routerInstituto.get('/',(req,res)=>{
    connection.query('SELECT * FROM instituto',(error,results)=>{
        if(error){
            throw error;
        }else{
            const cookie = req.cookies
            res.render('instituto',{results:results, cookie:cookie})
        }
    })
})


routerInstituto.get('/delete/:id',(req,res)=>{
    
    const id = req.params.id
    const cookie = req.cookies
    connection.query('SELECT * FROM edificio WHERE id_instituto = ?',[id],(error,results)=>{
        if(error){
            throw error
        }else{
            if(results.length === 0){
                connection.query('DELETE FROM instituto WHERE id_instituto = ?',[id],(error,results)=>{
                    if(error){
                        throw error
                    }else{
                        res.redirect('/instituto')
                    }
                })
            }else{
                
                connection.query('SELECT * FROM instituto ',(error,results)=>{
                    if(error){
                        throw error;
                    }else{
                        
                        res.render('instituto',{
                            alert: true,
                            alertTittle: "Error",
                            alertMessage: "Antes debe eliminar todo el contenido dentro del elemento",
                            alertIcon: "error",
                            showConfirmButton: false,
                            timer:2000,
                            ruta: 'instituto',
                            cookie:cookie,
                            results:results
                        })

                    }
                })
            }
        }
    })
    
})


routerInstituto.get('/save/:nombreInstituto/:direccion',(req,res)=>{
    const nombre = req.params.nombreInstituto
    const direccion = req.params.direccion

    connection.query('INSERT INTO instituto SET nombre = "'+nombre+'" , direccion = "'+direccion+'"',(error,results)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect('/instituto')
        }
    })
})

routerInstituto.get ('/update/:id/:nombreInstituto/:direccion',(req,res)=>{
    const id_instituto = req.params.id
    const nombre = req.params.nombreInstituto
    const direccion = req.params.direccion

    connection.query('UPDATE instituto SET ? WHERE id_instituto = ?',[{nombre:nombre,direccion:direccion}
        ,id_instituto],(error,results)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect('/instituto')
        }
    })
    
}) 


module.exports = routerInstituto