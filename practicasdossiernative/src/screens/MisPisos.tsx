import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useAppContext } from '../contexts/TokenContextProvider';
import { ip } from '../../global';

import Icon from 'react-native-vector-icons/Ionicons';
import useBorrarPiso from '../hooks/useBorrarPiso';

const MisPisos = () => {
  const { usuario, token } = useAppContext();
  const { showConfirmDialog } = useBorrarPiso();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (usuario && usuario.propiedades && usuario.propiedades.length > 0) {
      setLoading(false);
    }
  }, [usuario]);

  if (!usuario || !usuario.propiedades) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.noPisosText}>Aún no has creado ningún anuncio</Text>
      </View>
    );
  }

  if (usuario && usuario.propiedades.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.noPisosText}>Aún no has creado ningún anuncio</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {usuario.propiedades.map((propiedad) => (
        <View key={propiedad.id} style={styles.itemContainer}>
          <Image
            source={{
              uri: `http://${ip}/api/v2/usuarios/${usuario.email}/images/${propiedad.fotos[0]}`,
              method: 'GET',
              headers: { 'Authorization': `Bearer ${token}` }
            }}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{propiedad.titulo}</Text>
          </View>
          <TouchableHighlight style={styles.deleteButton} onPress={() => showConfirmDialog(propiedad.id)}>
            <Icon name="trash-outline" size={32} color={"white"} />
          </TouchableHighlight>
        </View>
      ))}
    </ScrollView>
  );
};

export default MisPisos;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'stretch',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: "red",
    padding: 10,
  },
  noPisosText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
