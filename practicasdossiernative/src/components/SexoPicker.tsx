import React from 'react';
import { Picker } from '@react-native-picker/picker';

const SexoPicker = ({ sexoInicial, onSexoChange }) => {

  const handleSexoChange = (itemValue, itemIndex) => {
    onSexoChange(itemValue);
  };

  return (
    <Picker
      selectedValue={sexoInicial}
      onValueChange={handleSexoChange}>
      <Picker.Item label="Hombre" value="Hombre"/>
      <Picker.Item label="Mujer" value="Mujer" />
      <Picker.Item label="Otro" value="Otro" />
    </Picker>
  );
};

export default SexoPicker;
