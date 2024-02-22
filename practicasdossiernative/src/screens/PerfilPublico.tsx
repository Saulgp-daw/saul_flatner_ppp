import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import useFindUsuario from '../hooks/useFindUsuario';
import { useRoute } from '@react-navigation/native';
import { ip } from '../../global';
import { useAppContext } from '../contexts/TokenContextProvider';

type Props = {
    navigation: any,
}

type RouteParams = {
    email: string;
};

const PerfilPublico = ({ navigation }: Props) => {
    const perfil = "../resources/perfil2.jpeg";
    const route = useRoute();
    const { email } = route.params as RouteParams;
    const { usuario } = useFindUsuario(email);
    const { token, settoken } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const pisos: string[] = ["Mayorazgo suite", "Pisos Picados"];
    const ruta = "http://" + ip + "/api/v2/usuarios/" + email + "/images/";
    const imagenDefecto = "../resources/user_default.jpg";

    if (!usuario) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.valoracion}>
                <Text>{usuario.valoracion ?? "NO RATING"}⭐</Text>
            </View>
            <View style={styles.profileImageContainer}>
                {error == false ?
                    <Image
                        source={{
                            uri: ruta + usuario.fotoPerfil,
                            method: "GET",
                            headers: { 'Authorization': `Bearer ${token}` }
                        }}
                        style={styles.profileImage}
                        onError={(e) => {
                            setError(true);
                        }}
                    /> :
                    <Image source={require(imagenDefecto)} style={styles.profileImage} />
                }

            </View>

            <View style={styles.singleColumnRow}>
                <View style={styles.column}>
                    <Text style={styles.label}>{usuario ? usuario.nombre + " " + usuario.apellidos || "" : ""}</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.label}>{usuario ? usuario.email || "" : ""}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Sexo:</Text>
                    <Text style={styles.label}>{usuario ? usuario.sexo || "" : ""}</Text>

                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Año de Nacimiento:</Text>
                    <Text style={styles.label}>{usuario ? (usuario.anhoNacimiento - 3) + "-" + (usuario.anhoNacimiento + 3) || "" : ""}</Text>
                </View>
            </View>

            {usuario.propiedades && usuario.propiedades.length > 0 && (
                <>
                    <View style={styles.singleColumnRow}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Propiedades:</Text>
                        </View>
                    </View>
                    {usuario.propiedades.map((piso, index) => (
                        <View key={index} style={styles.singleColumnRow}>
                            <View style={styles.column}>
                                <TouchableOpacity key={piso.idPiso} onPress={() => navigation.navigate('Piso', { pisoId: piso.idPiso })} >
                                    <Text style={styles.link}>{piso.titulo}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </>
            )}

            {usuario.pisosInteres && usuario.pisosInteres.length > 0 && (
                <>
                    <View style={styles.singleColumnRow}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Pisos Interes:</Text>
                        </View>
                    </View>
                    {usuario.pisosInteres.map((piso, index) => (
                        <View key={index} style={styles.singleColumnRow}>
                            <View style={styles.column}>
                                <TouchableOpacity onPress={() => navigation.navigate('Piso', { pisoId: piso.idPiso })} >
                                    <Text style={styles.link}>{piso.titulo}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </>
            )}

            {usuario.pisoActual ?
                <>
                    <View style={styles.singleColumnRow}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Piso actual:</Text>
                        </View>
                    </View>
                    <View style={styles.singleColumnRow}>
                        <View style={styles.column}>
                            <TouchableOpacity key={usuario.pisoActual.idPiso} onPress={() => navigation.navigate('Piso', { pisoId: usuario.pisoActual.idPiso })} >
                                <Text style={styles.link}>{usuario.pisoActual.titulo}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </> : null
            }
            

            <View style={styles.singleColumnRow}>
                <View style={styles.column}>
                    <Button title={loading ? 'Enviando...' : 'Valorar Usuario'} />
                </View>
            </View>

        </ScrollView>
    )
}

export default PerfilPublico

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
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

    label: {
        marginBottom: 5,
        textAlign: 'center'
    },

    link: {
        marginBottom: 5,
        textAlign: 'center',
        color: '#0A17EB'
    },

    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },

    profileImageContainer: {
        alignItems: 'center', // Centra la imagen horizontalmente
        marginBottom: 20,
    },
    profileImage: {
        width: 100, // Ajusta el tamaño de la imagen
        height: 100, // Ajusta el tamaño de la imagen
        borderRadius: 50, // Hace que la imagen sea circular
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    valoracion: {
        position: 'absolute',
        top: 10,
        right: 10,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
})