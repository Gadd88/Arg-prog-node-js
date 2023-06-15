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
    
    //QUERY PARAMS **************************************************************
    req.query.nombre
    req.query.categoria

        //validamos que el objeto req.query tiene propiedades internas
    const queryParams = Object.keys(req.query);
    if (queryParams.length === 0){
        console.log('No llegan parámetros. Envío el set de datos');
        res.send('Llegan parámetros');
    }else {
        console.log('Llegan los parámetros nombre y categoria');
    }

    for (let curso of cursos){
        if(curso.nombre.toLowerCase().includes(req.query.nombre.toLowerCase())
        && curso.categoria.toLowerCase().includes(req.query.categoria.toLowerCase())){
            resultado.push(curso)
        }
    }


    res.render(path.join(views, 'cursos'));
});

//URL PARAMS ***********************************************************
app.get('/cursos/:categoria', (req, res) =>{
    //aplicamos trim() para eliminar los espacios en blanco del parametro recibido y toLowerCase() para evitar errores por las mayusculas que podrian emplearse.
    let parametro = req.params.categoria.trim().toLowerCase();
    
    //comparamos el parametro recibido con cada curso perteneciente al array de cursos utilizando un for of, y agregamos las coincidencias a un array vacio
    let resultado = [];
    if(parametro !==''){
            for (let curso of cursos){
                if (curso.categoria.toLowerCase() == parametro){
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




app.get('*', (req,res) => {
    res.status('404').send(`{
        "error": "404", 
        "description": "No se encuentra la ruta especificada."
    }`);
});



app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en el puerto: ${PORT}`)
})
