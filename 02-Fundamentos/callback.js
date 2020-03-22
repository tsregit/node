setTimeout( () => { 
    console.log('Hola Mundo');
    
}, 3000);

let getUsuarioById = (id, callback) => {
    let usuario = {
        nombre: 'Datos de BD',
        id
    }
    if( id == 20 ) {
        callback(`El usuario con id: ${id} no existe en BD`);
    } else {
        // Con null le indica que no existe error
        callback(null, usuario);
    }
};

getUsuarioById(20, (err, usuario) => {
    if(err) {
        console.log(err);
        return;
        
    }
    console.log('Usuario de base de datos.....', usuario);
    
});
