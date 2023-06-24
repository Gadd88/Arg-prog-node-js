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
    {id: 1, nombre: 'Javascript', categoria: 'Programacion'},
    {id: 2, nombre: 'React JS', categoria: 'Programacion'},
    {id: 3, nombre: 'Vue JS', categoria: 'Programacion'},
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
    const { nombre, categoria } = req.query; //destructuring para ocupar los parametros que se requieran
    const queryParams = Object.keys(req.query); //generamos un array con las llaves del objeto req.query
    let resultado = [];

    if (queryParams.length === 0){
        console.log('No llegan parámetros. Envío el set de datos');
        res.status(200).render(path.join(views, 'cursos'), {cursos});
    }else {
        console.log('Llegan los parámetros nombre y categoria');
        for (let curso of cursos){
            if(curso.nombre.toLowerCase().includes(nombre.toLowerCase())
            && curso.categoria.toLowerCase().includes(categoria.toLowerCase())){
                resultado.push(curso)
            }
        }
        resultado.length > 0 ? 
                    res.json(resultado) : 
                    res.json([{
                        id: 'Error', 
                        descripcion: 'No se encontraron coincidencias.'}]);
    }
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

app.get('/curso/codigo/:id', (req,res) =>{
    const { id } = req.query
    let resultado = [];
    let idBuscado = parseInt(id);
    for (let curso of cursos){
        if (idBuscado === parseInt(curso.id)){
            console.log(idBuscado)
        }
    }
})

// ***************************************************************************************
// ***************************************************************************************EJEMPLO
// ***************************************************************************************
// ***************************************************************************************

const coches = [
    {id:1 ,marca: 'Ford', anio: 2017, color: 'rojo'},
    {id:2 ,marca: 'Fiat', anio: 2019, color: 'blanco'},
    {id:3 ,marca: 'Chevrolet', anio: 2020, color: 'verde'},
    {id:4 ,marca: 'Honda', anio: 2023, color: 'gris'},
    {id:5 ,marca: 'Chery', anio: 2011, color: 'azul'},
];

app.get('/coches', (req,res) => {
    const { id, anio, color } = req.query;

    const coche = coches.find( elemento => elemento.id === Number(id));

    
    if (!coche) { //CONDICION DE ESCAPE, por si no se encuentra el ID
        res.status(400).send(`<h1>Error</h1>
        <p>ID incorrecto</p>`)
    }
    
    res.status(200).send(coche);
});

app.get('/coches/id/:id/marca/:marca/anio/:anio', (req,res) => {
    const { id, anio, marca } = req.params;

    const coche = coches.find( elemento => elemento.id === Number(id));
    coche.anio = anio;
    coche.marca = marca;

    
    if (!coche) { //CONDICION DE ESCAPE, por si no se encuentra el ID
        res.status(400).send(`<h1>Error</h1>
        <p>ID incorrecto</p>`)
    }
    
    res.status(200).send(coche);
});

// ***************************************************************************************
// ***************************************************************************************
// ***************************************************************************************
// ***************************************************************************************

app.get('*', (req,res) => {
    res.status(404).send(`{
        <h1>Error</h1>
        <p>No se encuentra el recurso solicitado</p>
    }`);
});


app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en el puerto: ${PORT}`)
})
