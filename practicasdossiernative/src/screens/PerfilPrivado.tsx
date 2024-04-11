import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import usePerfilPrivado from '../hooks/usePerfilPrivado';
import SexoPicker from '../components/SexoPicker';
import { ScrollView } from 'react-native-gesture-handler';
import YearPicker from '../components/YearPicker';
import { Button } from 'react-native';
import { ip } from '../../global';
import { useAppContext } from '../contexts/TokenContextProvider';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    navigation: any,
}

const PerfilPrivado = ({ navigation }: Props) => {
    const perfil = "../resources/perfil.jpg";
    const { token, email, usuario } = useAppContext();
    const { reload, setReload, informacionUsuario, fotoSubida, selectImage, updateNombre, updateApellidos, updateAnho, updateSexo, updatePassword, actualizarDatos } = usePerfilPrivado();
    const [sexo, setSexo] = useState('Tonto');
    const [selectedYear, setSelectedYear] = useState(usuario ? usuario.anhoNacimiento : null);
    const ruta = "http://" + ip + "/api/v2/usuarios/" + email + "/images/";
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);
    const imagenDefecto = "../resources/user_default.jpg";
    //console.log(fotoSubida);


    //console.log(ruta + informacionUsuario.fotoPerfil);

    useEffect(() => {
        const onFocus = navigation.addListener('focus', () => {
            setReload(true);
            setError(false);
        });
        return onFocus;

    }, [reload])

    const handleSexoChange = (newSexo) => {
        setSexo(newSexo);
        updateSexo(newSexo);
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
        updateAnho(year);
    };

    const handleActualizarDatos = async () => {
        setLoading(true);
        try {
            await actualizarDatos();
            setLoading(false);
        } catch (error) {
            console.error("Error al actualizar datos:", error);
            setLoading(false);
        }
    };

    if (!usuario) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    async function logOut() {
        try {
            console.log('Token eliminado');
            navigation.navigate("Login");

        } catch (e) {
            console.error('Error al eliminar el token', e);
        }
    }

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>

                <View style={styles.profileImageContainer}>
                    {usuario.fotoPerfil && !error ? (
                        <Image
                            source={{
                                uri: ruta + usuario.fotoPerfil,
                                method: "GET",
                                headers: { 'Authorization': `Bearer ${token}` }
                            }}
                            style={styles.profileImage}
                            onError={() => setError(true)}
                        />
                    ) : (
                        <Image source={require(imagenDefecto)} style={styles.profileImage} />
                    )}
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Email:</Text>
                        <TextInput style={styles.disabledInput} defaultValue={usuario ? usuario.email || "Email" : "Email"} editable={false} />
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.label}>Nombre:</Text>
                        <TextInput style={styles.textInput} defaultValue={usuario ? usuario.nombre || "" : ""} onChangeText={(texto) => updateNombre(texto)} />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Apellidos:</Text>
                        <TextInput style={styles.textInput} defaultValue={usuario ? usuario.apellidos || "" : ""} onChangeText={(texto) => updateApellidos(texto)} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Contraseña:</Text>
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={true}
                            placeholder='*************'
                            onChangeText={(texto) => updatePassword(texto)}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Sexo:</Text>
                        <SexoPicker onSexoChange={handleSexoChange} sexoInicial={usuario.sexo} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Año de Nacimiento:</Text>
                        <YearPicker onYearChange={handleYearChange} anhoInicial={usuario.anhoNacimiento} />
                    </View>
                </View>

                <View style={styles.singleColumnRow}>
                    <View style={styles.column}>

                        <Button title={fotoSubida ? "Foto Subida" : "Subir foto de perfil"} onPress={() => selectImage()} />
                    </View>
                </View>
                {
                    //     <View style={styles.singleColumnRow}>
                    //     <View style={styles.column}>
                    //         <Text style={styles.label}>{informacionUsuario && informacionUsuario.fotoPerfil != "" ? informacionUsuario.fotoPerfil || "" : ""}</Text>
                    //     </View>
                    // </View>
                }


                <View style={styles.singleColumnRow}>
                    <View style={styles.column}>
                        <Button title={loading ? 'Enviando...' : 'Actualizar Datos'} onPress={handleActualizarDatos} disabled={false} />
                    </View>
                </View>
                <View style={styles.logOut}>
                    <TouchableHighlight onPress={() => logOut()} >
                        <Text>
                            <Icon name="exit-outline" size={32} />
                        </Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    )
}

export default PerfilPrivado

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

    logOut: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
        color: "white"
    },

    label: {
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },

    disabledInput: {
        borderWidth: 1,
        borderColor: '#A09B9A',
        backgroundColor: '#E8DAD7',
        borderRadius: 5,
        color: "#A09B9A",
        padding: 10,
    },

    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})