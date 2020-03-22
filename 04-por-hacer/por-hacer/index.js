const fs = require('fs');
let listadoPorHacer = [];


const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('./DB/data.json', data, (err) => {
        if(err) throw new Error(`Error el grabar datos en el archivo ${err.message}`);
    });
};

const cargarDB = () => {
    try{
        listadoPorHacer = require('../DB/data.json');
    }catch(e){
        console.log(e.message);
        listadoPorHacer = [];
        
    }
};

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false,
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
};

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    const index = listadoPorHacer.findIndex(tareas => tareas.descripcion.toUpperCase() === descripcion.toUpperCase());
    if( index >= 0 ) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tareas => tareas.descripcion.toUpperCase() !== descripcion.toUpperCase());
    if(nuevoListado.length == listadoPorHacer.length){
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        return true;
    }
    guardarDB();
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}