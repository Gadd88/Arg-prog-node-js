const http = require('http');
const PORT = 3008;


//normalmente request y response se abrevian como req, res
//estructura comun del servidor

//**********************************************************************************************************************
// const server = http.createServer((request, response) => {
//     response.statusCode = 200;
//     response.setHeader('Content-Type', 'text/plain');
//     response.end('Hola, mundo!');
// })
//******************************************************************************************************************** */





//estructura de servidor con distintas rutas para acceder
//cambiando el content-type, podemos insertar elementos utilizando etiquetas HTML
const server = http.createServer((req, res)=>{
    if (req.url === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'HTML');
        res.end(`<h1>Bienvenidos a Nuestra Pagina de Nova Learnings</h1>
        <h2>Puedes explorar las distintas secciones</h2>
        <ul>
            <li>Nosotros</li>
            <li>Cursos</li>
            <li>Contacto</li>
        </ul>
        <p>Cualquier otro intento te dara error</p>`)
    }else if(req.url === '/nosotros'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'HTML');
        res.end(`<h1>Bienvenido a la Seccion de Nosotros</h1>
        <p>En esta seccion te hablaremos un poco de nuestros comienzos, nuestra historia, y, gracias a ella, todo lo que HOY podemos ofrecerte</p>`)
    }else if(req.url === '/cursos'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'HTML');
        res.end(`<h1>Bienvenido a la Seccion de Cursos</h1>
        <h3>Aqui encontraras todos los cursos que tenemos disponibles en este momento</h3>
        <ul>
            <li>Maquetacion Web con HTML y CSS - Tailwind</li>
            <li>Domina Javascript con proyectos practicos</li>
            <li>ReactJs, el framework creado por Meta</li>
        </ul>`);
    }else if(req.url === '/contacto'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'HTML');
        res.end(`<h1>Bienvenido a la Seccion de Contacto</h1>
        <h3>Estas son nuestras formas de contacto</h3>
        <ul>
            <li>Mail</li>
            <li>Teléfono</li>
            <li>Dirección</li>
        </ul>`);
    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Pagina Solicitada NO ENCONTRADA');
    }
});

server.listen(PORT, ()=>{
    console.log(`Servidor ejecutandose en el puerto: ${PORT}`);
});