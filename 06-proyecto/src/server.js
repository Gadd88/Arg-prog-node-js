//Necesarios para inicio del server
const express = require('express');
const server = express();
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const { encontrarId, encontrarTodos } = require('./views/assets/data.manager.js');
const productos = require('./views/assets/productos.json')

//middleware
server.set('view engine', 'ejs');

const views = path.join(__dirname, './views/pages');

server.use(express.static(path.join(__dirname, 'views'))) //MUY NECESARIO PARA TODO EL CONTENIDO ESTATICO!!! CSS, IMGs Y MAS


//Rutas - Endpoints
server.get('/', (req,res) => {
    res.status(200).render(path.join(views, 'index'))
})

server.get('/productos', (req,res) => {

    encontrarTodos()
        .then((productos) => res.status(200).render(path.join(views, 'productos'), {productos}))
        .catch((error) => res.status(400).send(error.message))

    // const { id, nombre } = req.query;


})

server.get('/productos/:id', (req,res) =>{
    const { id } = req.params;

    encontrarId(Number(id))
        .then((producto) => res.status(200).send(producto))
        .catch((error) => res.status(400).send(error.message));
})

server.get('/productos/:producto', (req,res) =>{
    const { producto } = req.params;

    encontrarProducto(producto)
        .then((producto) => res.status(200).send(producto))
        .catch((error) => res.status(400).send(error.message));
})

//control de rutas inexistentes
server.use('*', (req,res) => {
    res.status(404).send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
})

//oyente de peticiones
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`)
})