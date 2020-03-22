    let superHeroe = {
        nombre : 'Wade',
        apellido : 'Winston',
        poder : 'Regeneración',
        getNombre()
        {
            return `${this.nombre} ${this.apellido} - poder: ${this.poder}`;
        }
    }

    console.log(superHeroe.getNombre());
    
    // Ejemplo con un identificador para cuando existen nombre iguales
    const { nombre: identificador, apellido, poder } = superHeroe;
    console.log(identificador, apellido, poder);
    