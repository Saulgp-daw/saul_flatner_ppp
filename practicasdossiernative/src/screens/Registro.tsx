import { Image, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import Busqueda from './Busqueda';
import WatchList from './WatchList';
import useRegistro from '../hooks/useRegistro';


type Props = {
	navigation: any;
};

const Registro = ({ navigation }: Props) => {

	const { registro, loading, valido } = useRegistro();

	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		if (valido) {
			navigation.navigate("Login");
		}
	}, [valido, navigation]);


	const logo = "../resources/logo.jpeg";
	return (
		<ScrollView>
			<View style={styles.container}>
				<Image source={require(logo)} style={styles.logo} />
				<Text style={styles.h2}>Registro</Text>

				<View style={styles.inputContainer}>
					<Text>Email o nombre de usuario</Text>
					<TextInput placeholder='Ejm. marcelino@gmail.com' style={styles.textinput} onChangeText={(texto) => setEmail(texto)} />
				</View>
				<View style={styles.inputContainer}>
					<Text>Contraseña</Text>
					<TextInput placeholder='*************' style={styles.textinput} onChangeText={(texto) => setPassword(texto)} />
				</View>




				<TouchableOpacity style={styles.btnEntrar} onPress={() => registro(email, password)} >
					<Text>{loading ? 'Un momento...' : 'Registrarse'}</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.btnEntrar} onPress={() => navigation.navigate("Login")} >
					<Text>Ir a Login</Text>
				</TouchableOpacity>

			</View>

		</ScrollView>
	);
};

export default Registro;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},

	logo: {
		marginTop: 50,
		height: 150,
		width: 150,
	},

	h2: {
		fontWeight: 'bold',
		fontSize: 23,
	},

	inputContainer: {
		marginTop: 10,
	},

	textinput: {
		width: 300,
		borderColor: 'purple',
		borderWidth: 2,
		borderRadius: 5,
		paddingHorizontal: 10,
	},

	btnEntrar: {
		backgroundColor: "#2bfc23",
		padding: 10,
		borderRadius: 5,
		marginTop: 10,

	}
});
