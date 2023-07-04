const { conectarMongoDB, desconectarMongoDB } = require('./mongodb');


//debemos ejecutarlo de forma asincrona

async function getCoche(){

    const client = await conectarMongoDB();

    const db = await client.db('prueba'); //no necesita await ya que no surte efecto
    
    const coche = await db.collection('coches').findOne({ id: 2 });
    console.log(coche);

    await desconectarMongoDB();

}

async function getCoches(){

    const client = await conectarMongoDB();

    const db = await client.db('prueba'); //no necesita await ya que no surte efecto
    
    const coches = await db.collection('coches').find().toArray;
    
    console.table(coches) //mas facil de leer al ser varios elementos

    await desconectarMongoDB();

}


async function test(){
    await getCoche();
    await getCoches();
}

test();