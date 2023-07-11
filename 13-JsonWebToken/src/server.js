const express = require('express');
const server = express();
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env')})
const {generateToken, verifyToken, checkRole} = require('./security')

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended:true }));

const user = {
    id: 135000855,
    name: 'Juan',
    apellido: 'Perez',
    username: 'Juancito',
    password: '123456',
    isAdmin: false //si ponemos true podemos acceder al perfil de admin/recursos luego de crear el token.
}

server.post('/login', async (req, res) => {
    const {username, password} = req.body;
    
    if (username === user.username && password === user.password) {
        return res.status(200).send({ token: generateToken(username, user.isAdmin) })
    }else{
        res.status(401).send('Credenciales Inválidas')
    }
})

server.get('/recurso/publico', (req,res) =>{

    res.status(200).send('Este es un recurso PUBLICO')

});

server.get('/recurso', verifyToken, (req,res) =>{

    res.status(200).send('Este es un recurso PROTEGIDO, '+ req.username)

});

server.get('/admin/recurso', verifyToken, (req,res) =>{

    checkRole(req, res) 

    res.status(200).send('Este es un recurso protegido solo para ADMINISTRADORES'); //verificamos si es admin
    
});

server.use('*', (req,res)=>{
    res.status(404).send('Sitio no encontrado')
})


//método oyente de peticiones
server.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log(`Server iniciado en ${process.env.HOST}:${process.env.PORT}`)
})