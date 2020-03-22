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

const getEmpleado = (id, callback) => {
    let empleadoDB =  empleados.find( empleado => empleado.id == id);
    if(empleadoDB) {
        callback(null, empleadoDB);
    } else {
        callback(`No existe el empleado con el ID: ${id}`);
    }
    
};

const getSalario = (empleado, callback) => {
    const salarioB = salarios.find( salario => salario.id == empleado.id);
    if(salarioB) {
        callback(null, {
            nombre: empleado.nombre,
            salario: salarioB.salario
        });
    } else {
        callback(`No se encontro un salario para el usuario ${empleado.nombre}`);
    }
}

getEmpleado(1, (err, empleado) => {
    if(err){
        console.log(err);
        return;
    }
    getSalario(empleado, (err, respuesta) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(`El salario de ${respuesta.nombre} es de $${respuesta.salario}`);
    });
    // console.log(empleado);    
});