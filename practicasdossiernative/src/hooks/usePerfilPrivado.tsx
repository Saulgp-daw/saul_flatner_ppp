import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ip } from '../../global';
import { useAppContext } from '../contexts/TokenContextProvider';
import axios from 'axios';
import { launchImageLibrary, ImagePickerResponse, ImageLibraryOptions } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import useGetUserLogged from './useGetUserLogged';

type Props = {}

type Usuario = {
  email: string;
  nombre: string;
  apellidos: string;
  fotoPerfil: string;
  fechaUltimaEstancia: string,
  fechaUltimoAlquiler: string,
  sexo: string;
  active: boolean;
  anhoNacimiento: number;
  valoracion: number;
  fotoBase64: string;
  password: string;
  hash: string;
}

const usePerfilPrivado = () => {
  const ruta = "http://" + ip + "/api/v2/usuarios/profile";
  const rutaPut = "http://" + ip + "/api/v2/usuarios/";
  const { token, settoken } = useAppContext();
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [sexo, setSexo] = useState('Hombre');
  const [anho, setAnho] = useState(2000);
  const [password, setPassword] = useState('');
  const [fotoSubida, setFotoSubida] = useState(false);
  const [reload, setReload] = useState(true);
  const { getUser } = useGetUserLogged();

  const [informacionUsuario, setInformacionUsuario] = useState<Usuario>(
    {
      email: "",
      nombre: "",
      apellidos: "",
      fotoPerfil: "",
      fechaUltimaEstancia: "",
      fechaUltimoAlquiler: "",
      sexo: "",
      active: false,
      anhoNacimiento: 0,
      valoracion: 0,
      fotoBase64: "",
      password: "",
      hash: ""
    });


  useEffect(() => {

    const axiosget = async () => {
      try {
        const response = await axios.get(ruta, {
          headers: {
            Authorization: `Bearer ${token}`, // Agrega el token a los encabezados
          },
        });
        //console.log(response.data);
        console.log("Reload perfil privado");
        

        const usuario: Usuario = {
          email: response.data.email,
          nombre: response.data.nombre,
          apellidos: response.data.apellidos,
          fotoPerfil: response.data.fotoPerfil,
          sexo: response.data.sexo,
          active: response.data.active,
          anhoNacimiento: response.data.anhoNacimiento,
          valoracion: response.data.valoracion,
          fotoBase64: '',
          fechaUltimaEstancia: response.data.fechaUltimaEstancia,
          fechaUltimoAlquiler: response.data.fechaUltimoAlquiler,
          password: response.data.password,
          hash: response.data.hash
        }
        setInformacionUsuario(usuario);
        setReload(false);
      } catch (error) {
        console.log(error);
        setReload(false);

      }
    }
    axiosget();
  }, [reload]);

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
        const imgPerfil = response.assets[0].fileName;
        setInformacionUsuario(prevState => ({
          ...prevState,
          fotoBase64: base64Image,
          fotoPerfil: imgPerfil
        }));
        setFotoSubida(true);
      }
    });
  };

  const updateNombre = (nuevo) => {
    setNombre(nuevo);
    setInformacionUsuario((prevState) => ({
      ...prevState,
      nombre: nuevo,
    }));
    console.log(nuevo);
  };

  const updateApellidos = (nuevo) => {
    setApellidos(nuevo);
    setInformacionUsuario((prevState) => ({
      ...prevState,
      apellidos: nuevo,
    }));
    console.log(nuevo);
  };

  const updateSexo = (nuevo) => {
    setSexo(nuevo);
    setInformacionUsuario((prevState) => ({
      ...prevState,
      sexo: nuevo,
    }));
    console.log(nuevo);
  };

  const updateAnho = async (nuevo) => {
    setAnho(nuevo);
    let usuario : Usuario ={
      email: informacionUsuario.email,
      nombre: informacionUsuario.nombre,
      apellidos: informacionUsuario.apellidos,
      fotoPerfil: informacionUsuario.fotoPerfil,
      fechaUltimaEstancia: informacionUsuario.fechaUltimaEstancia,
      fechaUltimoAlquiler: informacionUsuario.fechaUltimoAlquiler,
      sexo: informacionUsuario.sexo,
      active: informacionUsuario.active,
      anhoNacimiento: nuevo,
      valoracion: informacionUsuario.valoracion,
      fotoBase64: informacionUsuario.fotoBase64,
      password: informacionUsuario.password,
      hash: informacionUsuario.hash
    }

    setInformacionUsuario(usuario);

    console.log(nuevo);
    console.log(informacionUsuario);
    setInformacionUsuario(usuario);
    
  };

  const updatePassword = (nuevo) => {
    setPassword(nuevo);
    setInformacionUsuario((prevState) => ({
      ...prevState,
      password: nuevo,
    }));
    console.log(nuevo);
  };

  async function actualizarDatos() {

    const actualizado = {
      nombre: informacionUsuario.nombre,
      apellidos: informacionUsuario.apellidos,
      anhoNacimiento: informacionUsuario.anhoNacimiento,
      fechaUltimaEstancia: informacionUsuario.fechaUltimaEstancia,
      fechaUltimoAlquiler: informacionUsuario.fechaUltimoAlquiler,
      fotoPerfil: informacionUsuario.fotoPerfil,
      password: informacionUsuario.password,
      sexo: informacionUsuario.sexo,
      fotoBase64: informacionUsuario.fotoBase64,

    }

    console.log("Actualizado");
    
    console.log(actualizado);

    function updateSuccess(){
      Toast.show({
        type: 'success',
        text1: '¡Datos actualizados con éxito!'
      });
    }

    function updateFailure(){
      Toast.show({
        type: 'error',
        text1: 'Oh no, hubo un error al actualizar'
      });
    }

    const axiosput = async () => {
      try {
        console.log(rutaPut + informacionUsuario.email);

        const response = await axios.put(rutaPut + informacionUsuario.email, actualizado, { headers: { 'Authorization': `Bearer ${token}` } });
        console.log(response.data);
        updateSuccess();
        getUser();
      } catch (error) {
        
        console.log("Hubo un error en usePerfilPrivado: "+error);
        updateFailure();
      }
    }

    axiosput();

  }



  return { informacionUsuario, fotoSubida, selectImage, updateNombre, updateAnho, updateApellidos, updateSexo, updatePassword, actualizarDatos, setInformacionUsuario, reload, setReload }
}

export default usePerfilPrivado