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

console.log(leer());