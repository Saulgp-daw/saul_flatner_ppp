import { Piso } from "./Piso";

export interface Usuario { 
    email: string;
    nombre: string;
    apellidos: string;
    fotoPerfil: string;
    hash: string;
    sexo: string;
    fechaUltimaEstancia: number;
    fechaUltimoAlquiler: number;
    anhoNacimiento: number;
    valoracion: number;
    numVotos: number;
    propiedades: Piso[];
    pisosInteres: Piso[];
    pisoActual: Piso;
}