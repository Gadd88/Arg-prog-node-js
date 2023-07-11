const jwt = require('jsonwebtoken');

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env')})

//ESTRUCTURA DE JWT => {}, {}, {} => HEADER, PAYLOAD, SIGNATURE => HEADER no hace falta porque es HS256 por defecto, en PAYLOAD ponemos lo que estamos firmando, usuario y si es admin, en SIGNATURE va nuestra firma que guardamos en el archivo .env y podemos poner un tiempo de expiración.

function generateToken(username, isAdmin){
    return jwt.sign({ username, isAdmin }, process.env.SECRET_KEY, { expiresIn: '1h' })
}

function verifyToken(req,res,next){
    const authorizationHeader = req.get('authorization');
    const token = authorizationHeader && authorizationHeader.split(' ')[1]; //comprobamos si existe authorizationheader y lo dividimos trayendo la 2da parte del array, que seria nuestro token
    
    if (!token) return res.status(400).send('Empty token');

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) =>{
        
        if (error) return res.status(401).send(error.message);

        req.username = decoded.username;
        req.isAdmin = decoded.isAdmin;

        console.log(decoded);
    })

    next(); //debe tener si o si next() sino queda en un ciclo infinito y nunca responde
}

function checkRole(req, res){

    if (!req.isAdmin) return res.status(403).send('No estas autorizado');
}


module.exports = { generateToken, verifyToken, checkRole };