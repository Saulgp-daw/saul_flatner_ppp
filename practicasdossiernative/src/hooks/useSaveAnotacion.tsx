import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { ip } from '../../global';
import axios from 'axios';
import { useAppContext } from '../contexts/TokenContextProvider';



const useSaveAnotacion = () => {
    const { token, settoken } = useAppContext();

    async function guardarAnotacion(id, anotacion) {
      const ruta = "http://" + ip + "/api/v2/watchlists/"+id;
      
      console.log("Guardada");
      console.log(id);;
      console.log(anotacion);
      
      const axiosput = async () => {
        try{
          console.log(ruta);
          const response = await axios.put(ruta, {anotaciones: anotacion}, { headers: { 'Authorization': `Bearer ${token}` } });
          console.log(response.data);
          
        }catch(error){
          console.log(error);
        }
      }

      axiosput();
      
    }

  return {guardarAnotacion}
}

export default useSaveAnotacion
