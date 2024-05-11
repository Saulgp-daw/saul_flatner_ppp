import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const YearPicker = ({ defaultValue, cambiarAnhoUsuario }) => {
  const currentYear = new Date().getFullYear();
  const [test, settest] = useState(defaultValue);
  console.log("First default value: "+defaultValue);
  

  const years = [];
  for (let i = currentYear; i >= 1900; i--) {
    years.push(i);
  }


  const handleYearChange = (selectedYear) => {
    //
    console.log("pistacho: "+selectedYear);
    settest(selectedYear)
    cambiarAnhoUsuario(selectedYear);
  };

  return (
    <Picker
      onValueChange={handleYearChange}
      style={styles.picker}
      selectedValue={test}
      
    >
      {years.map((year) => (
        <Picker.Item key={year} label={year.toString()} value={year} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: 150,
    height: 50,
  },
});

export default YearPicker;
