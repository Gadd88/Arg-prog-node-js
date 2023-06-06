//CREACION SERVER
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3008;
const datos = require('./productos.js')

const productosApi = datos.productosRandom;

//VISTAS
app.set('view engine', 'ejs');
const views = path.join(__dirname, './views/pages/');

//RUTAS
app.get('/', (req,res) =>{
    const data = {
        title: 'UNTREF Plantilla productos',
        message: 'Aun no se como hacer que funcione el boton para llegar a la seccion de productos',
        productsURL: '/productos'
    };
    res.render(path.join(views, 'index'), data);
});

app.get('/productos', (req,res) => {
    const data = {
        title: 'Seccion de Productos',
        message: 'Productos traidos desde un array creado con elementos provistos de FakeStoreApi',
        products: productosApi
    };
    res.render(path.join(views, 'productos'), data)
})

app.get('*', (req,res) => {
    res.status(404).send(`{
        "error": "404", 
        "description": "No se encuentra la ruta especificada."
    }`);
});

//INICIALIZACION DEL SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`);
});


