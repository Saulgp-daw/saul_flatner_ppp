import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ip } from '../../global';
import { useAppContext } from '../contexts/TokenContextProvider';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';

type Props = {}

type Piso = {
    id: number;
    titulo: string;
    precio: number;
    numHabitaciones: number;
    numInquilinos: number;
    propietarioReside: boolean;
    valoracion: number;
    fotos: string[];
    propietario: string;
}

const useFindAllPisos = () => {
    const ruta = "http://" + ip + "/api/v2/pisos";
    const { token, settoken } = useAppContext();
    const [reload, setReload] = useState(true);
    const isFocused = useIsFocused();

    const [pisos, setPisos] = useState<Piso[]>([]);

    

    useEffect(() => {

        const axiosget = async () => {
            try {
                const response = await axios.get(ruta, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                //console.log(response.data);
                const pisosTransformados = response.data.map((piso) => ({
                    id: piso.idPiso,
                    titulo: piso.titulo,
                    precio: piso.precioMes,
                    numHabitaciones: piso.numHabitaciones,
                    numInquilinos: piso.inquilinos.length,
                    propietarioReside: piso.propietarioReside,
                    valoracion: piso.valoracion,
                    fotos: piso.fotos,
                    propietario: piso.propietario.email
                }));
                console.log(pisosTransformados);
                
                setPisos(pisosTransformados);
                setReload(false);

            } catch (error) {
                console.log(error);
                setReload(false);
            }
        }
        if (isFocused) { 
            axiosget();
        }
    }, [reload, isFocused]);



    return { pisos, reload, setReload }
}

export default useFindAllPisos