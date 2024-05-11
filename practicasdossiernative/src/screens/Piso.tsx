import { Modal, ActivityIndicator, Button, ScrollView, StyleSheet, Text, TouchableHighlight, View, Dimensions } from 'react-native'
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
import useGetUserLogged from '../hooks/useGetUserLogged';
import PisoFavourite from '../components/PisoFavourite';
import ModalMap from '../components/ModalMap';
import MiniMap from '../components/MiniMap';

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
    const { token, email, usuario, setusuario } = useAppContext();
    const { getUser } = useGetUserLogged();
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
                    <View style={styles.headerContainer}>
                        <PisoFavourite piso={piso} />
                        <Text style={styles.infoRelevante}>{piso.precioMes} €</Text>
                    </View>
                    <Text style={styles.titulo}>{piso.titulo}</Text>
                    <Text style={styles.descripcion}>{piso.descripcion}</Text>

                    {piso.electrodomesticos && piso.electrodomesticos.trim() !== '' && (
                        <View style={styles.electrodomesticosContainer}>
                            <Text>Electrodomésticos:</Text>
                            <View style={styles.columnasContainer}>
                                {piso.electrodomesticos.split(';;').map((electro, index) => (
                                    <View key={index} style={styles.columnaElectrodomestico}>
                                        <CheckBox value={true} />
                                        <Text style={styles.itemText}>{electro}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                    )}

                    <View style={styles.informacionEsencial}>
                        <Text style={styles.informacionEsencialTitulo}>Información esencial: </Text>
                        <View style={styles.columnasContainer}>
                            {Object.entries(piso).map(([key, value], index) => {
                                if (typeof value === 'boolean' && value && key !== "propietarioReside") {
                                    return (
                                        <View key={key} style={styles.columnaDetalles}>
                                            <Icon name="checkmark-circle" size={20} color="#73FF8C" />
                                            <Text style={styles.itemDetalles}>{key.toUpperCase()}</Text>
                                        </View>
                                    );
                                }
                                return null;
                            })}
                        </View>
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
                    <View style={styles.singleColumnRow}>
                        <View style={styles.column}>
                            <MiniMap piso={piso}/>
                        </View>
                    </View>
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
    row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	column: {
		flex: 1,
		flexDirection: 'column',
		marginRight: 10,
	},

	singleColumnRow: {
		flexDirection: 'row',
		marginBottom: 20,
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
    itemDetalles: {
        fontWeight: 'bold', // Hacer el texto en negrita
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10, // Agrega espacio entre las filas
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10, // Agrega espacio entre título y descripción
    },
    descripcion: {
        fontSize: 16,
        color: '#666', // Color gris para la descripción
        marginBottom: 20, // Espacio antes de los electrodomésticos
    },
    electrodomesticosContainer: {
        marginBottom: 20, // Espacio antes de la información esencial
    },
    columnaElectrodomestico: {
        width: Dimensions.get('window').width / 2 - 20, // Tamaño relativo al ancho de la pantalla
        flexDirection: 'row', // Alinear elementos en una fila
        alignItems: 'center', // Centrar los elementos verticalmente
        marginBottom: 10, // Espacio entre las columnas
    },
    informacionEsencial: {
        marginBottom: 20, // Espacio al final de la sección
    },
    informacionEsencialTitulo: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    informacionEsencialLista: {
        marginLeft: 25, // Ajuste de margen izquierdo para la lista
    },
    informacionEsencialItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    informacionEsencialItemTexto: {
        marginLeft: 10,
    },
    columnasContainer: {
        flexDirection: 'row', // Alinear elementos en una fila
        flexWrap: 'wrap', // Permite que los elementos fluyan en varias filas
        justifyContent: 'space-between', // Espaciar los elementos
    },
    columnaDetalles: {
        width: '48%', // Tamaño fijo de las columnas
        flexDirection: 'row', // Alinear elementos en una fila
        alignItems: 'center', // Centrar los elementos verticalmente
        marginBottom: 10, // Espacio entre las columnas
    },

})
