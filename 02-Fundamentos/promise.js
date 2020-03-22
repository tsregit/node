const empleados = [{
    id: 1,
    nombre: 'María'
},
{
    id: 2,
    nombre: 'Juan'
},
{
    id: 3,
    nombre: 'Matias'
}];

const salarios = [{
    id: 1,
    salario: 1000
},
{
    id: 2,
    salario: 2000
}];

const getEmpleado = (id) => 
     new Promise((resolve, reject) => {
        let empleadoDB =  empleados.find( empleado => empleado.id == id);
        if(empleadoDB) {
            resolve(empleadoDB);
        } else {
            reject(`No existe el empleado con el ID: ${id}`);
        }
    });

const getSalario = (empleado) => 
    new Promise((resolve, reject) => {
        const salarioB = salarios.find( salario => salario.id == empleado.id);
        if(salarioB) {
            resolve({
                nombre: empleado.nombre,
                salario: salarioB.salario
            });
        } else {
            reject(`No se encontro un salario para el usuario ${empleado.nombre}`);
        }
    });


    getEmpleado(3)
    .then(empleado => getSalario(empleado))
    .then(salario => console.log(`El salario de ${salario.nombre} es de $${salario.salario}`))
    .catch(err => console.log(err));