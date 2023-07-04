const express = require('express');
require('dotenv').config();

//require("dotenv").config({ path: path.join(__dirname, ".env") } );
//por si el env se encuentra en otra carpeta

const { MongoClient } = require('mongodb');

const URI = process.env.MONGO_URL;
const client = new MongoClient(URI);


async function conectarMongoDB() {
    try{
        await client.connect();
                console.log('Conectado a MongoDB');
        return client;
    } catch(error){
        console.error('Error al conectar a MongoDB: ', error);
        return null;
    }
}

async function desconectarMongoDB(){
    try{
        await client.close();
                console.log('Desconectado de MongoDB');
    } catch(error){
        console.error('Error al desconectarse de MongoDB', error);
    }
}

module.exports = { conectarMongoDB, desconectarMongoDB };
