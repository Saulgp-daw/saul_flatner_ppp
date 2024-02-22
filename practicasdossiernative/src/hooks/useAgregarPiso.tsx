import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../contexts/TokenContextProvider';
import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { ip } from '../../global';
import { useIsFocused } from '@react-navigation/native';

type Props = {}

type Piso = {
    ascensor: boolean;
    descripcion: string;
    electrodomesticos: string;
    estanciaMinimaDias: number;
    fotos: string;
    fumar: boolean;
    gasIncluido: boolean;
    jardin: boolean;
    luzIncluida: boolean;
    mCuadrados: number;
    mascotas: boolean;
    numHabitaciones: number;
    mapsLink: string;
    parejas: boolean;
    precioMes: number;
    propietarioReside: boolean;
    terraza: boolean;
    titulo: string;
    ubicacion: string;
    valoracion: number;
    wifi: boolean;
    fotoBase64: string;
}

const useAgregarPiso = () => {
    const { token, email } = useAppContext();
    const ruta = "http://" + ip + "/api/v2/usuarios/" + email + "/pisos";
    //console.log(ruta);
    const [loading, setLoading] = useState(false);
   
    

    const [informacionPiso, setInformacionPiso] = useState<Piso>({
        ascensor: false,
        descripcion: '',
        electrodomesticos: '',
        estanciaMinimaDias: 0,
        fotos: '',
        fumar: false,
        gasIncluido: false,
        jardin: false,
        luzIncluida: false,
        mCuadrados: 0,
        mascotas: false,
        numHabitaciones: 0,
        mapsLink: '',
        parejas: false,
        precioMes: 0,
        propietarioReside: false,
        terraza: false,
        titulo: '',
        ubicacion: '',
        valoracion: 2.5,
        wifi: false,
        fotoBase64: ''
    });

    const setSwitch = (key: keyof Piso, value: boolean) => {
        setInformacionPiso((prevOpcionesPiso) => ({
            ...prevOpcionesPiso,
            [key]: value,
        }));
        // console.log(key);
        // console.log(value);
    };

    const updateCampo = async (key, value) => {
        const parsedValue = typeof informacionPiso[key] === 'number' ? parseFloat(value) : value;
        // Espera a que se complete la actualización de informacionPiso antes de continuar
        await setInformacionPiso((prevOpcionesPiso) => ({
            ...prevOpcionesPiso,
            [key]: parsedValue,
        }));
        //console.log(parsedValue);
    };


    const selectImage = () => {
        const options: ImageLibraryOptions = {
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
            mediaType: "photo"
        };

        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (response.assets && response.assets.length > 0) {
                const base64Image = response.assets[0].base64;
                const fileName = response.assets[0].fileName;
                setInformacionPiso(prevState => ({
                    ...prevState,
                    fotoBase64: base64Image,
                    fotos: fileName
                }));
            }
        });
    };


    function post() {
        const axiospost = async () => {
            setLoading(true);
            try {
                const response = await axios.post(ruta, informacionPiso, { headers: { 'Authorization': `Bearer ${token}` } });
                console.log(response.data);
                Alert.alert("Piso agregado!", "Respuesta: " + response.status);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        axiospost();
        //console.log(informacionPiso);


    }


    return { informacionPiso, loading, setLoading, setInformacionPiso, setSwitch, post, selectImage, updateCampo }
}

export default useAgregarPiso