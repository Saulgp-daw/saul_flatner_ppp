import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { ip } from '../../global';
import axios from 'axios';
import { useAppContext } from '../contexts/TokenContextProvider';
import useGetUserLogged from './useGetUserLogged';
import { Usuario } from '../types/Usuario';
import Toast from 'react-native-toast-message';

type Props = {}

const useWatchList = () => {
    //const ruta = "http://" + ip + "/api/v2/usuarios/"+email+"/watchlist/"+idPiso;
    const [loading, setLoading] = useState(false);
    const [valido, setValido] = useState(false);
    const [error, setError] = useState("");
    const rutaGetUser = "http://" + ip + "/api/v2/usuarios/";
    const { token, settoken, email, setemail, usuario, setusuario } = useAppContext();
    
    function FavoritosAdded() {
        Toast.show({
            type: 'success',
            text1: '¡Piso agregado a favoritos!'
        });
    }

    function FavoritosDeleted() {
        Toast.show({
            type: 'success',
            text1: 'Piso eliminado de favoritos'
        });
    }

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

    function agregar(email: string, idPiso: number) {
        const ruta = "http://" + ip + "/api/v2/watchlists/" + email + "/piso/" + idPiso;
        
        //console.log(ruta);

        //console.log("Pulsaste agregar");
        
        
        async function axiospost () {
            try {
                setLoading(true);
                const response = await axios.post(ruta,{},{ headers: { 'Authorization': `Bearer ${token}` } });
                //console.log(response.data);
                
                let status = response.status;
                //console.log(status);
                if (status === 200) {
                    //console.log("todo correcto");
                    //Alert.alert("Piso añadido", "Respuesta: " + response.status);
                    FavoritosAdded();
                    getUser();
                }


            } catch (error) {
                if (error.response) {
                    // El servidor devolvió una respuesta con un código de estado fuera del rango 2xx
                    console.log(error.response.data); // Aquí puedes acceder a los detalles del error en el lado del servidor
                    setError(error.response.data || "Error desconocido"); // Puedes adaptar esto según la estructura de tu respuesta de error
                } else if (error.request) {
                    // La solicitud fue realizada pero no se recibió respuesta
                    console.log(error.request);
                    setError("No se recibió respuesta del servidor");
                } else {
                    // Hubo un error al configurar o realizar la solicitud
                    console.log(error.message);
                    setError("Error en la configuración o ejecución de la solicitud");
                }
            } finally {
                setLoading(false);
                setValido(false);
            }
        }
        axiospost();
    }

    function quitar (email: string, idPiso: number){
        const ruta = "http://" + ip + "/api/v2/watchlists/" + email + "/piso/" + idPiso;
        console.log("Borro piso");
        

        async function axiosdelete () {
            try {
                setLoading(true);
                const response = await axios.delete(ruta,{ headers: { 'Authorization': `Bearer ${token}` } });
                //console.log(response.data);
                
                let status = response.status;
                //console.log(status);
                if (status === 200) {
                    //console.log("todo correcto");
                    //Alert.alert("Piso Borrado", "Respuesta: " + response.status);
                    FavoritosDeleted();
                    getUser();
                }


            } catch (error) {
                if (error.response) {
                    // El servidor devolvió una respuesta con un código de estado fuera del rango 2xx
                    console.log(error.response.data); // Aquí puedes acceder a los detalles del error en el lado del servidor
                    setError(error.response.data || "Error desconocido"); // Puedes adaptar esto según la estructura de tu respuesta de error
                } else if (error.request) {
                    // La solicitud fue realizada pero no se recibió respuesta
                    console.log(error.request);
                    setError("No se recibió respuesta del servidor");
                } else {
                    // Hubo un error al configurar o realizar la solicitud
                    console.log(error.message);
                    setError("Error en la configuración o ejecución de la solicitud");
                }
            } finally {
                setLoading(false);
                setValido(false);
            }
        }
        axiosdelete();
    }

    return { agregar, quitar, error  }
}

export default useWatchList