import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from 'axios';
import { useAppContext } from '../contexts/TokenContextProvider';
import { ip } from '../../global';

type Props = {}

const useGetCountry = () => {

    const { token, settoken } = useAppContext();
 
    async function getCountry(latitude, longitude){
        const ruta = `http://${ip}/api/v2/pisos/country`;
        console.log(ruta);
        
        try{
            const response = await axios.get(ruta, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    latitud: latitude,
                    longitud: longitude
                }
            });
            //console.log(response.data);
            return response.data;
            
        }catch(error){
            console.error(error);
            return null;
        }
    }

    return { getCountry }
}

export default useGetCountry

const styles = StyleSheet.create({})