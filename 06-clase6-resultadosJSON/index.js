//creacion del server
const express = require('express');
const path = require('path')
const PORT = 3002;
const app = express();
// const dotenv = require('dotenv');
//       dotenv.config();

//const cursos = require('./views/pages/cursos.ejs')


//array de ejemplo
const cursos = [
    {id: 1, nombre: 'Javascript', categoria: 'Programación'},
    {id: 2, nombre: 'React JS', categoria: 'Programación'},
    {id: 3, nombre: 'Vue JS', categoria: 'Programación'},
    {id: 4, nombre: 'SQL', categoria: 'Datos'},
    {id: 5, nombre: 'MongoDB', categoria: 'Datos'},
    {id: 6, nombre: 'Ecommerce', categoria: 'Producto'},
    {id: 7, nombre: 'Customer Experience', categoria: 'Producto'}
]

//middleware
app.set('view engine', 'ejs');
const views = path.join(__dirname, './views/pages');


//rutas
app.get('/', (req,res) => {
    res.render(path.join(views, 'index'));
});



app.get('/cursos', (req,res) => {
        res.render(path.join(views, 'cursos'));
});


app.get('/cursos/:id', (req, res) =>{
    let parametro = parseInt(req.params.id.trim())

    let resultado = [];

    if(parametro !== ''){
        for (curso of cursos){
            if(curso.id.trim() == parametro){
                resultado.push(curso)
            }; 
        };
    };
    resultado.length > 0 ?
                        res.json(resultado) : 
                        res.json([{
                            id: 'Error', 
                            descripcion: 'No se encontraron coincidencias.'}]);
});


app.get('/cursos/:nombre', (req, res) =>{
    let parametro = req.params.nombre.trim().toLowerCase();

    let resultado = [];

    if (parametro !== ''){
        for (curso of cursos){
            if(curso.nombre.trim().toLowerCase() == parametro){
                resultado.push(curso)
            }
        }
    }
    resultado.length > 0 ?
                    res.json(resultado) : 
                    res.json([{
                        id: 'Error', 
                        descripcion: 'No se encontraron coincidencias.'}]);
});




app.get('*', (req,res) => {
    res.status('404').send(`{
        "error": "404", 
        "description": "No se encuentra la ruta especificada."
    }`);
});



app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en el puerto: ${PORT}`)
})
