import { ActivityIndicator, Animated, Button, FlatList, Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import useAgregarPiso from '../hooks/useAgregarPiso'
import CheckBox from '@react-native-community/checkbox';
import { useIsFocused } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import { useAppContext } from '../contexts/TokenContextProvider';
import { Easing } from 'react-native';
import DropShadow from "react-native-drop-shadow";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import { Piso } from '../types/Piso';
import useModificarPiso from '../hooks/useModificarPiso';

type Props = {
	navigation: any;
}

type RouteParams = {
    pisoId: number;
};

const ModificarPiso = ({ navigation }: Props) => {
	const { informacionPiso,
		loading,
		tituloValido,
		estanciaMinimaValido,
		numHabitacionesValido,
		precioMesValido,
		metrosCuadradosValido,
		isDescripcionExpanded,
		isElectrodomesticosExpanded,
		isExtraExpanded,
		selectedImage,
		setInformacionPiso,
		setSwitch,
		putPiso,
		selectImage,
		updateCampo,
		toggleDescripcionExpansion,
		toggleElectrodomesticosExpansion,
		toggleExtraExpansion

	} = useModificarPiso();
	const [text, setText] = useState("");
	const { token, email, usuario } = useAppContext();
	const descripcionHeight = useRef(new Animated.Value(0)).current;
	const electrodomesticosHeight = useRef(new Animated.Value(0)).current;
	const extraSectionHeight = useRef(new Animated.Value(0)).current;
	const imagenDefecto = "../resources/default.jpg";
	const route = useRoute();
	const { pisoId } = route.params as RouteParams;
	const [pisoMod, setPisoMod] = useState<Piso>();
	console.log(usuario);
	

	const styles = getStyles(isDescripcionExpanded);

	useEffect(() => {
		Animated.timing(descripcionHeight, {
			toValue: isDescripcionExpanded ? 100 : 0,
			duration: 300,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: false,
		}).start();
	}, [isDescripcionExpanded]);

	useEffect(() => {
		Animated.timing(electrodomesticosHeight, {
			toValue: isElectrodomesticosExpanded ? 2 : 0,
			duration: 300,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: false
		}).start();
	}, [isElectrodomesticosExpanded]);

	useEffect(() => {
		Animated.timing(extraSectionHeight, {
			toValue: isExtraExpanded ? 1 : 0,
			duration: 300,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: false
		}).start();
	}, [isExtraExpanded]);

	useEffect(() => {
        const propiedadEncontrada = usuario.propiedades.find(p => p.id === pisoId);
        if (propiedadEncontrada) {
			console.log(propiedadEncontrada);
			setInformacionPiso(propiedadEncontrada);
			const updatedElectrodomesticos = electrodomesticos.map(e => ({
				...e,
				isChecked: propiedadEncontrada.electrodomesticos.split(";;").includes(e.value)
			}));
			setElectrodomesticos(updatedElectrodomesticos);
        }
    }, [pisoId]);
	


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

	

	// const prepararPost = async () => {
	// 	post();
	// };

	if (!usuario || usuario.verified == false) {
		return (
			<>
				<View style={styles.loadingContainer}>
					<Text>Debes completar tus datos y estar verificado por un admin para modificar tu piso</Text>
				</View>
			</>
		);
	}

	if (!informacionPiso) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


	return (
		<>
			<ScrollView contentContainerStyle={styles.container}>

				<View style={styles.singleColumnRow}>
					<View style={styles.column}>
						<TouchableOpacity onPress={selectImage} style={styles.imageUpload} activeOpacity={0.7}>
							{selectedImage ? (
								<>
									<DropShadow style={styles.shadowProp2}>
										<DropShadow style={styles.shadowProp1}>
											<Image
												source={{ uri: selectedImage }}
												style={styles.previewImage}
												resizeMode="cover"
											/>
										</DropShadow>
									</DropShadow>
								</>
							) : (
								<>
									<DropShadow style={styles.shadowProp2}>
										<DropShadow style={styles.shadowProp1}>
											<Image
												source={require(imagenDefecto)}
												style={styles.previewImage}
												resizeMode="cover"
											/>
										</DropShadow>
									</DropShadow>
								</>
							)}
							<View style={styles.trianguloContainer}>
								<View style={styles.triangulo} />
								<Text style={styles.texto}>
									{informacionPiso.fotos && informacionPiso.fotos.length > 0 ? "Foto subida" :   <Icon name="add-a-photo" size={30} color="#000" />}
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.singleColumnRow}>
					<View style={styles.column}>
						<Text style={styles.label}>* Titulo:</Text>
						<TextInput style={[styles.textInput, !tituloValido && styles.inputError]} placeholder='Ejm: Mirador de Montepinar' onChangeText={(texto) => updateCampo("titulo", texto)} defaultValue={informacionPiso.titulo}/>
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
							defaultValue={informacionPiso.estanciaMinimaDias+""}
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
							defaultValue={informacionPiso.numHabitaciones+""}
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
							defaultValue={informacionPiso.precioMes+""}
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
							defaultValue={informacionPiso.mCuadrados+""}
						/>
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
								defaultValue={informacionPiso.descripcion+""}
							/>
						</Animated.View>
					</View>
				</View>

				<View style={styles.singleColumnRow}>
					<View style={styles.column}>
						<TouchableOpacity onPress={toggleElectrodomesticosExpansion} activeOpacity={0.9}>
							<Text style={[styles.label, isElectrodomesticosExpanded ? styles.expandedLabel : null]}>
								{isElectrodomesticosExpanded ? '▲' : '▼'} Electrodomésticos:
							</Text>
						</TouchableOpacity>
						<Animated.View style={[styles.flatListContainer, {
							height: electrodomesticosHeight.interpolate({
								inputRange: [0, 1],
								outputRange: [0, 150] // Ajusta este valor según el tamaño deseado cuando está expandido
							}),
							overflow: 'hidden'
						}]}>
							{electrodomesticos.map((item) => (
								<View key={item.id} style={styles.itemContainer}>
									<CheckBox
										value={item.isChecked}
										onValueChange={() => handleOnChange(item.id)}
									/>
									<Text style={styles.itemText}>{item.label}</Text>
								</View>
							))}
						</Animated.View>
					</View>
				</View>


				<TouchableOpacity onPress={toggleExtraExpansion} activeOpacity={0.9}>
					<Text style={[styles.label, isExtraExpanded ? styles.expandedLabel : null, { marginBottom: 20 }]}>
						{isExtraExpanded ? '▲' : '▼'} Servicios extra:
					</Text>
				</TouchableOpacity>
				<Animated.View
					style={{
						height: extraSectionHeight.interpolate({
							inputRange: [0, 1],
							outputRange: [0, 400] // Ajusta esta altura según el contenido
						}),
						overflow: 'hidden'
					}}
				>
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
				</Animated.View>

				<View style={styles.singleColumnRow}>
					<View style={styles.column}>
						<Button title={loading ? 'Actualizando...' : 'Modificar'} onPress={putPiso} />
					</View>
				</View>

			</ScrollView>
		</>

	);
};

export default ModificarPiso

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
	previewImage: {
		width: "100%",
		height: 200,
	},
	shadowProp1: {
		shadowColor: '#ff0066',
		shadowOffset: { width: 7, height: 7 },
		shadowOpacity: 0.6,
		shadowRadius: 1,
	},
	shadowProp2: {
		shadowColor: '#0099ff',
		shadowOffset: { width: -7, height: -7 },
		shadowOpacity: 0.6,
		shadowRadius: 1,
	},

	imageUpload: {
		position: "relative",
	},

	trianguloContainer: {
		position: 'absolute',
		top: -10,
		right: 0,
	},
	triangulo: {
		width: 0,
		height: 0,
		borderLeftWidth: 30,
		borderRightWidth: 30,
		borderBottomWidth: 70,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: 'rgba(0, 255, 0, 1)',
		transform: [{ rotate: '78deg' }], // Rotación del triángulo
	},
	texto: {
		color: '#000066',
		fontSize: 14,
		textAlign: 'center',
		position: 'absolute',
		width: 200,
		top: 20,
		left: -80, 
	},
})