const express = require('express');
const path = require('path');
const server = express();

const HOST = '127.0.0.1';
const PORT = 3002;
//path.join(__dirname) => esto te para en la ruta del archivo server.js

server.set("view engine", "ejs");

//podemos crear objetos o variables para pasar valroes que utilizaremos en las plantillas ejs. En este caso, un objeto con los datos de nombre, apellido y edad, y se lo pasamos al render como objeto y lo llamamos desde la plantilla home.
server.get('/home', (req,res) => {
    const personas = [
        { nombre: 'Matias', apellido: 'Saade', edad: 34 },
        { nombre: 'Juan', apellido: 'De la Rosa', edad: 17 },
        { nombre: 'Mateo', apellido: 'Gomez', edad: 22 },
        { nombre: 'Elias', apellido: 'Suller', edad: 54 }
    ];
    res.status(200).render(path.join(__dirname, 'views/pages/home'), {personas});
});

server.get('/*', (req,res) =>{
    res.status(404).send('error')
} )

server.listen(PORT, HOST, () =>{
    console.log(`Server corriendo en: http://${HOST}:${PORT}`)
} )

// <%= variable %> - para utilizar variables, objetos, arrays de javascript directamente en la plantilla ejs

// <%- include/html %> - para insertar codito html dentro de la plantilla ejs, por ejemplo los partials para headers o footers

// <% %> - para utilizar ciclos if/for/while dentro de las plantillas ejs