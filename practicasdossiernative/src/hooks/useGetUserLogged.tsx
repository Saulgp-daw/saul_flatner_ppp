import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from 'axios';
import { useAppContext } from '../contexts/TokenContextProvider';
import { ip } from '../../global';
import { Usuario } from '../types/Usuario';

type Props = {}

const useGetUserLogged = () => {
    
    const rutaGetUser = "http://" + ip + "/api/v2/usuarios/";
    const { token, settoken, email, setemail, usuario, setusuario } = useAppContext();
    
 
    async function getUser() {
            
        try {
            const response = await axios.get(rutaGetUser + email, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;

            const usuarioLoggeado: Usuario = {
                email: data.email,
                nombre: data.nombre,
                apellidos: data.apellidos,
                fotoPerfil: data.fotoPerfil,
                hash: data.hash,
                sexo: data.sexo,
                fechaUltimaEstancia: data.fechaUltimaEstancia ?? 0,
                fechaUltimoAlquiler: data.fechaUltimoAlquiler ?? 0,
                anhoNacimiento: data.anhoNacimiento,
                valoracion: data.valoracion,
                numVotos: data.numVotos,
                active: data.active,
                verified: data.verified,
                // Mapeo de propiedades si se proporciona, de lo contrario un array vacío
                propiedades: data.propiedades ? data.propiedades.map((piso: any) => ({
                    id: piso.idPiso,
                    titulo: piso.titulo,
                    descripcion: piso.descripcion,
                    electrodomesticos: piso.electrodomesticos,
                    estanciaMinimaDias: piso.estanciaMinimaDias,
                    fotos: piso.fotos,
                    fumar: piso.fumar,
                    gasIncluido: piso.gasIncluido,
                    jardin: piso.jardin,
                    luzIncluida: piso.luzIncluida,
                    mCuadrados: piso.mCuadrados,
                    mascotas: piso.mascotas,
                    numHabitaciones: piso.numHabitaciones,
                    mapsLink: piso.mapsLink,
                    parejas: piso.parejas,
                    precioMes: piso.precioMes,
                    propietarioReside: piso.propietarioReside,
                    terraza: piso.terraza,
                    ubicacion: piso.ubicacion,
                    valoracion: piso.valoracion,
                    num_votos: piso.num_votos,
                    wifi: piso.wifi,
                    ascensor: piso.ascensor,
                })) : [],
                pisosInteres: data.pisosInteres ? data.pisosInteres.map((watchlist: any) => ({
                    id: watchlist.piso.idPiso,
                    titulo: watchlist.piso.titulo,
                    descripcion: watchlist.piso.descripcion,
                    electrodomesticos: watchlist.piso.electrodomesticos,
                    estanciaMinimaDias: watchlist.piso.estanciaMinimaDias,
                    fotos: watchlist.piso.fotos,
                    fumar: watchlist.piso.fumar,
                    gasIncluido: watchlist.piso.gasIncluido,
                    jardin: watchlist.piso.jardin,
                    luzIncluida: watchlist.piso.luzIncluida,
                    mCuadrados: watchlist.piso.mCuadrados,
                    mascotas: watchlist.piso.mascotas,
                    numHabitaciones: watchlist.piso.numHabitaciones,
                    mapsLink: watchlist.piso.mapsLink,
                    parejas: watchlist.piso.parejas,
                    precioMes: watchlist.piso.precioMes,
                    propietarioReside: watchlist.piso.propietarioReside,
                    terraza: watchlist.piso.terraza,
                    ubicacion: watchlist.piso.ubicacion,
                    valoracion: watchlist.piso.valoracion,
                    num_votos: watchlist.piso.num_votos,
                    wifi: watchlist.piso.wifi,
                    ascensor: watchlist.piso.ascensor,
                    anotaciones: watchlist.anotaciones,
                    idAnotacion: watchlist.id
                })) : [],
                pisoActual: data.pisoActual ?? null
            };
            setusuario(usuarioLoggeado);
            console.log("Datos del usuario loggeado: ------------------------------------\n");
            console.log(usuarioLoggeado);
        } catch (error) {
            console.log("hubo un error en getUserLogged "+error);
        }
    }

    return { getUser }
}

export default useGetUserLogged

const styles = StyleSheet.create({})