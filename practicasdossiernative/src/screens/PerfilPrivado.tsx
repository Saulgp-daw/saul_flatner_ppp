import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import usePerfilPrivado from '../hooks/usePerfilPrivado';
import SexoPicker from '../components/SexoPicker';
import { ScrollView } from 'react-native-gesture-handler';
import YearPicker from '../components/YearPicker';
import { Button } from 'react-native';

type Props = {
    navigation: any,
}

const PerfilPrivado = ({ navigation }: Props) => {
    const perfil = "../resources/perfil.jpg";
    const { informacionUsuario, selectImage, updateNombre, updateApellidos, updateAnho, updateSexo, updatePassword, actualizarDatos } = usePerfilPrivado();
    const [sexo, setSexo] = useState('Hombre');
    const [selectedYear, setSelectedYear] = useState(informacionUsuario ? informacionUsuario.anhoNacimiento : null);

    const [loading, setLoading] = useState(false);

    const handleSexoChange = (newSexo) => {
        setSexo(newSexo);
        updateSexo(newSexo);
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
        updateAnho(year);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
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

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Foto de Perfil:</Text>
                </View>
                <View style={styles.column}>
                    <Button title="Subir imagen" onPress={() => selectImage()} />
                </View>
            </View>

            <View style={styles.singleColumnRow}>
                <View style={styles.column}>
                    <Text style={styles.label}>Imagen subida: {informacionUsuario ? informacionUsuario.fotoPerfil || "" : ""}</Text>
                </View>
            </View>

            <View style={styles.singleColumnRow}>
                <View style={styles.column}>
                    <Button title={loading ? 'Enviando...' : 'Agregar'} onPress={actualizarDatos} />
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
})