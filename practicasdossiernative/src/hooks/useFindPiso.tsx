import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ip } from '../../global';
import { useAppContext } from '../contexts/TokenContextProvider';
import axios from 'axios';

type Piso = {
    idPiso: number;
    ascensor: boolean;
    descripcion: string;
    electrodomesticos: string;
    estanciaMinimaDias: number;
    fotos: string[];
    fumar: boolean;
    gasIncluido: boolean;
    jardin: boolean;
    luzIncluida: boolean;
    mCuadrados: number;
    mascotas: boolean;
    numHabitaciones: number;
    mapsLink: string;
    parejas: boolean;
    precioMes: number;
    propietarioReside: boolean;
    terraza: boolean;
    titulo: string;
    ubicacion: string;
    valoracion: number;
    wifi: boolean;
    propietario: Usuario;
    usuariosInteresados: Usuario[];
    inquilinos: Usuario[];
}

type Usuario = {
    email: string;
    nombre: string;
    valoracion: number;
}

const useFindPiso = (idPiso: number) => {
    const ruta = "http://" + ip + "/api/v2/pisos/" + idPiso;
    const { token, settoken } = useAppContext();
    const [piso, setPiso] = useState<Piso>();
    console.log(ruta);
    const [reload, setReload] = useState(true);

    useEffect(() => {

        const axiosget = async () => {
            try {
                const response = await axios.get(ruta, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
               

                const data = response.data;

                const propietario: Usuario = { 
                    email: data.propietario.email,
                    nombre: data.propietario.nombre,
                    valoracion: data.propietario.valoracion,
                };

                console.log("TEST: -----------------------\n");

                const test: Usuario[] = data.usuariosInteresados.map((watchlist: any) => {
                    console.log(watchlist);
                    
                 });

                const usuariosInteresados: Usuario[] = data.usuariosInteresados.map((watchlist: any) => ({ 
                    email: watchlist.usuario.email,
                    nombre: watchlist.usuario.nombre,
                    valoracion: watchlist.usuario.valoracion,
                }));
                console.log("Usuarios interesados: -----------------------\n");
                console.log(usuariosInteresados);
                
                

                const inquilinos: Usuario[] = data.inquilinos.map((inquilinoData: any) => ({ 
                    email: inquilinoData.email,
                    nombre: inquilinoData.nombre,
                    valoracion: inquilinoData.valoracion,
                }));

                const find = {
                    idPiso: response.data.idPiso,
                    ascensor: response.data.ascensor,
                    descripcion: response.data.descripcion,
                    electrodomesticos: response.data.electrodomesticos,
                    estanciaMinimaDias: response.data.estanciaMinimaDias,
                    fotos: response.data.fotos,
                    fumar: response.data.fumar,
                    gasIncluido: response.data.gasIncluido,
                    jardin: response.data.jardin,
                    luzIncluida: response.data.luzIncluida,
                    mCuadrados: response.data.mCuadrados,
                    mascotas: response.data.mascotas,
                    numHabitaciones: response.data.numHabitaciones,
                    mapsLink: response.data.mapsLink,
                    parejas: response.data.parejas,
                    precioMes: response.data.precioMes,
                    propietarioReside: response.data.propietarioReside,
                    terraza: response.data.terraza,
                    titulo: response.data.titulo,
                    ubicacion: response.data.ubicacion,
                    valoracion: response.data.valoracion,
                    wifi: response.data.wifi,
                    propietario: propietario,
                    usuariosInteresados: usuariosInteresados,
                    inquilinos: inquilinos
                };
                console.log(find);
                
                setPiso(find);
                setReload(false);


            } catch (error) {
                console.log(error);
                setReload(false);

            }
        }
        axiosget();
    }, [reload]);



    return { piso, reload, setReload}
}

export default useFindPiso