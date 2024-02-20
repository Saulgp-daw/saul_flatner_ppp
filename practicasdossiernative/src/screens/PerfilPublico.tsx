import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar';

type Props = {
    navigation: any,
  }

const PerfilPublico = ({ navigation }: Props) => {
    const perfil = "../../resources/Proyecto/perfil2.jpeg";
    const pisos: string[] = ["Mayorazgo suite", "Pisos Picados"]
    return (
        <View style={{ flex: 1 }}>
            <Navbar navigation={navigation} />
            <View style={styles.container}>
                <View style={styles.circleContainer}>
                    <Image source={require(perfil)} style={styles.imgPerfil} />
                </View>
                <Text>Pepe Ramirez</Text>
                <Text>Valoración:  5⭐</Text>

                <Text>Piso actual: <Text style={styles.enlacePiso}>Villa Arriba</Text></Text>
                <Text>Pisos en los que ha estado: </Text>
                {pisos.map((piso, index) => (
                    <Text key={index} style={styles.enlacePiso} >{piso},</Text>
                ))}
                <Text>Fecha última estancia: 2023/05/12</Text>
                <TouchableOpacity style={styles.btnValorar}>
                    <Text>Valorar</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default PerfilPublico

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        alignItems: "center",
    },

    enlacePiso : {
        color: "blue",
        textDecorationLine: 'underline'
    },

    circleContainer: {
        marginTop: 50,
        height: 130,
        width: 130,
        borderRadius: 65, // La mitad del valor de la altura y anchura para hacer un círculo
        overflow: 'hidden', // Asegura que la imagen se ajuste al círculo
    },

    imgPerfil: {
        height: 130,
        width: 130,
        resizeMode: 'cover', // Ajusta el modo de redimensionamiento de la imagen
    },

    btnValorar : {
        backgroundColor: 'transparent',
        borderColor: "#2bfc23",
        borderRadius: 5,
		marginTop: 10,
        borderWidth: 2,
        padding: 10
    }
})