import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import usePerfilPrivado from '../hooks/usePerfilPrivado';
import useFindUsuario from '../hooks/useFindUsuario';
import { useAppContext } from '../contexts/TokenContextProvider';

type Props = {
  navigation: any,
}

const WatchList = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { token, email } = useAppContext();
  const { usuario } = useFindUsuario(email);
  const imagenDefecto = "../resources/default.jpg";

  if (!usuario) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {usuario.pisosInteres.map((piso) => (
        <TouchableOpacity key={piso.idPiso} onPress={() => navigation.navigate('Piso', { pisoId: piso.idPiso })} >
          <View style={styles.caja}>
            <View style={styles.datosContainer}>
              <Image source={require(imagenDefecto)} style={styles.imagen} />
              <View>
                <Text style={styles.infoRelevante}>{piso.titulo}</Text>
                <Text style={styles.info} >Valoración: {piso.valoracion} ⭐</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default WatchList

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caja: {
    borderColor: "#2bfc23",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10
  },
  datosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    marginLeft: 10, // Ajusta el margen entre la imagen y el texto
  },
  infoRelevante: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10, // Ajusta el margen entre la imagen y el texto
  },
  imagen: {
    width: 100, // Ancho fijo de la imagen
    height: 60, // Alto fijo de la imagen
    resizeMode: 'cover', // Ajusta la imagen al tamaño del contenedor sin distorsionarla
  },
});
