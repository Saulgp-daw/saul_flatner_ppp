import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useAppContext } from '../contexts/TokenContextProvider';
import useBorrarFavorito from './useBorrarFavorito';
import { ip } from '../../global';
import axios from 'axios';
import useGetUserLogged from './useGetUserLogged';

type watchlist = {

}

const useBorrarPiso = () => {
  const { usuario, setusuario, token } = useAppContext();
  const { borrarFavorito } = useBorrarFavorito();
  const rutaBorrarPiso = "http://" + ip + "/api/v2/pisos/";
  const rutaBorrarWatchlists = "http://" + ip + "/api/v2/watchlists/piso/";
  const { getUser } = useGetUserLogged();

  async function borrarPisoDeFavoritos(idPiso: number) {
    try {
      const response = await axios.delete(rutaBorrarWatchlists + idPiso, { headers: { 'Authorization': `Bearer ${token}` } });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }


  async function borrarPiso(idPiso: number) {
    try {

      const response = await axios.delete(rutaBorrarPiso + idPiso, { headers: { 'Authorization': `Bearer ${token}` } });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function quitarPisoContexto(idPiso: number) {
    setusuario((prevUsuario) => {
      // Filtrar las propiedades para quitar el piso
      const nuevasPropiedades = prevUsuario.propiedades.filter(piso => piso.id !== idPiso);
      
      // Actualizar también otro valor en el contexto, como un contador de propiedades
      const nuevosfavoritos = prevUsuario.pisosInteres.filter(piso => piso.id !== idPiso);

      // Retorna el nuevo estado con todas las actualizaciones
      return {
          ...prevUsuario,
          propiedades: nuevasPropiedades,
          pisosInteres: nuevosfavoritos
      };
  });
  }

  const showConfirmDialog = (idPiso: number) => {
    return Alert.alert(
      "Está a punto de borrar esta propiedad",
      "¿Desea realmente realizar esta acción?",
      [
        // La primera opción (NO)
        {
          text: "No",
          onPress: () => console.log("Acción Cancelada"),
        },
        {
          text: "Sí",
          onPress: () => {
            borrarPisoDeFavoritos(idPiso);
            borrarPiso(idPiso);
            quitarPisoContexto(idPiso);
          },


        },
      ]
    );
  }

  return { showConfirmDialog }
}

export default useBorrarPiso