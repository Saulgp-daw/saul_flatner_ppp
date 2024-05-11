import React, { useEffect, useState } from 'react';
import { TouchableHighlight } from 'react-native';
import { useAppContext } from '../contexts/TokenContextProvider';
import useWatchList from '../hooks/useWatchList';

import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Asumiendo que useWatchList ya tiene una función 'quitar'
const PisoFavourite = ({ piso }) => {
    const { usuario } = useAppContext();
    const { agregar, quitar } = useWatchList();
    const [seleccionado, setSeleccionado] = useState(false);

    useEffect(() => {
        if(usuario && usuario.pisosInteres){
            const idsFavoritos = usuario.pisosInteres.map(pisoW => pisoW.id);
            setSeleccionado(idsFavoritos.includes(piso.idPiso));
        }
        
    }, [])
    
    

    const manejarPresion = () => {
        setSeleccionado(!seleccionado);
        if (seleccionado) {
            quitar(usuario.email, piso.idPiso);
        } else {
            agregar(usuario.email, piso.idPiso);
        }
    };

    return (
        <TouchableOpacity
            onPress={manejarPresion}
            activeOpacity={0.7} // Controla la opacidad al presionar
        >
            <Icon
                name={seleccionado ? "heart" : "heart-outline"}
                size={30}
                color={seleccionado ? "#FF0000" : "#000000"} // Cambia el color del icono según el estado
            />
        </TouchableOpacity>
    );
};

export default PisoFavourite;
