const fs = require('fs');
const path = require('path');

const rutaProductos = path.join(__dirname, 'productos.json')

function leer() {
    return new Promise((resolve, reject) => {
        fs.readFile(rutaProductos, "utf8", (error, result) => {
            if (error) reject(new Error("Error. No se puede leer"));

            resolve(JSON.parse(result));
        });
    });
}

async function encontrarProducto(nombre){
    const productos = await leer();
    let resultado = [];
    for (let i=0; i<productos.length; i++){
        if(productos[i].producto.toLowerCase().includes(nombre.toLowerCase())){
            resultado.push(productos[i]);
        }
    }
    if(resultado = []) {
        throw new Error("Error. No hay ningun producto con ese nombre")
    }
    return resultado
}

async function encontrarId(id) {
    const productos = await leer();
    
    if (!id) {
        throw new Error("Error. El Id está indefinido.")
    }else{
        const producto = productos.find((element) => element.id === id);

        if (!producto) {
            throw new Error("Error. El Id no corresponde a un producto en existencia.")
        }else{
            return producto;
        }
    }
};

async function encontrarTodos(){
    const productos = await leer();
    return productos
}


module.exports = { encontrarId, encontrarTodos, encontrarProducto };