import { StyleSheet, Text, View, Modal, Button, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useSaveAnotacion from '../hooks/useSaveAnotacion';

type Props = {
    idWatchlist: number;
    anotacion: string;
}

const ModalAnotacion = ({ idWatchlist, anotacion }: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState(idWatchlist);
    const [miAnotacion, setMiAnotacion] = useState(anotacion);
    const [anotacionLista, setAnotacionLista] = useState(anotacion);
    const {guardarAnotacion} =  useSaveAnotacion();

    function resetearValores() {
        console.log("Cerrando modal...");
        setModalVisible(false);
    }

    function guardar(){  
        setModalVisible(false);
        guardarAnotacion(idWatchlist, miAnotacion);
        setAnotacionLista(miAnotacion);
    }

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.annotationText} numberOfLines={1} ellipsizeMode='tail'>{anotacionLista}</Text>
            </TouchableOpacity>


            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Escribe algo aquí..."
                        multiline
                        numberOfLines={4} 
                        onChangeText={(text) => setMiAnotacion(text)}
                        defaultValue={anotacionLista}
                        
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginTop: 30 }}>
                        <TouchableHighlight
                            style={[styles.button, { backgroundColor: 'red' }]}
                            onPress={() => resetearValores()}>
                            <Text style={styles.buttonText}>Cerrar</Text>
                        </TouchableHighlight>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: 'green' }]}
                            onPress={guardar}>
                            <Text style={styles.buttonText}>Guardar</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </Modal>
        </View>
    );

}

export default ModalAnotacion

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textArea: {
        height: 300,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        overflow: 'scroll',
        textAlignVertical: 'top',
        backgroundColor: 'white'
    },

    annotationText: {
        padding: 10,
        textAlignVertical: 'top',
        backgroundColor: '#bdbdbd'
    }
})