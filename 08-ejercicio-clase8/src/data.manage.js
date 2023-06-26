const fs = require('fs');
const path = require('path');

const rutaDatos = path.join(__dirname, 'public/lista-productos.json');

function leer(){
    return new Promise((resolve, reject) => {
        fs.readFile(rutaDatos, 'utf-8', (error,resultado)=>{
            if(!error){
                resolve(JSON.parse(resultado));
            }else{
                reject(new Error("Error. No se puede Leer"));
            }
        });
    });
};

async function buscarId(id){
    const productos = await leer();

    if(!id){
        throw new Error("Error. No se definió ID")
    }else{
        const producto = productos.find((elemento)=> elemento.id === id)
        
        if(!producto){
            throw new Error(`No existe el Producto con Id: ${id}`);
        } else{
            return producto;
        }
    }
};



async function buscarNombre(nombre){
    const productos = await leer();

    let resultado = [];

    productos.forEach(producto => {
        if(producto.nombre.toLowerCase().includes(nombre)){
            resultado.push(producto);
        }
        if(!resultado){
            throw new Error("Error. No hay ningun producto con ese nombre")
        }
    });
    return resultado
}

async function listadoProductos(){
    const productos = await leer();
    return productos
}

module.exports = { leer, buscarId, buscarNombre, listadoProductos };