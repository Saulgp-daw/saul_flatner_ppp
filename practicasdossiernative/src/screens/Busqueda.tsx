import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Piso from './Piso'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import useFindAll from '../hooks/useFindAllPisos'
import { ip } from '../../global'
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  navigation: any,
}



const Busqueda = ({ navigation }: Props) => {

  const { pisos, reload, setReload } = useFindAll();

  useEffect(() => {
    console.log("Hago el reload");

    const onFocus = navigation.addListener('focus', () => {
      setReload(true);
    });
    return onFocus;

  }, [reload])

  if (!pisos) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!pisos || pisos.length === 0) {
    return (
      <>
        <Navbar navigation={navigation} />
        <View style={styles.loadingContainer}>
          <Text style={styles.noPisosText}>Aún no hay pisos creados</Text>
        </View>
      </>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Navbar navigation={navigation} />
      <ScrollView style={styles.busqueda}>
        {pisos.map((piso, index) => (
          <TouchableOpacity key={piso.id} onPress={() => navigation.navigate('Piso', { pisoId: piso.id })} >
            <View style={styles.caja}>
              <Slider
                images={piso.fotos.map((foto, index) => ({
                  id: index,
                  source: foto
                }))}
                valoracion={piso.valoracion}
                email={piso.propietario}
              />
              <View style={styles.datosContainer}>
                <Text style={styles.infoRelevante}>{piso.titulo}</Text>
                <Text style={styles.infoRelevante}>{piso.precio} €</Text>
              </View>
              <View style={styles.datosContainer}>
                <Text><Icon name="bed" size={15} /> {piso.numHabitaciones}</Text>
                <Text><Icon name="person-sharp" size={15} /> {piso.numInquilinos}</Text>
                <Text>Propietario: {piso.propietarioReside ? 'Reside' : 'No Reside'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};


export default Busqueda

const styles = StyleSheet.create({
  busqueda: {
    display: 'flex',
    alignContent: 'center'
  },
  noPisosText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  caja: {
    margin: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: "#2bfc23",
    borderWidth: 2,
    borderRadius: 5,
  },
  datosContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  infoRelevante: {
    fontWeight: 'bold',
    fontSize: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

})