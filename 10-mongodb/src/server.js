const server = express();
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;

const { connectToMongoDB, disconnectFromMongoDB } = require("./mongodb");

//Middleware
server.use((req,res,next) =>{
    res.header('Content-Type', 'application/json; charset=utf8');
    next();
});

server.get('/', (req,res)=>{
    res.status(200).end('Bienvenido a la API de frutas');
});

server.get('/frutas', async (req,res)=>{
    const client = await connectToMongoDB();
        if(!client){
            res.status(500).send('Error al conectarse a MongoDB');
            return;
        }

    const db = client.db('frutas');
    const frutas = await db.collection('frutas').find().toArray();

    await disconnectFromMongoDB();
        res.json(frutas);
})

server.get('/frutas/:id', async (req,res)=>{
    const frutaId = parseInt(req.params.id) || 0;


    const client = await connectToMongoDB();
    const db = client.db('frutas');
    const fruta = await db.collection('frutas').findOne({id: frutaId});

    await disconnectFromMongoDB();
        res.json(fruta);
})











server.listen(PORT, HOST, ()=>{
    console.log(`Servidor corriendo en ${HOST}:${PORT}`);
})
