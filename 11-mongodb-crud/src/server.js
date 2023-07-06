const { connectToDB, disconnect, generateID } = require('../mongodb')

// async function test(){
//     await connectToDB('coches')
//     await disconnect()
// }

// test();

// db.collection.find({ auto: { $regex: /ford/ } })

const express = require('express');
const server = express();

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '127.0.0.1'

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


// server.get('/coches/', async (req,res) =>{

//     const collection = await connectToDB('coches');
//     const coches = await collection.find().toArray();

//     res.status(200).send(JSON.stringify(coches, null, '\t'))
// })

server.get('/coches', async (req,res) =>{

    const { marca, modelo, precio_mayor_que } = req.query;
    const filtros = {};

    if (marca) filtros.marca = marca;
    if (modelo) filtros.modelo = modelo;
    if (precio_mayor_que) filtros.precio = { $gt: Number(precio_mayor_que) };

    let coches = [];

    const collection = await connectToDB('coches');

    // if(marca) coches = await collection.find({ marca }).toArray();
    // else if(modelo) coches = await collection.find( modelo ).toArray();
    
    coches = await collection.find(filtros).toArray();

    res.status(200).send(JSON.stringify(coches, null, '\t'))
})

server.get('/coches/marca/:marca', async (req,res) =>{
    const { marca } = req.query

    const collection = await connectToDB('coches');
    const coches = await collection.find({ marca }).toArray();

    if(!coches) return res.status(400).send('Error. El id no corresponde a un coche existente')

    res.status(200).send(JSON.stringify(coches, null, '\t'))
})

server.get('/coches/:id', async (req,res) =>{
    const { id } = req.params

    const collection = await connectToDB('coches');
    const coche = await collection.findOne({ id: {$eq: Number(id)} } );

    if(!coche) return res.status(400).send('Error. El id no corresponde a un coche existente')

    res.status(200).send(JSON.stringify(coche, null, '\t'))

    
})

server.post('/coches', async (req,res)=>{
    const { marca, modelo, anio, precio, descuento, velocidad_crucero, es_0km } = req.body;

    if(!marca || !modelo || !anio || !precio ) {
        return res.status(404).send('Error. Faltan datos en la consulta')
    }

    const collection = await connectToDB('coches');
    const coche = { id: await generateID(collection), marca, modelo, anio, precio };
    if (!descuento) coche.descuento = descuento;
    if (!velocidad_crucero) coche.velocidad_crucero = velocidad_crucero;
    if (!es_0km) coche.es_0km = es_0km;

    await collection.insertOne(coche);

    res.status(200).send(JSON.stringify(coche, null, '\t'));

})

server.put('/coches/id', async (req,res)=>{
    const { id } = req.params;
    const { marca, modelo, anio, precio, descuento, velocidad_crucero, es_0km } = req.body;
    const coche = { marca, modelo, anio, precio };

    if(!id && !marca && !modelo && !anio && !precio ) {
        return res.status(404).send('Error. Faltan datos en la consulta')
    }
    if (!descuento) coche.descuento = descuento;
    if (!velocidad_crucero) coche.velocidad_crucero = velocidad_crucero;
    if (!es_0km) coche.es_0km = es_0km;

    try {
        const collection = await connectToDB('coches');
        await collection.updateOne({ id: Number(id) }, { $set: coche });

        res.status(200).send(JSON.stringify(coche, null, '\t'));

    } catch(error) {
        console.log(error)
        res.status(500).send('Hubo un error en el servidor')
    } finally {
        await disconnect();
    }

})

server.delete('/coches/id', async (req,res)=>{
    const { id } = req.params;
    
    try {
        const collection = await connectToDB('coches');
        await collection.deleteOne({id: Number(id)});

        res.status(200).send(JSON.stringify(coche, null, '\t'));

    } catch(error) {
        console.log(error)
        res.status(500).send('Hubo un error en el servidor')
    } finally {
        await disconnect();
    }


})



server.use('*', (req,res) =>{
    res.status(404).send(`<h1>Página no encontrada</h1>`)
})



server.listen(PORT, HOST, () => {
    console.log(`Servidor corriendo en ${HOST}:${PORT}`)
})
