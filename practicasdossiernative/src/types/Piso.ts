export interface Piso {
    id: number;
    titulo: string;
    descripcion: string;
    electrodomesticos: string;
    estanciaMinimaDias: number;
    fotos: string[];
    fumar: boolean;
    gasIncluido: boolean,
    jardin: boolean,
    luzIncluida: boolean,
    mCuadrados: number,
    mascotas: boolean,
    numHabitaciones: number,
    mapsLink: string,
    parejas: boolean,
    precioMes: number,
    propietarioReside: boolean,
    terraza: boolean,
    ubicacion: string,
    valoracion: number,
    num_votos: number,
    wifi: boolean,
    ascensor: boolean;
    anotaciones: string;
    idAnotacion: number;

}