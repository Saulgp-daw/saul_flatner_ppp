import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../contexts/TokenContextProvider';
import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { ip } from '../../global';
import { useIsFocused } from '@react-navigation/native';
import { Piso } from '../types/Piso';
import useGetUserLogged from './useGetUserLogged';
import Toast from 'react-native-toast-message';

type Props = {}

type PisoPost = {
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
    const { token, email, usuario, setusuario } = useAppContext();
    const ruta = "http://" + ip + "/api/v2/usuarios/" + email + "/pisos";
    //console.log(ruta);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    /**
     * useState para validar los campos válidos de los inputs
     */
    const [tituloValido, setTituloValido] = useState(true);
    const [estanciaMinimaValido, setEstanciaMinimaValido] = useState(true);
    const [numHabitacionesValido, setNumHabitacionesValido] = useState(true);
    const [precioMesValido, setPrecioMesValido] = useState(true);
    const [metrosCuadradosValido, setMetrosCuadradosValido] = useState(true);

    /**
     * useState para expandir los campos opcionales
     */

    const [isDescripcionExpanded, setIsDescripcionExpanded] = useState(false);
    const [isElectrodomesticosExpanded, setisElectrodomesticosExpanded] = useState(false);
    const [isExtraExpanded, setisExtraExpanded] = useState(false);

    const { getUser } = useGetUserLogged();
    const [informacionPiso, setInformacionPiso] = useState<PisoPost>({
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

    function toggleDescripcionExpansion() {
        setIsDescripcionExpanded(!isDescripcionExpanded);
    }

    function toggleElectrodomesticosExpansion() {
        setisElectrodomesticosExpanded(!isElectrodomesticosExpanded);
    }
    
    function toggleExtraExpansion() {
        setisExtraExpanded(!isExtraExpanded);
    }

    function validarTitulo() {
        if (informacionPiso.titulo.trim().length === 0) {
            Toast.show({
                type: 'error',
                text1: 'El título es obligatorio'
            });
            setTituloValido(false);
            return false;
        }
        return true;
    }

    function validarEstanciaMinima() {
        if (informacionPiso.estanciaMinimaDias <= 0) {
            Toast.show({
                type: 'error',
                text1: 'La estancia mínima es obligatoria'
            });
            setEstanciaMinimaValido(false);
            return false;
        }
        return true;
    }

    function validarNumHabitaciones() {
        if (informacionPiso.numHabitaciones <= 0) {
            Toast.show({
                type: 'error',
                text1: 'El número de habitaciones mínimo es obligatorio'
            });
            setNumHabitacionesValido(false);
            return false;
        }
        return true;
    }

    function validarPrecioMes() {
        if (informacionPiso.precioMes <= 0) {
            Toast.show({
                type: "error",
                text1: "El precio al mes debe ser obligatorio"
            });
            setPrecioMesValido(false);
            return false;
        }
        return true;
    }

    function validarMetrosCuadrados() {
        if (informacionPiso.mCuadrados <= 0) {
            Toast.show({
                type: "error",
                text1: "Los metros cuadrados son obligatorios"
            });
            setMetrosCuadradosValido(false);
            return false;
        }

        return true;
    }

    const setSwitch = (key: keyof PisoPost, value: boolean) => {
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
                setSelectedImage(`data:image/png;base64,${base64Image}`);
            }
        });
    };

    function agregarPisoSuccess() {
        Toast.show({
            type: 'success',
            text1: '¡Piso creado con éxito!'
        });
    }

    function agregarPisoFailure() {
        Toast.show({
            type: 'error',
            text1: 'Oh no, hubo un error al crear el piso'
        });
    }


    function post() {

        if (!validarTitulo() || !validarEstanciaMinima() || !validarNumHabitaciones() || !validarPrecioMes() || !validarMetrosCuadrados()) {
            return;
        }

        const axiospost = async () => {
            setLoading(true);
            try {
                const response = await axios.post(ruta, informacionPiso, { headers: { 'Authorization': `Bearer ${token}` } });
                console.log(response.data);
                agregarPisoSuccess();
                setLoading(false);
                await getUser();
            } catch (error) {
                console.log(error);
                agregarPisoFailure();
                setLoading(false);
            }
        }

        axiospost();
    }


    return { 
        informacionPiso, 
        loading, 
        tituloValido, 
        estanciaMinimaValido, 
        numHabitacionesValido, 
        precioMesValido, 
        metrosCuadradosValido,
        isDescripcionExpanded,
        isElectrodomesticosExpanded,
        isExtraExpanded,
        selectedImage,
        setLoading, 
        setInformacionPiso, 
        setSwitch, 
        post, 
        selectImage, 
        updateCampo, 
        toggleDescripcionExpansion,
        toggleElectrodomesticosExpansion,
        toggleExtraExpansion
    }
}

export default useAgregarPiso