import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SexoPicker = ({ onSexoChange }) => {
  const [sexo, setSexo] = useState('Hombre');

  const handleSexoChange = (itemValue, itemIndex) => {
    setSexo(itemValue);
    onSexoChange(itemValue); // Llama a la función de devolución de llamada con el nuevo valor de sexo
  };

  return (
    <Picker
      selectedValue={sexo}
      onValueChange={handleSexoChange}>
      <Picker.Item label="Hombre" value="Hombre" />
      <Picker.Item label="Mujer" value="Mujer" />
    </Picker>
  );
};


export default SexoPicker;
