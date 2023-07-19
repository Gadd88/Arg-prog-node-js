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
    const {categoria, precio_menor_que, precio_mayor_que} = req.query;
    let muebles = [];
    try {
        const collection = await connectToDB('muebles');
        if (categoria) muebles = await collection.find({ categoria }).sort({ nombre: 1 }).toArray();
        //  else if (precio === 'min') muebles = await collection.find().sort({ precio: 1 }).limit(1).toArray();
        else if (precio_menor_que) muebles = await collection.find({ precio: { $lte: Number(precio_menor_que) }}).sort({ precio: -1 }).toArray();
        else if (precio_mayor_que) muebles = await collection.find({ precio: { $gte: Number(precio_mayor_que) }}).sort({ precio: 1 }).toArray();
        else muebles = await collection.find().toArray();

        res.status(200).send(JSON.stringify({ payload: muebles }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } finally {
        await disconnect();
    }
});

//  OBTENER PRODUCTO POR ID
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

    if (!nombre || !categoria || !precio) {
        return res.status(400).send(messageMissingData);
    }

    try {
        const collection = await connectToDB('muebles');

        const mueble = {id: await generateCod(collection), nombre, categoria, precio};

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
    const { nombre, categoria, precio } = req.body;

    if (!codigo) return res.status(400).send({ message: 'El codigo no corresponde a un mueble registrado' });
    if (!nombre && !categoria && !precio) return res.status(400).send('Faltan datos relevantes');

    try {
        const collection = await connectToDB('muebles');
        await collection.updateOne({ codigo: Number(codigo) }, { $set: req.body });
        res.status(200).send({ message: 'Registro actualizado', payload: collection.codigo });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: 'El codigo no corresponde a un mueble registrado'});
    } finally {
        await disconnect();
    }
});


//  ELIMINAR UN MUEBLE
server.delete('/api/v1/muebles/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const collection = await connectToDB('muebles');
        const mueble = await collection.findOne({ id: {$eq: Number(id)} });
        await collection.deleteOne(mueble);
        res.status(200).send({ message: 'Registro eliminado' });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: 'El código no corresponde a un mueble registrado' });
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
