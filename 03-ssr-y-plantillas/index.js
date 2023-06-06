//SERVIDOR
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001;


//VISTAS
app.set('view engine', 'ejs');
app.use(express.static('views'));



//RUTAS
app.get('/', (req,res) => {
    // res.send('Hello World');
    const data = {
        title : 'Mi sitio web con EJS',
        message : 'Bienvenido a mi sitio web generado a partir de un motor de plantillas..',
        productsURL: '/productos'
    };
    res.render('index', data);
})


app.get('/productos', (req,res) => {
    const data = {
        title: 'Sección Productos',
        message: 'Bienvenido a la seccion de productos',
        products: computerProducts
    }
    res.render('productos', data);
})

app.get('*', (req,res) => {
    res.status(404).send(`{“error”: “404”, “description”: “No se encuentra la ruta o recurso solicitado.”}`);
});


//INICIALIZACION
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
})


//OBJETOS
const computerProducts = [
    {name: 'Notebook Lenovo s145', price: 720},
    {name: 'MacBook Air 13', price: 1250},
    {name: 'Tablet Droid 10.1', price: 350}
]