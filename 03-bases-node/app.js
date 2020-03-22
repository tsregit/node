const colors = require('colors/safe');
const { crearArchivo, listarTabla } =  require('./multiplicar/multiplicar');
const { argv } = require('./config/yargs');
const comando = argv._[0];
const base = argv.base || argv.b;
const limite = argv.limite || argv.l;

switch(comando){
    case 'listar':
        listarTabla(base, limite);
    break;
    case 'crear':
        crearArchivo(base, limite)
        .then(archivo => console.log(colors.green(archivo)))
        .catch(err => console.log(err.message));
    break;
    default: console.log('Comando no reconocido');
    break;
}