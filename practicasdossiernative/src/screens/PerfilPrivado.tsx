import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import usePerfilPrivado from '../hooks/usePerfilPrivado';
import SexoPicker from '../components/SexoPicker';
import { ScrollView } from 'react-native-gesture-handler';
import YearPicker from '../components/YearPicker';
import { Button } from 'react-native';
import { ip } from '../../global';
import { useAppContext } from '../contexts/TokenContextProvider';

type Props = {
    navigation: any,
}

const PerfilPrivado = ({ navigation }: Props) => {
    const perfil = "../resources/perfil.jpg";
    const { token, email } = useAppContext();
    const { informacionUsuario, selectImage, updateNombre, updateApellidos, updateAnho, updateSexo, updatePassword, actualizarDatos } = usePerfilPrivado();
    const [sexo, setSexo] = useState('Hombre');
    const [selectedYear, setSelectedYear] = useState(informacionUsuario ? informacionUsuario.anhoNacimiento : null);
    const ruta = "http://" + ip + "/api/v2/usuarios/" + email + "/images/";
    const [loading, setLoading] = useState(false);
    
    const [error, setError] = useState(false);
    const imagenDefecto = "../resources/user_default.jpg";

    //console.log(ruta + informacionUsuario.fotoPerfil);

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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileImageContainer}>
                {error == false ?
                    <Image
                        source={{
                            uri: ruta + informacionUsuario.fotoPerfil,
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
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput style={styles.textInput} defaultValue={informacionUsuario ? informacionUsuario.email || "Email" : "Email"} editable={false} />
                </View>

                <View style={styles.column}>
                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput style={styles.textInput} defaultValue={informacionUsuario ? informacionUsuario.nombre || "" : ""} onChangeText={(texto) => updateNombre(texto)} />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Apellidos:</Text>
                    <TextInput style={styles.textInput} defaultValue={informacionUsuario ? informacionUsuario.apellidos || "" : ""} onChangeText={(texto) => updateApellidos(texto)} />
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
                    <SexoPicker onSexoChange={handleSexoChange} />
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Año de Nacimiento:</Text>
                    <YearPicker selectedYear={selectedYear !== null ? selectedYear : informacionUsuario ? informacionUsuario.anhoNacimiento : null} onYearChange={handleYearChange} />
                </View>
            </View>

            <View style={styles.singleColumnRow}>
                <View style={styles.column}>
                    <Button title="Subir foto de perfil" onPress={() => selectImage()} />
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
                    <Button title={loading ? 'Enviando...' : 'Actualizar Datos'} onPress={handleActualizarDatos} />
                </View>
            </View>
        </ScrollView>
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

    label: {
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
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