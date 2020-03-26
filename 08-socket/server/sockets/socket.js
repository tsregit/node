const { io } = require('../server');

io.on('connect', (cliente) => {
    console.log('Usuario conectado');

    cliente.on('disconnect', function () 
    {
        console.log('Usuario desconectado');
    });

            
    // Escuchar cliente
    cliente.on('enviarMensaje', (mensaje, callback) => {
        console.log("mensaje", mensaje);
        cliente.broadcast.emit('enviarMensaje', mensaje);

        /*if(mensaje.usuario){
            callback({
                resp: 'Todo OK'
            });
        } else {
            callback({
                resp: 'No OK'
            });
        }*/
    });

    cliente.emit('enviarMensaje', {
        usuario: 'admin',
        mensaje: 'Bienvenido a esta app'
    });
});