import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ip } from '../../global';
import { useAppContext } from '../contexts/TokenContextProvider';
import axios from 'axios';

type Props = {}

type Usuario = {
    email: string;
    nombre: string;
    apellidos: string;
    fotoPerfil: string;
    sexo: string;
    fechaUltimaEstancia: string | null;
    fechaUltimoAlquiler: string | null;
    anhoNacimiento: number;
    valoracion: number;
    propiedades: Piso[];
    pisosInteres: Piso[];
    pisoActual: Piso;
}

type Piso = {
	fotos: any;
    idPiso: number;
    titulo: string;
    valoracion: number;
}

const useFindUsuario = (email: string) => {
    const ruta = "http://" + ip + "/api/v2/usuarios/" + email;
    const { token, settoken } = useAppContext();
    const [usuario, setUsuario] = useState<Usuario>();
    const [reload, setReload] = useState(true);

    let pisoActual: Piso = null;
    const pisosInteres: Piso[] = [];

    
    useEffect(() => {

        const axiosget = async () => {
            try {
                const response = await axios.get(ruta, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                //console.log(response.data);

                const data = response.data;

                if (data.pisoActual != null) {
                    const fotos: string[] = data.pisoActual.fotos.map((foto: string) => {
                        return foto;
                    });
                    pisoActual = {
                        idPiso: data.pisoActual.idPiso,
                        titulo: data.pisoActual.titulo,
                        valoracion: data.pisoActual.valoracion,
                        fotos: fotos
                    };
                }


                const pisosInteres: Piso[] = data.pisosInteres.map((pisoData: any) => {
                    const fotos: string[] = pisoData.fotos.map((foto: string) => {
                        return foto;
                    });
                
                    return {
                        idPiso: pisoData.idPiso,
                        titulo: pisoData.titulo,
                        valoracion: pisoData.valoracion,
                        fotos: fotos, 
                    };
                });
                //console.log(pisosInteres);
                

                const propiedades: Piso[] = data.propiedades.map((pisoData: any) => {
                    const fotos: string[] = pisoData.fotos.map((foto: string) => {
                        return foto;
                    });
                
                    return {
                        idPiso: pisoData.idPiso,
                        titulo: pisoData.titulo,
                        valoracion: pisoData.valoracion,
                        fotos: fotos, 
                    };
                });

                const find = {
                    email: data.email,
                    nombre: data.nombre,
                    apellidos: data.apellidos,
                    fotoPerfil: data.fotoPerfil,
                    sexo: data.sexo,
                    fechaUltimaEstancia: data.fechaUltimaEstancia,
                    fechaUltimoAlquiler: data.fechaUltimoAlquiler,
                    anhoNacimiento: data.anhoNacimiento,
                    valoracion: data.valoracion,
                    propiedades: propiedades,
                    pisosInteres: pisosInteres,
                    pisoActual: pisoActual
                }

                //console.log(find);
                setUsuario(find);
                setReload(false);

            } catch (error) {
                console.log(error);
                setReload(false);

            }
        }
        axiosget();
    }, [reload]);

    return { usuario, reload, setReload }
}

export default useFindUsuario