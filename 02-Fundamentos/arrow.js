// Function normal
function sumar (a,b) {
    return a + b;
}

console.log(sumar(10,20));

const sumarArrowFunction = (a,b) => a + b;

const saludar = () => 'Hola Mundo';

const saludarConNombre = nombre => `Hola ${nombre}`;

/**
 * Una caracteristica de las funciones de flecha es que el  
 * valor de this apunta a un valor que tenga el objeto this fuera de la funcion
 * En este caso las 3 variables con this se imprime undefined 
 */
let superHeroe = {
    nombre : 'Wade',
    apellido : 'Winston',
    poder : 'Regeneración',
    getNombre: () =>
    {
        return `${this.nombre} ${this.apellido} - poder: ${this.poder}`;
    }
}


console.log(sumarArrowFunction(10,20));
console.log(saludar());
console.log(saludarConNombre('Juan'));
console.log(superHeroe.getNombre());



