import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ip } from '../../global';
import axios from 'axios';
import { useAppContext } from '../contexts/TokenContextProvider';

type Props = {}

const useFindWatchListByEmail = (email: string) => {
    const { token, settoken } = useAppContext();
    const [reload, setReload] = useState(true);
    const ruta = "http://" + ip + "/api/v2/watchlists/" + email;
    console.log("DENTRO DE FIND BY EMAIL");
    

    useEffect(() => {
        const axiosget = async () => {
            try {
                const response = await axios.get(ruta, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                
            }catch(error){
                console.log(error);
            }
        }
        axiosget();
    }, [reload])
}

export default useFindWatchListByEmail