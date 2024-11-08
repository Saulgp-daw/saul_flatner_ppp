import { Image, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
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
		<ScrollView style={styles.container}>
			<View style={styles.singleColumnRow}>
				<View style={styles.column}>
					<Image source={require(logo)} style={styles.logo} />
				</View>
			</View>

			<View style={styles.singleColumnRow}>
				<View style={styles.column}>
					<Text style={styles.h2}>Login</Text>
				</View>
			</View>

			<View style={styles.singleColumnRow}>
				<View style={styles.column}>
					<Text style={styles.h3} >Bienvenido de vuelta</Text>
				</View>
			</View>

			<View style={styles.singleColumnRow}>
				<View style={styles.column}>
					<Text>Email</Text>
				</View>
			</View>
			<View style={styles.singleColumnRow}>
				<View style={styles.column}>
					<TextInput placeholder='Ejm. marcelino@gmail.com' style={styles.textInput} onChangeText={(texto) => setEmail(texto)} />
				</View>
			</View>
			<View style={styles.singleColumnRow}>
				<View style={styles.column}>
					<Text>Contraseña</Text>
				</View>
			</View>

			<View style={styles.singleColumnRow}>
				<View style={styles.column}>
					<TextInput placeholder='*************' style={styles.textInput} secureTextEntry={true} onChangeText={(texto) => setPassword(texto)} />
				</View>
			</View>

			<View style={styles.row}>
				<View style={styles.column}>
					<TouchableOpacity style={styles.btnEntrar} onPress={() => login(email, password)} >
						<Text style={{ textAlign: 'center' }}>{loading ? 'Un momento...' : 'Entrar'}</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.column}>
					<TouchableOpacity style={styles.btnEntrar} onPress={() => navigation.navigate("Registro")} >
						<Text style={{ textAlign: 'center' }}>Ir a Registro</Text>
					</TouchableOpacity>
				</View>
			</View>

			{error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
		</ScrollView>
	);
};

export default Login;

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

	h2: {
		fontSize: 34,
		fontWeight: 'bold',
		justifyContent: 'center',
		textAlign: 'center'
	},

	h3: {
		fontSize: 21,
		textAlign: 'center'
	},

	label: {
		marginBottom: 5,
	},

	textInput: {
		borderWidth: 2,
		borderColor: '#73FF88',
		borderRadius: 5,
		padding: 10,
	},

	logo: {
		height: 150,
		width: 150,
		marginTop: 30,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},

	btnEntrar: {
		backgroundColor: "#2bfc23",
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
		textAlign: 'center'

	}
});
