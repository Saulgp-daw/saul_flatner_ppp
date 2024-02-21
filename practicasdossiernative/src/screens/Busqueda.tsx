import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Piso from './Piso'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import useFindAll from '../hooks/useFindAllPisos'
import { ip } from '../../global'

type Props = {
  navigation: any,
}



const Busqueda = ({ navigation }: Props) => {

  const {pisos} = useFindAll();

  if (!pisos) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
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
                <Text>Nº Hab: {piso.numHabitaciones}</Text>
                <Text>Nº inquilinos: {piso.numInquilinos}</Text>
                <Text>Propietario: {piso.propietarioReside ? 'Sí' : 'No'}</Text>
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