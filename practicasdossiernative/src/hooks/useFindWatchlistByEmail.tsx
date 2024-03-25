import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ip } from '../../global';
import axios from 'axios';
import { useAppContext } from '../contexts/TokenContextProvider';

type Props = {}

type Piso = {
    fotos: any;
    idPiso: number;
    titulo: string;
    numHabitaciones: number;
    precioMes: number;
    valoracion: number;
}

type Watchlist = {
    piso: Piso;
    anotaciones: string;
    id: number;
}

const useFindWatchListByEmail = (email: string) => {
    const { token, settoken } = useAppContext();
    const [reload, setReload] = useState(true);
    const [watchlists, setWatchlists] = useState<Watchlist[]>([]);

    const ruta = "http://" + ip + "/api/v2/watchlists/" + email;
    console.log("DENTRO DE FIND BY EMAIL");
    

    useEffect(() => {
        const axiosget = async () => {
            try {
                const response = await axios.get<Watchlist[]>(ruta, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                //console.log(response.data);

                const formattedWatchlists = response.data.map((watchlist) => ({
                    id: watchlist.id,
                    piso: watchlist.piso,
                    anotaciones: watchlist.anotaciones

                }));
                setWatchlists(formattedWatchlists);
                console.log("pisos formateados");
                
                console.log(formattedWatchlists);
                
                
            }catch(error){
                console.log(error);
            }
        }
        axiosget();
    }, [reload]);

    return { watchlists };
}

export default useFindWatchListByEmail