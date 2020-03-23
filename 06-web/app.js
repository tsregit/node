const http = require('http');
http.createServer((req, rsp) => {

    rsp.write('Hola Mundo');
    rsp.end();

}).listen(8085);

console.log("Escuchando puerto 8085");
