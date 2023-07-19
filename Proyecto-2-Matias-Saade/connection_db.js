const { MongoClient } = require('mongodb');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });

const client = new MongoClient(process.env.DATABASE_URL);

async function connect() {
    console.log('Conectando...');

    let connection = null;

    try {
        connection = await client.connect();
        console.log('Conectado');
    } catch (error) {
        console.log(error.message);
    }
    return connection;
}

async function disconnect() {
    try {
        await client.close();
        console.log('Desconectado');
    } catch (error) {
        console.log(error.message);
    }
}

async function connectToDB(collectionName) {
    const connection = await connect();

    const db = connection.db(process.env.DATABASE_NAME);

    const collection = db.collection(collectionName);

    return collection;
}

async function generateCod(collection) {
    const documentMaxCod = await collection
        .find()
        .sort({ codigo: -1 })
        .limit(1)
        .toArray();

    const maxCod = documentMaxCod[0]?.codigo ?? 0;

    return maxCod + 1;
}

module.exports = { disconnect, connectToDB, generateCod };
