import { Image, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react'

import Busqueda from './Busqueda';
import useLogin from '../hooks/useLogin';

type Props = {
	navigation: any;
};

const Login = ({ navigation }: Props) => {
	const { login, loading, valido, error } = useLogin();
	const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
	
	const logo = "../resources/logo.jpeg";


	useEffect(() => {
        if (valido) {
            navigation.navigate("DrawerFlatner");
        }
    }, [valido, navigation]);

	return (
		<View style={styles.container}>
			<Image source={require(logo)} style={styles.logo} />
			<Text style={styles.h2}>Login</Text>
			<Text>Bienvenido de vuelta</Text>

			<View style={styles.inputContainer}>
				<Text>Email o nombre de usuario</Text>
				<TextInput placeholder='Ejm. marcelino@gmail.com' style={styles.textinput} onChangeText={(texto) => setEmail(texto)}/>
			</View>

			<View style={styles.inputContainer}>
				<Text>Contraseña</Text>
				<TextInput placeholder='*************' style={styles.textinput} onChangeText={(texto) => setPassword(texto)}/>
			</View>


			<TouchableOpacity style={styles.btnEntrar} onPress={() => login(email, password)} >
				<Text>{loading ? 'Un momento...' : 'Entrar'}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.btnEntrar} onPress={() => navigation.navigate("Registro")} >
				<Text>Ir a Registro</Text>
			</TouchableOpacity>
			{error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
		</View>
	);
};

export default Login;

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
