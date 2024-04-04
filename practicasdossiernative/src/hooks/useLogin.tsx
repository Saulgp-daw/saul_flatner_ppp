import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ip } from '../../global';
import axios from 'axios';
import { useAppContext } from '../contexts/TokenContextProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '../types/Usuario';

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

    // useEffect(() => {
    //     const verificarToken = async () => {
    //         try {
    //             const jsonValue = await AsyncStorage.getItem('token');
    //             const data = jsonValue != null ? JSON.parse(jsonValue) : null;
    //             console.log(data);

    //             if (data != null) {
    //                 settoken(data);
    //                 setValido(true);
    //             }
    //         } catch (e) {
    //             console.error("Error al leer el token", e);
    //         }
    //     };

    //     verificarToken();
    // }, []);

    async function login(email: string, password: string) {
        setValido(null);
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
                    await getUser(response.data);
                }


            } catch (error) {
                setError(error.response.data || "Error desconocido");
            } finally {
                setLoading(false);
                setValido(false);
            }
        }

        async function getUser(token: string) {
            try {
                const response = await axios.get(rutaGetUser + email, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);

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
                    pisosInteres: data.pisosInteres ? data.pisosInteres.map((piso: any) => ({
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
                    pisoActual: data.pisoActual ?? null
                };

                console.log("Usuario loggeado: ");

                console.log(usuarioLoggeado);
                setusuario(usuarioLoggeado);


            } catch (error) {
                console.log(error);

            }
        }
        await axiospost();
    }

    return { login, loading, valido, error }
}

export default useLogin


