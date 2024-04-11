import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppContext } from '../contexts/TokenContextProvider';
import { ip } from '../../global';
import axios from 'axios';

type Props = {}

const useBorrarFavorito = () => {
    const { usuario, token } = useAppContext();
    const rutaWatchlist = usuario ? `http://${ip}/api/v2/watchlists/${usuario.email}/piso/` : null;


    async function borrarFavorito(idPiso: number) {
        try {
            const response = await axios.delete(rutaWatchlist+idPiso, { headers: { 'Authorization': `Bearer ${token}` } });
            console.log(response.data);
        }catch(error){
            console.error(error);
        }
    }

    return {borrarFavorito}
}

export default useBorrarFavorito

const styles = StyleSheet.create({})