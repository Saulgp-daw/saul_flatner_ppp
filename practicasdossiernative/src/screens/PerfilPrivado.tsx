import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar';

type Props = {
    navigation: any,
}

const PerfilPrivado = ({ navigation }: Props) => {
    const perfil = "../resources/perfil.jpg";
    return (
        <View style={{ flex: 1 }}>
            <Navbar navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.rating}>Valoración:  5⭐</Text>
                <View style={styles.circleContainer}>
                    <Image source={require(perfil)} style={styles.imgPerfil} />
                </View>
                <View>
                    <View style={styles.row}>
                        <TextInput defaultValue='Juan' style={styles.textinput} />
                        <TextInput defaultValue='Palomo' style={styles.textinput} />
                    </View>
                    <View style={styles.row}>
                        <TextInput defaultValue='12345678A' style={styles.textinput} />
                        <TextInput defaultValue='Hombre' style={styles.textinput} />
                    </View>
                    <View style={styles.row}>
                        <TextInput defaultValue='922 12 12 12' style={styles.textinput} />
                        <TextInput defaultValue='680 08 89 89' style={styles.textinput} />
                    </View>
                </View>



                <TouchableOpacity style={styles.btnEntrar}>
                    <Text>Guardar</Text>
                </TouchableOpacity>

            </View>
        </View>

    )
}

export default PerfilPrivado

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        alignItems: 'center'
    },
    inputContainer: {
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    
    rating : {
        position: 'absolute',
        top: 20,
        right: 20
    },

    textinput: {
        width: 300,
        borderColor: 'purple',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        maxWidth: '40%'
    },

    enlacePiso: {
        color: "blue",
        textDecorationLine: 'underline'
    },

    circleContainer: {
        marginTop: 50,
        height: 130,
        width: 130,
        borderRadius: 65, // La mitad del valor de la altura y anchura para hacer un círculo
        overflow: 'hidden', // Asegura que la imagen se ajuste al círculo
        marginBottom: 20
    },

    imgPerfil: {
        height: 130,
        width: 130,
        resizeMode: 'cover', // Ajusta el modo de redimensionamiento de la imagen
    },



    btnValorar: {
        backgroundColor: 'transparent',
        borderColor: "#2bfc23",
        borderRadius: 5,
        marginTop: 10,
        borderWidth: 2,
        padding: 10
    },
    btnEntrar: {
        backgroundColor: "#2bfc23",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,

    }
})