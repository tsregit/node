/**
 * 
 */

 // Con agregar async se hace lo mismo que abajo
 const getNombreConAsync = async() => 'Josefa'

 // que esto
 const getNombreSinAsync = () => {
     return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve('Tania');
         }, 3000);
     });
 }

 let saludo = async() => {
    const nombre = await getNombreSinAsync();
    return `Hola ${nombre}`;
 };

 saludo()
.then(respuesta => console.log(respuesta))
.catch(e => console.log(e));
 