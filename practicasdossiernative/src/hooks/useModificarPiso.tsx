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


const useModificarPiso = () => {
    const { token, email, usuario, setusuario } = useAppContext();
    const ruta = "http://" + ip + "/api/v2/usuarios/";
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
    const [informacionPiso, setInformacionPiso] = useState<Piso>({
        id: 0,
        titulo: "",
        descripcion: "",
        electrodomesticos: "",
        estanciaMinimaDias: 0,
        fotos: "",
        fumar: false,
        gasIncluido: false,
        jardin: false,
        luzIncluida: false,
        mCuadrados: 0,
        mascotas: false,
        numHabitaciones: 0,
        mapsLink: "",
        parejas: false,
        precioMes: 0,
        propietarioReside: false,
        terraza: false,
        ubicacion: "",
        valoracion: 0,
        num_votos: 0,
        wifi: false,
        ascensor: false,
        anotaciones: "",
        idAnotacion: 0,
        fotoBase64: ""
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
                const fileName = response.assets[0].fileName; // Nombre del archivo de la imagen

                // Asegúrate de que fileName no es undefined antes de intentar agregarlo al array
                if (fileName) {
                    setInformacionPiso(prevState => ({
                        ...prevState,
                        fotoBase64: base64Image, // Asumiendo que quieres guardar la imagen en base64 también
                        fotos: fileName
                    }));
                } else {
                    console.error("No se encontró el nombre del archivo");
                }

                // Esto asume que también quieres mostrar la imagen seleccionada en algún componente
                setSelectedImage(`data:image/png;base64,${base64Image}`);
            }
        });
    };
    

    function modificarPisoSuccess() {
        Toast.show({
            type: 'success',
            text1: '¡Piso modificado con éxito!'
        });
    }

    function modificarPisoFailure() {
        Toast.show({
            type: 'error',
            text1: 'Oh no, hubo un error al modificar el piso'
        });
    }


    function putPiso() {

        if (!validarTitulo() || !validarEstanciaMinima() || !validarNumHabitaciones() || !validarPrecioMes() || !validarMetrosCuadrados()) {
            return;
        }

        const { id, ...datosPiso } = informacionPiso; // desestructurar para excluir `id` y cualquier otro dato no necesario
        //console.log(informacionPiso.fotoBase64);
        

        const payload = {
            ascensor: datosPiso.ascensor,
            descripcion: datosPiso.descripcion,
            electrodomesticos: datosPiso.electrodomesticos,
            estanciaMinimaDias: datosPiso.estanciaMinimaDias,
            fotos: datosPiso.fotos,
            fumar: datosPiso.fumar,
            gasIncluido: datosPiso.gasIncluido,
            jardin: datosPiso.jardin,
            luzIncluida: datosPiso.luzIncluida,
            mCuadrados: datosPiso.mCuadrados,
            mapsLink: datosPiso.mapsLink,
            mascotas: datosPiso.mascotas,
            numHabitaciones: datosPiso.numHabitaciones,
            parejas: datosPiso.parejas,
            precioMes: datosPiso.precioMes,
            propietarioReside: datosPiso.propietarioReside,
            terraza: datosPiso.terraza,
            titulo: datosPiso.titulo,
            ubicacion: datosPiso.ubicacion,
            valoracion: datosPiso.valoracion,
            wifi: datosPiso.wifi,
            fotoBase64: datosPiso.fotoBase64
        };

        const axiosput = async () => {
            //console.log(ruta+usuario.email+"/pisos/"+id);
            setLoading(true);
            try {
                //console.log("Enviando payload para actualizar:", payload);
                const response = await axios.put(ruta+usuario.email+"/pisos/"+id, payload, { headers: { 'Authorization': `Bearer ${token}` } });
                console.log(response.data);
                modificarPisoSuccess();
                setLoading(false);
                await getUser();
            } catch (error) {
                console.log(error.response);
                modificarPisoFailure();
                setLoading(false);
            }
        }

        axiosput();
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
        putPiso,
        selectImage,
        updateCampo,
        toggleDescripcionExpansion,
        toggleElectrodomesticosExpansion,
        toggleExtraExpansion
    }
}

export default useModificarPiso