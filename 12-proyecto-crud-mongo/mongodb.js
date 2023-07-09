const { MongoClient } = require('mongodb');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '.env')});

const client = new MongoClient(process.env.DB_URL)

async function connect(){
    console.log('Conectando...');

    let connection = null

    try{
        connection = await client.connect();
        console.log('Conectado');
    }catch(error){
        console.log(error.message)
    }
    return connection;
}

async function disconnect(){
    try{
        await client.close();
        console.log('Desconectado');
    }catch(error){
        console.log(error.message)
    }
}

async function connectToDB(collectionName){
    const connection = await connect();

    const db = connection.db(process.env.DB_USED);

    const collection = db.collection(collectionName);

    return collection;
}

async function generateID(collection){
    const documentMaxId = await collection.find().sort({ id: -1 }).limit(1).toArray();

    const maxId = documentMaxId[0]?.id ?? 0;

    return maxId + 1;
}

module.exports = { disconnect, connectToDB, generateID };