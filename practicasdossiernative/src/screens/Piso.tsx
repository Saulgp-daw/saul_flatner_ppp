import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import PerfilPublico from './PerfilPublico';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import useFindById from '../hooks/useFindPiso';
import { useRoute } from '@react-navigation/native';
import usePerfilPrivado from '../hooks/usePerfilPrivado';
import useWatchList from '../hooks/useWatchList';

type Props = {
    navigation: any;
}
type RouteParams = {
    pisoId: number;
};


const Piso = ({ navigation }: Props) => {
    const route = useRoute();
    const { pisoId } = route.params as RouteParams;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { piso } = useFindById(pisoId);
    const { informacionUsuario } = usePerfilPrivado();
    const { agregar } = useWatchList();

    if (!piso) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Navbar navigation={navigation} />
            <ScrollView style={styles.container} >

                <Slider
                    images={piso.fotos.map((foto, index) => ({
                        id: index,
                        source: foto
                    }))}
                    valoracion={piso.valoracion}
                    email={piso.propietario.email}
                />

                <View style={styles.datosContainer}>
                    <Text style={styles.infoRelevante} >{piso.titulo}</Text>
                    <Text style={styles.infoRelevante}>{piso.precioMes} €</Text>
                </View>
                <View style={styles.datosContainer}>
                    <Text>Nº Hab: {piso.numHabitaciones}</Text>
                    <Text>Nº inquilinos: {piso.inquilinos.length}</Text>
                    <Text>Propietario: {piso.propietarioReside ? 'Reside' : 'No Reside'}</Text>
                </View>
                <View>
                    <Text>Detalles: </Text>
                    <View style={styles.detallesContainer}>
                        {piso.electrodomesticos.split(';;').map((electro, index) => (
                            <View key={electro + "-" + index} style={styles.detallesItem}>
                                {index % 4 === 0 && index !== 0 && <View style={styles.lineBreak} />}
                                <Text>
                                    <Icon name="checkmark-circle" size={20} /> {electro}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View>
                    <Text>Inquilinos actuales: </Text>
                    {piso.inquilinos.map(inquilino => (
                        <TouchableHighlight key={inquilino.nombre} onPress={() => navigation.navigate("Perfil", { email: inquilino.email })} >
                            <Text>{inquilino.nombre} {inquilino.valoracion ?? " NO RATING"} ⭐</Text>
                        </TouchableHighlight>

                    ))
                    }
                </View>
                <View>
                    <Text>Propietario: </Text>
                    <TouchableHighlight onPress={() => navigation.navigate("Perfil", { email: piso.propietario.email })} >
                        <Text>{piso.propietario.nombre} {piso.propietario.valoracion ?? " NO RATING"}⭐</Text>
                    </TouchableHighlight>
                </View>

                <View>
                    <Button title="Estoy interesado" onPress={() => agregar(informacionUsuario.email, piso.idPiso)} />
                </View>
            </ScrollView>

        </View>
    )
}

export default Piso

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    detallesContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',  // Permite el "reborde" de elementos en una nueva línea
        alignItems: 'center', // Alinea los elementos en el centro del contenedor
    },
    detallesItem: {
        marginRight: 10, // Espaciado entre los elementos
        marginBottom: 0, // Espaciado entre las líneas
        flexDirection: 'row', // Asegura que el icono y el texto estén en la misma fila
        alignItems: 'center', // Alinea los elementos en el centro de su contenedor
    },
    lineBreak: {
        width: '100%', // Ocupa el ancho completo para forzar un salto de línea
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})