// Servidor y dependencias
const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { idProducto, listaProductos, borrarProducto, actualizarProducto, nuevoProducto } = require('./assets/data.manager');
const productos = require('./public/lista-productos.json')
const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || '127.0.0.1';

// Iniciando server
const server = express();
server.use(express.static(path.join(__dirname,'public')))

// Middlewares
server.set('view engine', 'ejs')
server.use(express.json())
server.use(express.urlencoded({extended: true}));

const views = path.join(__dirname, './views')


// RUTAS ********************************************************************************
server.get('/', (req,res)=>{
    res.status(200).render(path.join(views, '/pages/index.ejs'))
})


//Lista General de Productos ************************************************************
server.get('/productos', (req,res)=>{

        listaProductos()
            .then((productos)=> res.status(200).render(path.join(views, '/pages/productos.ejs'),{productos}))
            .catch((error)=> res.status(404).send(error.message))

})

//Obtener producto por ID ***************************************************************
server.get('/productos/:id', (req,res)=>{
    const id = Number(req.params.id);

    idProducto(id)
        .then((producto)=> res.status(200).send(producto))
        .catch((error)=> res.status(404).send(error.message))
})

//Crear un nuevo producto ***************************************************************
server.post('/productos', (req,res) => {
    const { nombre, marca, categoria, precio, stock } = req.body;

    nuevoProducto({ nombre, marca, categoria, precio, stock })
        .then((producto) => res.status(201).send(producto))
        .catch((error)=> res.status(400).send(error.message))
})

//Actualizar un producto existente ******************************************************
server.put('/productos/:id', (req,res)=>{
    const { id } = req.params;
    const { nombre, marca, categoria, precio, stock } = req.body;

    actualizarProducto({id: Number(id), nombre, marca, categoria, precio, stock})
        .then((producto) => res.status(200).send(producto))
        .catch((error)=> res.status(400).send(error.message))
})

//Eliminar un producto existente ********************************************************
server.delete('/productos/:id', (req,res)=>{
    const { id } = req.params;

    borrarProducto(Number(id))
        .then((producto) => res.status(200).send(producto))
        .catch((error)=> res.status(400).send(error.message))
})

//************************************************************
server.get('*', (req,res)=>{
    res.status(404).send("<h1>Pagina no encontrada</h1>")
})

server.listen(PORT, HOST, () => {
    console.log(`Servidor corriendo en: http://${HOST}:${PORT}`)
})
