import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PerfilPrivado from '../screens/PerfilPrivado';
import useFindUsuario from '../hooks/useFindUsuario';
import { ip } from '../../global';
import { useAppContext } from '../contexts/TokenContextProvider';


type Props = {
	navigation: any;
}
const Drawer = createDrawerNavigator();




const Navbar = ({navigation}: Props) => {
	const perfil = "../resources/user_default.jpg";
	const [error, setError] = useState(false);
	const { token, email, settoken } = useAppContext();
	const { usuario } = useFindUsuario(email);
	const ruta = "http://" + ip + "/api/v2/usuarios/" + email + "/images/";
	const imagenDefecto = "../resources/user_default.jpg";
	
	const abrirDrawer = () => {
		navigation?.openDrawer(); 
	}
	return (
		<View style={styles.navbar} >
			<TouchableOpacity onPress={abrirDrawer}><Icon name='menu' size={30}></Icon></TouchableOpacity>
			<View style={styles.circleContainer}>
				<TouchableHighlight onPress={() => navigation.navigate('Mi Perfil')} >
				<View style={styles.profileImageContainer}>
                {usuario ?
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
				</TouchableHighlight>
			</View>
		</View>
	)
}

export default Navbar

const styles = StyleSheet.create({

	navbar: {
		padding: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: "#2bfc23",
	},

	circleContainer: {
		height: 60,
		width: 60,
		borderRadius: 30, // La mitad del valor de la altura y anchura para hacer un círculo
		overflow: 'hidden', // Asegura que la imagen se ajuste al círculo
	 },
  
	 imgPerfil: {
		height: 60,
		width: 60,
		resizeMode: 'cover', // Ajusta el modo de redimensionamiento de la imagen
	 },
	 profileImage: {
        width: 100, // Ajusta el tamaño de la imagen
        height: 100, // Ajusta el tamaño de la imagen
        borderRadius: 50, // Hace que la imagen sea circular
    }, 
	profileImageContainer: {
        alignItems: 'center', // Centra la imagen horizontalmente
        marginBottom: 20,
    },
})