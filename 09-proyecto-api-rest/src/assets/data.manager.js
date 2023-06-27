const fs = require('fs');
const path = require('path')

const rutaProductos = path.join(__dirname, '../public/lista-productos.json');

function cargarDatos(contenido) {
    return new Promise((resolve, reject) => {
        fs.writeFile(rutaProductos, JSON.stringify(contenido, null, "\t"), "utf8", (error) => {
            if (error) reject(new Error("Error. No se puede escribir"));

            resolve(true);
        });
    });
};


function leerDatos(){
    return new Promise((resolve,reject) =>{
        fs.readFile(rutaProductos, 'utf-8', (error, resultado) =>{
            if(!error){
                console.log(`Archivo ${rutaProductos} cargado correctamente`)
                resolve(JSON.parse(resultado));
            }else{
                reject(new Error('Error. No se pudo leer el archivo'));
            }
        });
    })
};

function generarId(productos){
    let mayorId = 0;

    productos.forEach((producto) => {
        if (Number(producto.id) > mayorId){
            mayorId = Number(producto.id)
        }
    })

    return mayorId + 1;
}


async function listaProductos(){
    const productos = await leerDatos();
    return productos
}

async function borrarProducto(id){
    if(!id) throw new Error("Error con el ID. No existe el producto")
    
    const productos = await leerDatos();

    const index = productos.findIndex((elemento) => elemento.id === id)

    if(index < 0) throw new Error("Error. El ID solicitado no corresponde a un producto en la BBDD")

    const producto = productos[index];
    productos.splice(index, 1)
    await cargarDatos(productos)
    
    return producto;   
    
}

async function nuevoProducto(producto){
    if (!producto?.nombre || !producto?.marca || !producto?.categoria || !producto?.precio || !producto?.stock) throw new Error('Error. Datos Incompletos')

    const productos = await leerDatos();
    const nuevoProd = {id: generarId(productos), ...producto}

    productos.push(nuevoProd);
    await cargarDatos(productos)

    return nuevoProd;
}

async function actualizarProducto(producto){
    if (!producto?.id || !producto?.nombre || !producto?.marca || !producto?.categoria || !producto?.precio || !producto?.stock) throw new Error('Error. Datos Incompletos')

    const productos = await leerDatos();
    const index = productos.findIndex((elemento)=> elemento.id === producto.id)

    if (index<0) throw new Error('Error. El ID no corresponde con ningun producto de la lista');

    productos[index] = producto;
    await cargarDatos(productos);

    return producto;
}

async function idProducto(id){
    const productos = await leerDatos();

    let producto = productos.find(elemento => (elemento.id === id))

    if(!producto){
        throw new Error('No se encuentra el producto con el ID solicitado')
    }else{
        return producto
    }
}


module.exports = { borrarProducto, nuevoProducto, actualizarProducto, idProducto, listaProductos }