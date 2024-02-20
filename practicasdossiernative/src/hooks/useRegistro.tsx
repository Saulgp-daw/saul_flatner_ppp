import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ip } from "../../global.js";
import { useAppContext } from '../contexts/TokenContextProvider';
import axios from 'axios';

type Props = {
    navigation: any;
}

export interface iRegistro {
    email: string;
    password: string;
}

const useRegistro = () => {

    const ruta = "http://"+ip+"/api/register";
    const {token, settoken} = useAppContext();
    const [loading, setLoading] = useState(false);
    const [valido, setValido] = useState(false);

    function registro( email: string, password: string) {

        const nuevoRegistro: iRegistro = {
            email: email,
            password: password,
            
        }

        console.log(nuevoRegistro);

        const axiospost = async () => {
            try {
                setLoading(true);
                const response = await axios.post(ruta, nuevoRegistro);
                console.log(response.data);
                let status = response.status;

                if (status === 200) {
                    settoken(response.data);
                    console.log("Registro correcto: " + status);
                    setValido(true);
                }
            } catch (error) {

                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        axiospost();
    }
    
  return { registro, loading, valido }
}

export default useRegistro