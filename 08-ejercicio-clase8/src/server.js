const express = require('express');
const path = require('path')
const PORT = 3000
const HOST = '127.0.0.1'
const fs = require('fs');

require('dotenv').config();

const server = express();
const views = path.join(__dirname, './views')
const productos = require('./public/lista-productos.json')

const {  buscarId, buscarNombre, listadoProductos } = require('./data.manage');

server.set('view engine', 'ejs');
server.use(express.static(path.join(__dirname, 'public')));


server.get('/', (req,res) => {
    res.status(200).send(`<h1>Ejercicio Clase 8</h1>`)
})

server.get('/productos', (req,res)=>{
    
    listadoProductos()
        .then(productos => res.status(200).render(path.join(views, 'productos'), {productos}))
        .catch(error => res.status(404).send(error.message))
    
})

// server.get('/productos/:nombre', (req,res)=>{
//     const { nombre } = req.params

//     buscarNombre(nombre)
//         .then((producto) => res.status(200).send(producto))
//         .catch((error) => res.status(400).send(error.message))
// })

// server.get('/productos/:id', (req,res)=>{
//     const { id } = req.params

//     buscarId(Number(id))
//         .then((producto) => res.status(200).send(producto))
//         .catch((error) => res.status(400).send(error.message))
// })

server.get('/productos/:parametro', (req,res)=>{
    let param = Number(req.params.parametro)

    console.log(typeof param)

    if(param.length>3){
        buscarNombre(param)
            .then((producto) => res.status(200).send(producto))
            .catch((error) => res.status(400).send(error.message))
    }else{
        buscarId(param)
            .then((producto) => res.status(200).send(producto))
            .catch((error) => res.status(400).send(error.message))
    }
})


server.use('*', (req,res)=>{
    res.status(404).send('<h1>Pagina no encontrada</h1>')
})

server.listen(PORT, HOST, () => {
    console.log(`Servidor corriendo en http://${HOST}:${PORT}`)
})

