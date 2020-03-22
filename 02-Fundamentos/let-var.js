//LET
/**
 * Con let no se puede crear mas de una variable con el mismo nombre
 */
let nombre = 'Wolverine';

// VAR
/**
 * con var se puede reutilizar y reiniciar n veces.
 * Siempre va a tener el valor de la ultima asignacion no importa el bloque en el cual se encuentre
 */
if( true ){
    // Acá se puede declarar nuevamente la variable nombre con let
    // porque es otro scope
    let nombre = 'Magneto';
}

console.log(nombre);

let i;
for (i = 0; i <= 5; i++) {
    console.log(`i ${i}`);
    
}
console.log(`i ${i}`);
