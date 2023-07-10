//Para generar tokens aleatorios simples*******************

const numAleatorio = Math.random();

const numAleatorioEnt = parseInt(numAleatorio * 1000000);

//console.log(numAleatorioEnt);

//Tokens con identificadores únicos*************************
//biblioteca CRYPTO de JS utiliza un metodo llamado randomUUID() que nos permite generar un UUID(universally unique identifier) aleatorio de 32 caracteres

const crypto = require('crypto');

const uuid1 = crypto.randomUUID();

console.log(uuid1);

//podemos eliminar los guiones del uuid generado usando
const uuidFormateado = uuid1.replaceAll('-', '').slice(0,10); //replaceAll elimina los guiones y SLICE recorta para que solo sean 10 caracteres

console.log(uuidFormateado);

