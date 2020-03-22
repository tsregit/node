//requireds
const fs = require('fs');
const colors = require('colors');
// const express = require('express');
// const lala = require('./lala');

const listarTabla = (base = 10, limite) => {
    console.log('======================'.green);
    console.log(`Tabla de ${base}`.green);
    console.log('======================'.green);
    for (let i = base; i <= limite; i++){
        console.log(`${base} * ${i} = ${base * i}`);
    }
}


const crearArchivo = async (base, limite) => {
    let data = '';

    if(!Number(base)){
        throw new Error(`El valor introducido ${base} no es un número`); 
    }
    if(!Number(limite)){
        throw new Error(`El valor introducido ${limite} no es un número`); 
    }
    for (let i = 1; i <= limite; i++){
        data += `${base} * ${i} = ${base * i}\n`;
    }

    fs.writeFile(`./tablas/tabla-${base}-${limite}.txt`, data, (err) => {
        if(err) throw new Error(err);
    });
    return `El archivo tabla-${base}-${limite}.txt a sido creado`;
}

module.exports = {
    crearArchivo,
    listarTabla
}