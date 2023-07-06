const { MongoClient } = require('mongodb');
const path = require('path');

require('dotenv').config()
// require('dotenv').config({path: path.join(__dirname, '.env')});

const client = new MongoClient(process.env.MONGO_URL);


async function connect(){
    console.log('Conectando...');

    let connection = null 

    try{
        connection = await client.connect();
        console.log('\tConectado')
    }catch(error){
        console.log(error.message);
    }

    return connection;
}

async function disconnect(){

    try{
        await client.close();
        console.log('\tDesconectado')
    }catch(error){
        console.log(error.message);
    }

}

async function connectToDB(connectionName){
    const connection = await connect();
    
    const db = connection.db(process.env.MONGO_DB)
    
    const collection = db.collection(connectionName);

    return collection;
}

async function generateID(collection){
    const documentMaxId = await collection.find().sort({ id: -1 }).limit(1).toArray(); //ordenamos el resultado en orden descendente y capturamos al de mayor ID
    const maxId = documentMaxId[0]?.id ?? 0; //verificamos si existe el 1er elemento del array y ocupamos su id, si no, el maxId es 0

    return maxId + 1;
}


module.exports = { disconnect, connectToDB, generateID };