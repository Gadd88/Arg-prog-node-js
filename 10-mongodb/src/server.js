const express = require('express');
require('dotenv').config();
const server = express();
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const URI = `mongodb+srv://${process.env.CLIENT}:${process.env.DB_PASS}@db-argprog.4jbosth.mongodb.net/`;
const client = process.env.CLIENT;
const pass = process.env.PASS;
const cluster = process.env.CLUSTER;













server.listen(PORT, HOST, ()=>{
    console.log(`Servidor corriendo en ${HOST}:${PORT}`);
})
