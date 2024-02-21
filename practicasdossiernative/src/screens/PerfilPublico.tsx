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
    //const perfil = "../../resources/Proyecto/perfil.jpg";
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
                    <Text style={styles.label}>{usuario ? usuario.anhoNacimiento || "" : ""}</Text>
                </View>
            </View>
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
})