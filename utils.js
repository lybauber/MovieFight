
//funcion para establecer un tiempo de espera en la solicitud a la API

const debounce = (func) => {
    let timeoutId;
    return (...args) => {
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(()=> {
            func.apply(null, args);
        }, 1000);
    }
}
