import { Animated, Button, FlatList, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import useAgregarPiso from '../hooks/useAgregarPiso'
import CheckBox from '@react-native-community/checkbox';
import { useIsFocused } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import { useAppContext } from '../contexts/TokenContextProvider';
import { Easing } from 'react-native';

type Props = {
	navigation: any;
}

const AgregarPiso = ({ navigation }: Props) => {
	const { informacionPiso,
		loading,
		tituloValido,
		estanciaMinimaValido,
		numHabitacionesValido,
		precioMesValido,
		metrosCuadradosValido,
		isDescripcionExpanded,
		setInformacionPiso,
		setSwitch,
		post,
		selectImage,
		updateCampo,
		toggleDescripcionExpansion

	} = useAgregarPiso();
	const [text, setText] = useState("");
	const { token, email, usuario } = useAppContext();
	const descripcionHeight = useRef(new Animated.Value(0)).current;
	const styles = getStyles(isDescripcionExpanded);

	useEffect(() => {
		Animated.timing(descripcionHeight, {
			toValue: isDescripcionExpanded ? 100 : 0,
			duration: 300,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: false,
		}).start();
	}, [isDescripcionExpanded]);

	const [electrodomesticos, setElectrodomesticos] = useState([
		{ id: 1, label: 'Lavadora', value: 'Lavadora', isChecked: false },
		{ id: 2, label: 'Secadora', value: 'Secadora', isChecked: false },
		{ id: 3, label: 'Lavavajillas', value: 'Lavavajillas', isChecked: false },
		{ id: 4, label: 'Horno', value: 'Horno', isChecked: false },
		{ id: 5, label: 'Microondas', value: 'Microondas', isChecked: false },
		{ id: 6, label: 'Plancha', value: 'Plancha', isChecked: false },
		{ id: 7, label: 'TV', value: 'TV', isChecked: false },
		{ id: 8, label: 'Aspiradora', value: 'Aspiradora', isChecked: false },
		{ id: 9, label: 'Nevera', value: 'Nevera', isChecked: false },
		{ id: 10, label: 'Congelador', value: 'Congelador', isChecked: false },
		{ id: 11, label: 'Cocina', value: 'Cocina', isChecked: false },
		{ id: 12, label: 'Tostadora', value: 'Tostadora', isChecked: false },
		{ id: 13, label: 'Aire acondicionado', value: 'Aire acondicionado', isChecked: false },
		{ id: 14, label: 'Ventilador', value: 'Ventilador', isChecked: false },
		{ id: 15, label: 'Sandwichera', value: 'Sandwichera', isChecked: false }
	]);

	const handleOnChange = async (id) => {
		const newElectrodomesticos = electrodomesticos.map((item) => {
			if (item.id === id) {
				return { ...item, isChecked: !item.isChecked };
			}
			return item;
		});
		//console.log(electrodomesticos);

		setElectrodomesticos(newElectrodomesticos);
		const electrodomesticosString = newElectrodomesticos
			.filter((item) => item.isChecked)
			.map((item) => item.value)
			.join(';;');
		await updateCampo("electrodomesticos", electrodomesticosString);
	};

	const prepararPost = async () => {

		//console.log(informacionPiso);

		post();
	};

	if (!usuario || usuario.verified == false) {
		return (
			<>
				<View style={styles.loadingContainer}>
					<Text>Debes completar tus datos y estar verificado por un admin para crear tu piso</Text>
				</View>
			</>
		);
	}


	return (
		<>
			<ScrollView contentContainerStyle={styles.container}>

				<View style={styles.singleColumnRow}>
					<View style={styles.column}>
						<Text style={styles.label}>* Titulo:</Text>
						<TextInput style={[styles.textInput, !tituloValido && styles.inputError]} placeholder='Ejm: Mirador de Montepinar' onChangeText={(texto) => updateCampo("titulo", texto)} />
					</View>
				</View>

				<View style={styles.singleColumnRow}>
					<View style={styles.column}>
						<TouchableOpacity onPress={toggleDescripcionExpansion} activeOpacity={0.9}>
							<Text style={[styles.label, isDescripcionExpanded ? styles.expandedLabel : null]}>
								{isDescripcionExpanded ? '▲' : '▼'} Descripción:
							</Text>
						</TouchableOpacity>
						<Animated.View style={[styles.textAreaContainer, { maxHeight: descripcionHeight }]}>
							<TextInput
								style={styles.textArea}
								placeholder="Escribe aquí..."
								placeholderTextColor="grey"
								multiline
								numberOfLines={10}
								onChangeText={(texto) => updateCampo("descripcion", texto)}
							/>
						</Animated.View>
					</View>
				</View>


				<View style={styles.row}>
					<View style={styles.column}>
						<Text style={styles.label}>* Estancia mínima en días:</Text>
						<TextInput
							style={[styles.textInput, !estanciaMinimaValido && styles.inputError]}
							placeholder='Ejm: 30'
							keyboardType="numeric"
							onChangeText={(texto) => updateCampo("estanciaMinimaDias", texto)}
							contextMenuHidden={true}
						/>
					</View>
					<View style={styles.column}>
						<Text style={styles.label}>* Nº de habitaciones:</Text>
						<TextInput
							style={[styles.textInput, !numHabitacionesValido && styles.inputError]}
							placeholder='Ejm: 4'
							keyboardType="numeric"
							onChangeText={(texto) => updateCampo("numHabitaciones", texto)}
							contextMenuHidden={true}
						/>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.column}>
						<Text style={styles.label}>* Precio al mes:</Text>
						<TextInput
							style={[styles.textInput, !precioMesValido && styles.inputError]}
							placeholder='Ejm: 300'
							keyboardType="numeric"
							onChangeText={(texto) => updateCampo("precioMes", texto)}
							contextMenuHidden={true}
						/>
					</View>
					<View style={styles.column}>
						<Text style={styles.label}>* Metros cuadrados:</Text>
						<TextInput
							style={[styles.textInput, !metrosCuadradosValido && styles.inputError]}
							placeholder='Ejm: 23'
							keyboardType="numeric"
							onChangeText={(texto) => updateCampo("mCuadrados", texto)}
							contextMenuHidden={true}
						/>
					</View>
				</View>


				<View style={styles.singleColumnRow}>
					<View style={styles.column}>
						<Text style={styles.label}>Electrodomésticos:</Text>
					</View>
				</View>
				<View style={styles.flatListContainer}>
					{electrodomesticos.map((item) => (
						<View key={item.id} style={styles.itemContainer}>
							<CheckBox
								value={item.isChecked}
								onValueChange={() => handleOnChange(item.id)}
							/>
							<Text style={styles.itemText}>{item.label}</Text>
						</View>
					))}
				</View>

				{
					// 	<View style={styles.singleColumnRow}>
					// 	<View style={styles.column}>
					// 		<Text style={styles.label}>Ubicación:</Text>
					// 	</View>
					// </View>
				}

				<View style={styles.singleColumnRow}>
					<View style={styles.column}>
						<Text style={styles.titulo}>Servicios que se ofrece:</Text>
					</View>
				</View>

				<View style={styles.row}>
					<View style={styles.column}>
						<Text style={styles.label}>Ascensor:</Text>
						<Switch
							style={{ alignSelf: 'flex-start' }}
							trackColor={{ false: '#fc5858', true: '#15de9b' }}
							thumbColor={informacionPiso.ascensor ? '#35bd6b' : '#bd3535'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={(value) => setSwitch('ascensor', value)}
							value={informacionPiso.ascensor}
						/>
					</View>

					<View style={styles.column}>
						<Text style={styles.label}>Luz incluida:</Text>
						<Switch
							style={{ alignSelf: 'flex-start' }}
							trackColor={{ false: '#fc5858', true: '#15de9b' }}
							thumbColor={informacionPiso.luzIncluida ? '#35bd6b' : '#bd3535'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={(value) => setSwitch('luzIncluida', value)}
							value={informacionPiso.luzIncluida}
						/>
					</View>
					<View style={styles.column}>
						<Text style={styles.label}>Gas:</Text>
						<Switch
							style={{ alignSelf: 'flex-start' }}
							trackColor={{ false: '#fc5858', true: '#15de9b' }}
							thumbColor={informacionPiso.gasIncluido ? '#35bd6b' : '#bd3535'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={(value) => setSwitch('gasIncluido', value)}
							value={informacionPiso.gasIncluido}
						/>
					</View>
					<View style={styles.column}>
						<Text style={styles.label}>Wifi:</Text>
						<Switch
							style={{ alignSelf: 'flex-start' }}
							trackColor={{ false: '#fc5858', true: '#15de9b' }}
							thumbColor={informacionPiso.wifi ? '#35bd6b' : '#bd3535'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={(value) => setSwitch('wifi', value)}
							value={informacionPiso.wifi}
						/>
					</View>

				</View>

				<View style={styles.singleColumnRow}>
					<View style={styles.column}>
						<Text style={styles.titulo}>En este piso se permite:</Text>
					</View>
				</View>

				<View style={styles.row}>
					<View style={styles.column}>
						<Text style={styles.label}>Mascotas:</Text>
						<Switch
							style={{ alignSelf: 'flex-start' }}
							trackColor={{ false: '#fc5858', true: '#15de9b' }}
							thumbColor={informacionPiso.mascotas ? '#35bd6b' : '#bd3535'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={(value) => setSwitch('mascotas', value)}
							value={informacionPiso.mascotas}
						/>
					</View>

					<View style={styles.column}>
						<Text style={styles.label}>Fumar:</Text>
						<Switch
							style={{ alignSelf: 'flex-start' }}
							trackColor={{ false: '#fc5858', true: '#15de9b' }}
							thumbColor={informacionPiso.fumar ? '#35bd6b' : '#bd3535'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={(value) => setSwitch('fumar', value)}
							value={informacionPiso.fumar}
						/>
					</View>
					<View style={styles.column}>
						<Text style={styles.label}>Parejas:</Text>
						<Switch
							style={{ alignSelf: 'flex-start' }}
							trackColor={{ false: '#fc5858', true: '#15de9b' }}
							thumbColor={informacionPiso.parejas ? '#35bd6b' : '#bd3535'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={(value) => setSwitch('parejas', value)}
							value={informacionPiso.parejas}
						/>
					</View>
				</View>
				<View style={styles.singleColumnRow}>
					<View style={styles.column}>
						<Text style={styles.titulo}>Más opciones:</Text>
					</View>
				</View>

				<View style={styles.row}>
					<View style={styles.column}>
						<Text style={styles.label}>Propietario Reside:</Text>
						<Switch
							style={{ alignSelf: 'flex-start' }}
							trackColor={{ false: '#fc5858', true: '#15de9b' }}
							thumbColor={informacionPiso.propietarioReside ? '#35bd6b' : '#bd3535'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={(value) => setSwitch('propietarioReside', value)}
							value={informacionPiso.propietarioReside}
						/>
					</View>

					<View style={styles.column}>
						<Text style={styles.label}>Tiene Terraza:</Text>
						<Switch
							style={{ alignSelf: 'flex-start' }}
							trackColor={{ false: '#fc5858', true: '#15de9b' }}
							thumbColor={informacionPiso.terraza ? '#35bd6b' : '#bd3535'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={(value) => setSwitch('terraza', value)}
							value={informacionPiso.terraza}
						/>
					</View>

				</View>
				<View style={styles.singleColumnRow}>
					<View style={styles.column}>
						<Button title={informacionPiso.fotos && informacionPiso.fotos.length > 0 ? "Foto subida" : "Subir foto del piso"} onPress={() => selectImage()} />
					</View>
				</View>


				<View style={styles.singleColumnRow}>
					<View style={styles.column}>
						<Button title={loading ? 'Enviando...' : 'Crear'} onPress={prepararPost} />
					</View>
				</View>

			</ScrollView>
		</>

	);
};

export default AgregarPiso

const getStyles = (isDescripcionExpanded) => StyleSheet.create({
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

	titulo: {
		fontWeight: 'bold'
	},
	textInput: {
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
		padding: 10,
	},

	inputError: {
		borderColor: 'red',
		borderWidth: 2,
	},

	profileImageContainer: {
		alignItems: 'center', // Centra la imagen horizontalmente
		marginBottom: 20,
	},
	profileImage: {
		width: 100, // Ajusta el tamaño de la imagen
		height: 100, // Ajusta el tamaño de la imagen
		borderRadius: 50, // Hace que la imagen sea circular
	},

	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textAreaContainer: {
		borderColor: 'gray',
		borderWidth: 1,
		padding: 5,
		marginBottom: 20,
		overflow: 'hidden', // Oculta el contenido que excede la altura máxima
	},
	textArea: {
		height: 100,
		justifyContent: 'flex-start',
		textAlignVertical: 'top',
	},
	listContainer: {
		paddingHorizontal: 10,
		// Ajusta según sea necesario para tu diseño
	},
	flatListContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
	},
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 10,
		marginBottom: 10,
	},
	itemText: {
		marginLeft: 5,
	},
	expandedLabel: {
		fontWeight: 'bold',
		color: 'blue',
	},
	expandedDescription: {
		maxHeight: isDescripcionExpanded ? 1000 : 0,
		overflow: 'hidden', // Oculta el contenido que excede la altura máxima
		transitionProperty: 'max-height', // Propiedad que va a cambiar
		transitionDuration: '0.3s', // Duración de la transición
	},
})