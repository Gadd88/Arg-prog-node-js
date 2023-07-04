const server = express();
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;

const { conectarMongoDB, desconectarMongoDB } = require("./mongodb");

//Middleware: establece el manejo de datos en formato JSON
server.use((req,res,next) =>{
    res.header('Content-Type', 'application/json; charset=utf8');
    next(); //IMPORTANTE, hace que la ejecucion continue con el siguiente middleware
});

server.get('/', (req,res)=>{
    res.status(200).end('Bienvenido a la API de frutas');
});

server.get('/frutas', async (req,res)=>{
    const client = await conectarMongoDB(); //creamos un cliente para la consulta
        if(!client){
            res.status(500).send('Error al conectarse a MongoDB');
            return;
        }

    const db = client.db('prueba'); //Conectamos a la base de datos que queremos usar en nuestro cluster
    const frutas = await db.collection('frutas').find().toArray(); //la collection es la TABLA que queremos utilizar dentro de la base de datos que elegimos

    await desconectarMongoDB();
        res.json(frutas);
})

server.get('/frutas/:id', async (req,res)=>{
    const { id } = req.params;

    const client = await conectarMongoDB();
    const db = client.db('prueba');
    const fruta = await db.collection('frutas').findOne({id: {$eq: Number(id)}});

    await desconectarMongoDB();
    res.status(200).send(JSON.stringify(fruta, null, '\t'));
})

server.get('/coches', async (req, res) => {

    const client = await conectarMongoDB();
    if(!client) return res.status(500).send('Error. No se pudo conectar con MongoDB');

    const db = client.db('prueba');
    const coches = await db.collection('coches').find().toArray();

    await desconectarMongoDB();
    res.status(200).send(JSON.stringify(coches, null, '\t'));
})

server.get('/coches/:id', async (req, res) => {

    const { id } = req.params;

    const client = await conectarMongoDB();
    if(!client) return res.status(500).send('Error. No se pudo conectar con MongoDB');

    const db = client.db('prueba');
    const coche = await db.collection('coches').findOne({ id: { $eq: Number(id) } });
    if(!coche) return res.status(400).send('Error. El ID no corresponde a un coche en existencia')

    await desconectarMongoDB();
    res.status(200).send(JSON.stringify(coche, null, '\t'));
})

server.get('*', (req, res) =>{
    res.status(404).send('No se encuentra la página solicitada')
})

server.listen(PORT, HOST, () =>{
    console.log(`Servidor iniciado en ${HOST}:${PORT}`)
})


