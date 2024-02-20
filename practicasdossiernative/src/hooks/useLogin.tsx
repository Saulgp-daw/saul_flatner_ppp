import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ip } from '../../global';
import axios from 'axios';
import { useAppContext } from '../contexts/TokenContextProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {}

export interface iLogin {
    email: string;
    password: string;
}

const useLogin = () => {
    const ruta = "http://"+ip+"/api/login";
    const {token, settoken} = useAppContext();
    const [loading, setLoading] = useState(false);
    const [valido, setValido] = useState(false);
    const [error, setError] = useState("");
    
    async function login(email: string, password: string) {
        setValido(false);
        const nuevoLogin: iLogin = {
            email: email,
            password: password
        }
        //navigation.navigate("DrawerGestion");
        console.log(nuevoLogin);




        const axiospost = async () => {
            try {
                setLoading(true);
                const response = await axios.post(ruta, nuevoLogin);
                console.log(response.data);
                let status = response.status;
                console.log(status);
                if (status === 200) {
                    settoken(response.data);
                    console.log("todo correcto");
                    const jsonValue = JSON.stringify(response.data);
                    console.log(jsonValue);

                    await AsyncStorage.setItem('token', jsonValue);
                    setValido(true);
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

  return { login, loading, valido, error }
}

export default useLogin


