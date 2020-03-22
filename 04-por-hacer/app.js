const {argv} = require('./config/yargs')
const colors = require('colors');
const { crear, getListado, actualizar, borrar } = require('./por-hacer');
let comando = argv._[0];
let descripcion = argv.descripcion || argv.d;

switch(comando) {
    case 'crear':
        const tarea = crear(descripcion);
        console.log(tarea);
    break;
    case 'listar':
        const porHacer = getListado();
        for(let tarea of porHacer) {
            console.log('========Por Hacer========='.green);
            console.log('Descripcion: ',tarea.descripcion);
            console.log('Estado: ',tarea.completado);
            console.log('=========================='.green);
        }
    break;
    case 'actualizar':
        const completado = argv.completado || argv.c;
        const actualizado = actualizar(descripcion, completado);
        if(actualizado){
            console.log('Se actualizo el estado');
        } else {
            console.log('No se actualizo el estado');
        }
    break;
    case 'borrar':
        const borrado = borrar(descripcion);
        if(borrado){
            console.log('Se borro la tarea');
        } else {
            console.log('No se borro la tarea');
        }
    break;
    default: 
            console.log('Comando no reconocido');
            
}