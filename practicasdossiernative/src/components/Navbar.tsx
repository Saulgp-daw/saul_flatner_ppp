import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PerfilPrivado from '../screens/PerfilPrivado';


type Props = {
	navigation: any;
}
const Drawer = createDrawerNavigator();


const Navbar = ({navigation}: Props) => {
	const perfil = "../resources/perfil.jpg";

	
	return (
		<View style={styles.navbar} >
			<TouchableOpacity><Icon name='menu' size={30}></Icon></TouchableOpacity>
			<View style={styles.circleContainer}>
				<TouchableHighlight onPress={() => navigation.navigate('Mi Perfil')} >
					<Image source={require(perfil)} style={styles.imgPerfil} />
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
})