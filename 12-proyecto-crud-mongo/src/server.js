const express = require('express');
const server = express();
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();


server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const { connectToDB, disconnect, generateID } = require('../mongodb')

//OBTENER TODOS LOS PRODUCTOS
server.get('/api/productos', async (req, res)=>{
    
    const collection = await connectToDB('productos');
    const productos = await collection.find().toArray();
    
    res.status(200).send(JSON.stringify(productos, null, '\t'));
    
})

//OBTENER PRODUCTO POR ID
server.get('/api/productos/:id', async (req, res) => {
    const { id } = req.params

    const collection = await connectToDB('productos');
    const producto = await collection.findOne( { id: { $eq: Number(id) } } );
    
    if(!producto){
        return res.status(404).send('Error. No se encuentra producto con la ID solicitada')
    }

    res.status(200).send(JSON.stringify(producto, null, '\t'));
})


//OBTENER PRODUCTO POR NOMBRE - necesito seguir revisando
// server.get('/api/productos', async (req, res) => {
//     const { nombre } = req.query
    

//     const collection = await connectToDB('productos');
    
    // await collection.createIndex({nombre: 'text'})
    
    // const producto = collection.find({ $text: {$search: /nombre/}}).toArray();

//PROBAR***************************************
// let productoNombre = RegExp(nombreQuery, "i");
// productos = await collection.find({ nombre: productoNombre}).toArray();
    
    // const producto = collection.
    
//     if(!producto){
//         return res.status(404).send('Error. No se encuentra producto con el nombre solicitado')
//     }
//     res.status(200).send(JSON.stringify(producto, null, '\t'));

//FUNCIONA/////////////
//     const {nombre, marca, precio, categoria}=req.query;
//     const filtros={};

//     if(codigo) filtros.codigo=Number(codigo);
//     if (nombre){
//         let nombreBuscado = RegExp(nombre,"i");
//         filtros.nombre = nombreBuscado;
//     }

//     if (precio) filtros.precio = Number(precio);
//     if (categoria) filtros.categoria = categoria;
    
//     let productos=[];

//     const collection = await connectToDB('productos');

//     if(!collection) return res.status(400).send(`Error. No pudo recuperarse la DB solicitada`)

//     productos = await collection.find(filtros).toArray();

//     disconnect();

//     if(productos.length===0) return res.status(400).send(`Error. No pudo recuperarse la informacion`)

//     res.status(200).send(JSON.stringify(productos,null,"\t"));

// })


//AGREGAR UN PRODUCTO NUEVO
server.post('/api/productos', async (req, res) => {
    const { nombre, marca, categoria, precio, stock } = req.body

    if(!nombre||!marca||!categoria||!precio||!stock){
        return res.status(404).send('Error. Faltan agregar datos')
    }

    const collection = await connectToDB('productos')
    const producto = {id: await generateID(collection), nombre, marca, categoria, precio, stock}

    await collection.insertOne(producto)

    res.status(200).send(JSON.stringify(producto, null, '\t'));
})

//ACTUALIZAR UN PRODUCTO
server.put('/api/productos/:id', async (req, res) => {
    const { id } = req.params
    const { nombre, marca, categoria, precio, stock } = req.body

    if(!id && !nombre && !marca && !categoria && !precio && !stock) {
        return res.status(404).send('Error. Faltan actualizar datos')
    }

    try{
        const collection = await connectToDB('productos');
        await collection.updateOne({ id: Number(id) }, { $set: req.body })
        res.status(200).send(JSON.stringify(req.body, null, '\t'));
    }catch(error){
        console.log(error)
        res.status(500).send(error.message)
    }finally{
        await disconnect()
    }

})

//ACTUALIZAR SOLO PROPIEDADES NECESARIAS DE UN PRODUCTO
server.patch('/api/productos/:id', async (req, res) => {
    const { id } = req.params
    const { nombre, marca, categoria, precio, stock } = req.body

    try{
        const collection = await connectToDB('productos')
        await collection.updateOne({id: Number(id)}, { $set: req.body })
        res.status(200).send(JSON.stringify(req.body, null, '\t'))
    }catch(error){
        console.log(error)
        res.status(500).send(error.message)
    }finally{
        await disconnect();
    }
})

//ELIMINAR UN PRODUCTO
server.delete('/api/productos/:id', async (req,res) =>{
    const { id } = req.params

    try{
        const collection = await connectToDB('productos')
        const producto = await collection.findOne({ id: {$eq: Number(id)} })
        await collection.deleteOne(producto)
        res.status(200).send(JSON.stringify(producto, null, '\t'))
    }catch(error){
        console.log(error)
        res.status(404).send(error.message)
    }
})



server.use('*', (req,res) =>{
    res.status(404).send('<h1>Error. Página solicitada no encontrada</h1>')
})

server.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log(`Servidor corriendo en ${process.env.HOST}:${process.env.PORT}`)
})
