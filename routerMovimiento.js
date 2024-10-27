const connection = require("./databases/connection");


const express = require('express')
const routerMovimiento = express.Router()

routerMovimiento.get('/', (req, res) => {
    connection.query('SELECT * FROM movimiento', (error, results) => {
        if (error) {
            throw error;
        } else {
            // Formatear las fechas en los resultados
            results.forEach(result => {
                if (result.fecha) {
                    result.fecha = new Date(result.fecha).toISOString().slice(0, 10);
                }
            });
            res.render('movimiento', { results: results });
        }
    });
});

module.exports = routerMovimiento