import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../contexts/TokenContextProvider';
import { ip } from '../../global';

const MisPisos = () => {
  const { usuario, token } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario y sus propiedades están cargados
    if (usuario && usuario.propiedades && usuario.propiedades.length > 0) {
      setLoading(false); // Cambiar el estado a cargado
    }
  }, [usuario]); // Se ejecuta cuando el usuario cambia

  // Mostrar un indicador de carga si los datos todavía se están cargando
  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <>
      <ScrollView>
        {usuario.propiedades.map((propiedad) => (
          <View key={propiedad.id}>
            <Text>{propiedad.titulo}</Text>
            <Image
              source={{
                uri: `http://${ip}/api/v2/usuarios/${usuario.email}/images/${propiedad.fotos[0]}`,
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
              }}
              style={{ width: 200, height: 200 }} // Ajusta el tamaño de la imagen según sea necesario
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default MisPisos;

const styles = StyleSheet.create({
  
});