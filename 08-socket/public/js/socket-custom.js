var socket = io();
socket.on('connect', function () 
{
    console.log("conectado al servidor");
});

socket.on('disconnect', function() {
    console.log("Desconectado del servidor");
    
});

socket.emit('enviarMensaje', {
    usuario: 'Tomas',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log(resp)
});

socket.on('enviarMensaje', (mensaje) => {
    console.log(mensaje);
});