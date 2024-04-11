import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ip } from '../../global';
import axios from 'axios';
import { useAppContext } from '../contexts/TokenContextProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '../types/Usuario';
import { Piso } from '../types/Piso';
import useGetUserLogged from './useGetUserLogged';

type Props = {}

export interface iLogin {
    email: string;
    password: string;
}

const useLogin = () => {
    const ruta = "http://" + ip + "/api/login";
    const rutaGetUser = "http://" + ip + "/api/v2/usuarios/";
    const { token, settoken, email, setemail, usuario, setusuario } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [valido, setValido] = useState(null);
    const [error, setError] = useState("");
    const { getUser } = useGetUserLogged();

    async function login(email: string, password: string) {
        setValido(null);
        setError("");
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
                    setemail(email);
                    console.log("todo correcto");
                    const jsonValue = JSON.stringify(response.data);
                    console.log(jsonValue);

                    await AsyncStorage.setItem('token', jsonValue);
                    setValido(true);
                    console.log("USUARIO LOGGEADO EN USELOGIN"); //ODIO EL CONTEXTO
                    console.log(response.data);
                    
                    
                    await getUser(response.data);
                }


            } catch (error) {
                setError(error.response.data || "Error desconocido");
            } finally {
                setLoading(false);

                setValido(false);
            }
        }

        await axiospost();
    }

    return { login, loading, valido, error }
}

export default useLogin


