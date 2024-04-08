import { Modal, ActivityIndicator, Button, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import PerfilPublico from './PerfilPublico';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import useFindById from '../hooks/useFindPiso';
import { useRoute } from '@react-navigation/native';
import usePerfilPrivado from '../hooks/usePerfilPrivado';
import useWatchList from '../hooks/useWatchList';
import { DrawerActions } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import { useAppContext } from '../contexts/TokenContextProvider';

type Props = {
    navigation: any;
}
type RouteParams = {
    pisoId: number;
};


const Piso = ({ navigation }: Props) => {
    console.log(navigation ? true : false);
    const route = useRoute();
    const { pisoId } = route.params as RouteParams;
    console.log(pisoId);
    const { token, email, usuario } = useAppContext();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { piso, reload, setReload } = useFindById(pisoId);
    const { informacionUsuario } = usePerfilPrivado();

    const { agregar } = useWatchList();

    useEffect(() => {
        const onFocus = navigation.addListener('focus', () => {
            setReload(true);
        });
        return onFocus;

    }, [reload])

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

                <View style={styles.details}>
                    <View style={styles.datosContainer}>
                        <Text>
                            {
                                usuario.pisosInteres.some(pisoW => pisoW.id === piso.idPiso) ?
                                     <Icon name="bookmark" size={20} /> : <Icon name="bookmark-outline" size={20} />
                            }
                        </Text>

                        <Text style={styles.infoRelevante} >{piso.titulo}</Text>
                        <Text style={styles.infoRelevante}>{piso.precioMes} €</Text>
                    </View>
                    <View style={styles.datosContainer}>
                        <Text><Icon name="bed" size={20} /> {piso.numHabitaciones}</Text>
                        <Text><Icon name="person-sharp" size={20} /> {piso.inquilinos.length}</Text>
                        <Text>Propietario: {piso.propietarioReside ? 'Reside' : 'No Reside'}</Text>
                    </View>
                    <View style={{ marginVertical: 30 }}>
                        <Text>{piso.descripcion}</Text>
                    </View>
                    <View>
                        <Text>Información esencial: </Text>
                        <View style={styles.detalles}>
                            {Object.entries(piso).map(([key, value], index) => {
                                if (typeof value === 'boolean' && value && key != "propietarioReside") {
                                    return (
                                        <View key={key} style={styles.columnaDetalles}>
                                            <Text style={styles.itemDetalles}>{key.toUpperCase()}</Text>
                                        </View>
                                    );
                                }
                                return null; // Si el campo no es booleano o es false, no renderizar nada
                            })}
                        </View>
                    </View>


                    <View>
                        {piso.electrodomesticos && piso.electrodomesticos.trim() !== '' && (
                            <>
                                <Text>Electrodomésticos: </Text>
                                <View style={styles.detallesContainer}>
                                    {piso.electrodomesticos.split(';;').map((electro, index) => (
                                        <View key={index} style={styles.itemContainer}>
                                            <CheckBox
                                                value={true}
                                            />
                                            <Text style={styles.itemText}>{electro}</Text>
                                        </View>
                                    ))}
                                </View>
                            </>
                        )}
                    </View>

                    <View>
                        {piso.inquilinos && piso.inquilinos.length > 0 && (
                            <>
                                <Text>Inquilinos actuales: </Text>
                                {piso.inquilinos.map(inquilino => (
                                    <TouchableHighlight key={inquilino.nombre} onPress={() => navigation.navigate("Perfil", { email: inquilino.email })} >
                                        <Text style={{ padding: 10, color: "#73FF8C" }}>{inquilino.nombre} {inquilino.valoracion ?? " NO RATING"} ⭐</Text>
                                    </TouchableHighlight>

                                ))}
                            </>
                        )}

                    </View>
                    <View>
                        {piso.usuariosInteresados && piso.usuariosInteresados.length > 0 && (
                            <>
                                <Text>Usuarios interesados: </Text>
                                {piso.usuariosInteresados.map(usuario => (
                                    <TouchableHighlight key={usuario.nombre} onPress={() => navigation.navigate("Perfil", { email: usuario.email })} >
                                        <Text style={{ padding: 10, color: "#73FF8C" }}>{usuario.nombre} {usuario.valoracion ?? " NO RATING"} ⭐</Text>
                                    </TouchableHighlight>

                                ))}
                            </>
                        )}

                    </View>
                    <View >
                        <Text>Propietario: </Text>
                        <TouchableHighlight onPress={() => navigation.navigate("Perfil", { email: piso.propietario.email })} >
                            <Text style={{ padding: 10, color: "#73FF8C" }}>{piso.propietario.nombre} {piso.propietario.valoracion ?? " NO RATING"}⭐</Text>
                        </TouchableHighlight>
                    </View>
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
        flex: 1,
    },
    details: {
        margin: 20
    },
    datosContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoRelevante: {
        fontWeight: 'bold',
        fontSize: 20,
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
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 10,
    },
    itemText: {
        marginLeft: 5,
    },
    label: {
        marginBottom: 5,
    },

    detalles: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    columnaDetalles: {
        width: '50%', // Distribuir en columnas de dos
    },
    itemDetalles: {
        fontWeight: 'bold', // Hacer el texto en negrita
    },
})