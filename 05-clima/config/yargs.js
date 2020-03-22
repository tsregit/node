const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el climea',
        demand: true,

    }
}).argv;

module.exports = {
    argv
}
