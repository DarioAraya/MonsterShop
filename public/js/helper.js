function limitePalabra(nombre) {
    let nuevaPalabra = '';
    if (nombre.length > 14) {
        for (let i = 0; i < 14; i++) {
            nuevaPalabra += nombre[i];
        }
        nuevaPalabra += "...";
        return nuevaPalabra
    } else {
        return nombre;
    }
}

