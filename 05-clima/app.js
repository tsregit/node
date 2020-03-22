const { argv } = require('./config/yargs');
const { getLugarLatLng } = require('./lugar');
const { getClima } = require('./clima');

const getInfo = async () => {
    const direccionArgv = argv.direccion || argv.d;
    try{
        const {lat, lng, direccion} = await getLugarLatLng(direccionArgv);
        const clima = await getClima(lat, lng);
        return `El clima de ${direccion} es de ${clima} ºC`;
    } catch(e){
        console.log(e.message);
        return `No se pudo determinar el clima de ${direccionArgv}`;    
    }
}

getInfo()
.then(info => console.log(info))
.catch(err => console.log(err));
