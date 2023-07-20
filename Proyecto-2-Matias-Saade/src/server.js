const express = require('express');
const server = express();

const dotenv = require('dotenv');
dotenv.config();

const messageNotFound = JSON.stringify({ message: 'El código no corresponde a un mueble registrado' });
const messageMissingData = JSON.stringify({ message: 'Faltan datos relevantes' });
const messageErrorServer = JSON.stringify({ message: 'Se ha generado un error en el servidor' });


server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const { connectToDB, disconnect, generateCod } = require('../connection_db');

//  OBTENER TODOS LOS PRODUCTOS
server.get('/api/v1/muebles', async (req, res) => {
    const {categoria, precio_lte, precio_gte} = req.query;
    let muebles = [];
    try {
        const collection = await connectToDB('muebles');
        if (categoria) muebles = await collection.find({ categoria }).sort({ nombre: 1 }).toArray();
        else if (precio_lte) muebles = await collection.find({ precio: { $lte: Number(precio_lte) }}).sort({ precio: -1 }).toArray();
        else if (precio_gte) muebles = await collection.find({ precio: { $gte: Number(precio_gte) }}).sort({ precio: 1 }).toArray();
        else muebles = await collection.find().toArray();

        res.status(200).send(JSON.stringify({ payload: muebles }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } finally {
        await disconnect();
    }
});

//  OBTENER PRODUCTO POR CODIGO
server.get('/api/v1/muebles/:codigo', async (req, res) => {
    const { codigo } = req.params;

    try {
        const collection = await connectToDB('muebles');
        const mueble = await collection.findOne({ codigo: { $eq: Number(codigo) } });
        if (!mueble) return res.status(400).send(messageNotFound);
        res.status(200).send(JSON.stringify({ payload: mueble }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } finally {
        disconnect();
    }
});


//  AGREGAR UN MUEBLE NUEVO
server.post('/api/v1/muebles', async (req, res) => {
    const { nombre, categoria, precio } = req.body;

    if (!nombre && !categoria && !precio) {
        return res.status(400).send(messageMissingData);
    }

    try {
        const collection = await connectToDB('muebles');

        const mueble = {codigo: await generateCod(collection), nombre, categoria, precio};

        await collection.insertOne(mueble);

        res.status(201).send(JSON.stringify({ message: 'Registro creado', payload: mueble }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } finally {
        disconnect();
    }
});

//  ACTUALIZAR UN MUEBLE
server.put('/api/v1/muebles/:codigo', async (req, res) => {
    const { codigo } = req.params;
    const { nombre, precio, categoria } = req.body;
    if (!nombre || !categoria || !precio) return res.status(400).send({ message: 'Faltan datos relevantes' });
    try {
        const collection = await connectToDB('muebles');
        let mueble = await collection.findOne({ codigo: { $eq: Number(codigo) } });
        if (!mueble) return res.status(400).send({ message: 'El código no corresponde a un mueble registrado' });
        mueble = { nombre, precio: Number(precio), categoria };

        await collection.updateOne({ codigo: Number(codigo) }, {$set: mueble });
        res.status(200).send(JSON.stringify({ message: 'Registro actualizado', payload: { codigo, ...mueble } }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Se ha generado un error en el servido' });
    } finally {
        await disconnect();
    }
});


// ELIMINAR UN MUEBLE
server.delete('/api/v1/muebles/:codigo', async (req, res) => {
    const { codigo } = req.params;

    try {
        const collection = await connectToDB('muebles');
        const mueble = await collection.findOne({ codigo: {$eq: Number(codigo)} });
        if (!mueble) return res.status(400).send({ message: 'El código no corresponde a un mueble registrado' });
        await collection.deleteOne(mueble);
        res.status(200).send({ message: 'Registro eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Se ha generado un error en el servidor' });
    } finally {
        disconnect();
    }
});


server.use('*', (req, res) => {
    res.status(404).send('<h1>Error. Página solicitada no encontrada</h1>');
});

server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Servidor corriendo en ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});
