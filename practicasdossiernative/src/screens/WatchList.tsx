import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import usePerfilPrivado from '../hooks/usePerfilPrivado';
import useFindUsuario from '../hooks/useFindUsuario';
import { useAppContext } from '../contexts/TokenContextProvider';
import { ip } from '../../global';
import useFindPiso from '../hooks/useFindPiso';
import Icon from 'react-native-vector-icons/Ionicons';
import useFindWatchlistByEmail from '../hooks/useFindWatchlistByEmail';



type Props = {
	navigation: any,
}

const WatchList = ({ navigation }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { token, email } = useAppContext();
	const { usuario, reload, setReload } = useFindUsuario(email);
	useFindWatchlistByEmail(email);
	const [error, setError] = useState(false);
	const [pisosConErrores, setPisosConErrores] = useState<number[]>([]);

	useEffect(() => {
		const onFocus = navigation.addListener('focus', () => {
			setReload(true);
		});
		return onFocus;

	}, [reload])


	if (!usuario) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	if (!usuario || usuario.pisosInteres.length === 0) {
		return (
			<View style={styles.loadingContainer}>
			  <Text style={styles.noPisosText}>No tienes ningún piso agregado</Text>
			</View>
		);
	  }

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{usuario.pisosInteres.map((piso) => (
				<PisoComponent key={piso.idPiso} pisoId={piso.idPiso} token={token} navigation={navigation} />
			))}
		</ScrollView>
	);
}

export default WatchList


const PisoComponent = ({ pisoId, token, navigation }) => {
	const { piso } = useFindPiso(pisoId);
	const imagenDefecto = "../resources/default.jpg";
	const [error, setError] = useState(false);

	if (!piso) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	return (
		<TouchableOpacity onPress={() => navigation.navigate('Piso', { pisoId })}>
			<View style={styles.caja}>
				<View style={styles.datosContainer}>
					{error == false ? (
						<Image
							source={{
								uri: "http://" + ip + "/api/v2/usuarios/" + piso.propietario.email + "/images/" + piso.fotos[0],
								method: "GET",
								headers: { 'Authorization': `Bearer ${token}` }
							}}
							style={styles.imagen}
							onError={(e) => {
								setError(true);
							}}
						/>
					) : (
						<Image source={require(imagenDefecto)} style={styles.imagen} />
					)}
					<View>
						<Text style={styles.infoRelevante}>{piso?.titulo}</Text>
						<Text style={styles.info}>{piso?.valoracion} ⭐</Text>
						<Text style={styles.info}>
							<Icon name="person-sharp" size={15} /> {piso.inquilinos.length} - <Icon name="bed" size={15} /> {piso.numHabitaciones}
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	caja: {
		borderColor: "#2bfc23",
		borderWidth: 2,
		borderRadius: 5,
		marginBottom: 10,
	},
	datosContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
		padding: 10
	},
	info: {
		marginLeft: 10,
		marginTop: 5
	},
	noPisosText: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	  },

	valoracion: {
		position: 'absolute',
		right: 35,
		top: 5
	},
	infoRelevante: {
		fontWeight: 'bold',
		fontSize: 20,
		marginLeft: 10,
	},
	imagen: {
		width: 100,
		height: 100,
		resizeMode: 'cover',
	},
});
