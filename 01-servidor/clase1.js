// Solo se vieron definiciones comunes, que es NodeJs, para que sirve, etc etc. Y las instalaciones necesarias..

// para iniciar proyecto con NodeJs usamos "npm init" en la consola y seguimos los pasos.
// Instalamos Express y Express-Handlebars

const nombreCompleto = 'Martin Gonzalez'

const login = false

if (nombreCompleto !== '' && login === false){
    console.log(`Bienvenid@ ${nombreCompleto}`)
    login === false
}else {
    console.log('Usuario no encontrado')
};

// try - catch - finally
try{
    console.log('Intento hacer algo...')
}
catch(error){
    console.log('Error en algo')
}

