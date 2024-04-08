import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { ip } from '../../global';
import axios from 'axios';
import { useAppContext } from '../contexts/TokenContextProvider';

type Props = {}

const useWatchList = () => {
    //const ruta = "http://" + ip + "/api/v2/usuarios/"+email+"/watchlist/"+idPiso;
    const [loading, setLoading] = useState(false);
    const [valido, setValido] = useState(false);
    const [error, setError] = useState("");
    const { token, settoken } = useAppContext();

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
                    Alert.alert("Piso añadido", "Respuesta: " + response.status);
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
    return { agregar, error  }
}

export default useWatchList