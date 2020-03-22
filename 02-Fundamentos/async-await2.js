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

const getEmpleado = async (id) => 
    {
        let empleadoDB =  empleados.find( empleado => empleado.id == id);
        if(empleadoDB) {
            return empleadoDB;
        } else {
            throw new Error(`No existe el empleado con el ID: ${id}`);
        }
    }

const getSalario = async(empleado) => 
    {
        const salarioB = salarios.find( salario => salario.id == empleado.id);
        if(salarioB) {
            return {
                nombre: empleado.nombre,
                salario: salarioB.salario
            };
        } else {
            throw new Error(`No se encontro un salario para el usuario ${empleado.nombre}`);
        }
    }

    const getInformacion = async(id) => {
        const empleado = await getEmpleado(id);
        const salario = await getSalario(empleado);
        return `El salario de ${salario.nombre} es de $${salario.salario}`;
    }

    getInformacion(1)
    .then(respuesta => console.log(respuesta))
    .catch(err => console.log(err));