const express = require('express');
const app = express();

//**************************************************************************************************** */

//definimos ruta basica
app.get('/', (req, res) =>{
    res.send('Hola, Mundo.... desde express XD')
});

//el metodo get() escucha las peticiones entrantes y recibe 2 parametros: la ruta pedida y la funcion de respuesta a la peticion con los parametros(req,res)
//el metodo send() utilizado por el parametro res, nos sirve para devolver una respuesta a la peticion

//*************************************************************************************************** */


//INICIAMOS EL SERVIDOR EN EL PUERTO DESEADO *************************

app.listen(3050, () => {
    console.log('Servidor iniciado en el puerto: 3000')
});

//******************************************************************* */

//ACTUALIZAMOS EL ARCHIVO package.json
//agregamos las siguientes lineas en la seccion de script

//******************************************************************* */

//"start": "node --watch serv_express.js",
//"end" : "killall -9 node"

//***************************************************************** */

//Ahora podemos iniciar el servidor ejecutando npm start desde la terminal, el parametro --watch nos permite visualizar los cambios automaticamente a medida que los realizamos, sin necesidad de estar parando y volviendo a correr el servidor. En su defecto podemos instalar nodemon para automatizarlo.

//RUTAS ********************************************************************************************************************

app.get('/', (req,res) =>{
    res.send(`<h1>Bienvenidos a Nuestra Pagina de Nova Learnings</h1>
        <h2>Puedes explorar las distintas secciones</h2>
        <ul>
            <li>Nosotros</li>
            <li>Cursos</li>
            <li>Contacto</li>
        </ul>
        <p>Cualquier otro intento te dara error</p>`)
});

app.get('/nosotros', (req,res) =>{
    res.send(`<h1>Bienvenido a la Seccion de Nosotros</h1>
    <p>En esta seccion te hablaremos un poco de nuestros comienzos, nuestra historia, y, gracias a ella, todo lo que HOY podemos ofrecerte</p>`)
});

app.get('/cursos', (req,res) =>{
    res.send(`<h1>Bienvenido a la Seccion de Cursos</h1>
    <h3>Aqui encontraras todos los cursos que tenemos disponibles en este momento</h3>
    <ul>
        <li>Maquetacion Web con HTML y CSS - Tailwind</li>
        <li>Domina Javascript con proyectos practicos</li>
        <li>ReactJs, el framework creado por Meta</li>
    </ul>`)
});

app.get('/contacto', (req,res) => {
    res.send(`<h1>Bienvenido a la Seccion de Contacto</h1>
    <h3>Estas son nuestras formas de contacto</h3>
    <ul>
        <li>Mail</li>
        <li>Teléfono</li>
        <li>Dirección</li>
    </ul>`)
});

//MANEJO DE ERRORES con medoto app.use() **************************************************************************************************************
//MIDDLEWARE utilizado para capturar todas las consultas de ruteo erróneas, las gestiona con el codigo 404, pagina no encontrada.

app.use((req,res) =>{
    res.status(404).send(`{“error”: “404”, “description”: “No se encuentra la ruta o recurso solicitado.”}`);
});

//******************************************************************************* */

//tambien podemos utilizar el metodo para manejar todas las rutas que no se hayan definido previamente.  

// app.get('*', (req,res) => { 
//     res.status(404).send('bla bla bla');
// });

//******************************************************************************* */

//CUALQUIERA DE LOS METODOS SIRVE, LO IMPORTANTE ES DEFINIRLOS AL FINAL, LUEGO DE HABER SETEADO LAS RUTAS NECESARIAS